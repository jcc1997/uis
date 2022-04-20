import type Color from 'color'

function Math_between(min: number, input: number, max: number) {
  return Math.max(min, Math.min(input, max))
}

function luminance(color: Color, lum: number, a: number) {
  const [r, g, b] = [color.red(), color.green(), color.blue()]
  const affect = (c: number) => Math.round(Math_between(0, c + c * lum, 255))
  return `rgba(${affect(r)}, ${affect(g)}, ${affect(b)}, ${a})`
}

const getLumFactory = (light_pos: 'tl' | 'tr' | 'br' | 'bl') => (position: 'tl' | 'tr' | 'br' | 'bl') => {
  const poss = ['tl', 'tr', 'br', 'bl']
  const x = poss.indexOf(light_pos)
  const y = poss.indexOf(position)
  const lum_matrix = [
    [1, -1, -1, -1],
    [-1, 1, -1, -1],
    [-1, -1, 1, -1],
    [-1, -1, -1, 1],
  ]
  return lum_matrix[x][y]
}

const getOpacityFactory = (light_pos: 'tl' | 'tr' | 'br' | 'bl') => (position: 'tl' | 'tr' | 'br' | 'bl') => {
  const poss = ['tl', 'tr', 'br', 'bl']
  const x = poss.indexOf(light_pos)
  const y = poss.indexOf(position)
  const m = 0
  const s = 1
  const lum_matrix = [
    [m, s, m, s],
    [s, m, s, m],
    [m, s, m, s],
    [s, m, s, m],
  ]
  return lum_matrix[x][y]
}

const getEdgeFactors = (light_pos: 'tl' | 'tr' | 'br' | 'bl') => {
  const poss = ['tl', 'tr', 'br', 'bl']
  const x = poss.indexOf(light_pos)
  const matrix = [
    [-1, -1, 1, 1],
    [1, -1, -1, 1],
    [1, 1, -1, -1],
    [-1, 1, 1, -1],
  ]
  return matrix[x]
}

const lum = 0.1
const main = 0.8
const secondary = 0.2
const shadow_distance = 1 / 4
const shadow_blur = shadow_distance * 2

const edge_light = 0.5
const edge_dark = 0.5
// const edge = 0.5
const edge_radius = 1 / 16
const edge_blur = edge_radius * 2
const unit = 'rem'

type LightDirection = 'tl' | 'tr' | 'br' | 'bl'

const light_pos: LightDirection = 'tl' as LightDirection

type Type = 'concave' | 'convex'

const default_options = {
  lum, main, secondary, shadow_distance, edge_light, edge_dark, edge_radius, unit, light_pos,
}

type Options = Partial<typeof default_options> & { color: Color }

export function generateNeuCss(options: Options) {
  const _opts = Object.assign({}, default_options, options)
  const { color, lum, main, secondary, shadow_distance, edge_light, edge_dark, edge_radius, unit, light_pos } = _opts
  const opacities = [main, secondary]
  const lumFactor = getLumFactory(light_pos)
  const opacity = getOpacityFactory(light_pos)
  const ef = getEdgeFactors(light_pos) // edgeFactors

  const shadow_prop = (type: Type) => `${[
    `-${shadow_distance + unit} ${shadow_distance + unit} ${shadow_blur + unit} ${luminance(color, lumFactor('bl') * lum, opacities[opacity('bl')])}`,
    `${shadow_distance + unit} -${shadow_distance + unit} ${shadow_blur + unit} ${luminance(color, lumFactor('tr') * lum, opacities[opacity('tr')])}`,
    `-${shadow_distance + unit} -${shadow_distance + unit} ${shadow_blur + unit} ${luminance(color, lumFactor('tl') * lum, opacities[opacity('tl')])}`,
    `${shadow_distance + unit} ${shadow_distance + unit} ${shadow_blur + unit} ${luminance(color, lumFactor('br') * lum, opacities[opacity('br')])}`,
  ].map(v => type === 'concave' ? v : `inset ${v}`).concat(
    [
      `${ef[0] * edge_radius + unit} ${ef[1] * edge_radius + unit} ${edge_blur + unit} ${luminance(color, -lum, edge_dark)}`,
      `${ef[2] * edge_radius + unit} ${ef[3] * edge_radius + unit} ${edge_blur + unit} ${luminance(color, lum, edge_light)}`,
    ].map(v => type === 'concave' ? `inset ${v}` : v),
  ).join(', ')};`

  return {
    concave: {
      'box-shadow': shadow_prop('concave'),
    },
    convex: {
      'box-shadow': shadow_prop('convex'),
    },
    app: {
      background: color.hex(),
    },
  }
}

export function loadNeuCss(options: Options) {
  const classes = generateNeuCss(options)
  const css = Object.entries(classes).map(([k, v]) => {
    return `.${k} { ${Object.entries(v).map(([k, v]) => `${k}:${v}`).join(';\n')} }`
  }).join(' ')
  const style_sheet = document.createElement('style')
  style_sheet.type = 'text/css'
  style_sheet.innerText = css
  document.head.appendChild(style_sheet)
}
