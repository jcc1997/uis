import Color from 'color'

type LightDirection = 'tl' | 'tr' | 'br' | 'bl'

type Type = 'concave' | 'convex'
type Mode = 'glass' | 'curtain'

function Math_between(min: number, input: number, max: number) {
  return Math.max(min, Math.min(input, max))
}

// curtain mode: material under curtain
// TODO: glass mode: sticker on glass

// Surface Shadow 是受关照影响后 在物体本身上作用的阴影和反射的光线
// light-side surface shadow is reflection of light, brighten the material color
// dark-side surface shadow is shadow on material cause by the edge-radius, just dark

// curtain effect 是指通过增加四周阴影造成 material under curtain 的效果

// concave 代表 material 是凸起的
// convex 代表 material 是凹陷的

const default_neu_options = {
  suffix: '',
  lum: 0.1,
  curtain_effects: [0.8, 0.2],
  shadow_blur: 0.8,
  shadow_distance: 0.25,
  shadow_opacity: 0.1,
  edge_radius: 0.0625,
  edge_effect: 0.5,
  unit: 'rem',
  blur_ratio: 2,
  light_direction: 'tl' as LightDirection,
}

type NeuOptions = Partial<typeof default_neu_options> & { color: Color }

export function luminous(color: Color, lum: number) {
  const [r, g, b] = [color.red(), color.green(), color.blue()]
  const affect = (c: number) => Math.round(Math_between(0, c + c * lum, 255))
  return new Color(`rgb(${affect(r)}, ${affect(g)}, ${affect(b)})`)
}

const LIGHT_DIRECTIONS = ['tl', 'tr', 'br', 'bl']

export function generateMainShadow(options: Required<NeuOptions>, type: Type) {
  const { light_direction, shadow_distance, unit, shadow_opacity, blur_ratio } = options
  const shadow_blur = shadow_distance * blur_ratio
  const shadowMatrix = [
    [1, 1], // tl
    [1, -1], // tr
    [-1, -1], // br
    [-1, 1], // bl
  ]
  const factors = shadowMatrix[LIGHT_DIRECTIONS.indexOf(light_direction!)]
  const dark = new Color('#000000')

  // shadow is just dark
  return [
    `${type === 'concave' ? '' : 'inset'} ${factors[0] * shadow_distance + unit} ${factors[1] * shadow_distance + unit} ${shadow_blur + unit} ${dark.alpha(shadow_opacity)}`,
  ]
}

export function generateCurtainEffects(options: Required<NeuOptions>, type: Type) {
  const { color, shadow_distance, curtain_effects, lum, light_direction, unit, blur_ratio } = options
  const shadow_blur = shadow_distance * blur_ratio
  const [m, s] = curtain_effects
  const effectMatrix = [
    [m, s, s, s],
    [s, m, s, s],
    [s, s, m, s],
    [s, s, s, m],
  ]
  const lumMatrix = [
    [1, -1, -1, -1],
    [-1, 1, -1, -1],
    [-1, -1, 1, -1],
    [-1, -1, -1, 1],
  ]
  const lightIndex = LIGHT_DIRECTIONS.indexOf(light_direction)
  const effects = effectMatrix[lightIndex]
  const lums = lumMatrix[lightIndex].map(v => v * lum)
  if (type === 'concave') {
    return [
      `-${shadow_distance + unit} -${shadow_distance + unit} ${shadow_blur + unit} ${luminous(color, lums[0]).alpha(effects[0])}`,
      `${shadow_distance + unit} -${shadow_distance + unit} ${shadow_blur + unit} ${luminous(color, lums[1]).alpha(effects[1])}`,
      `${shadow_distance + unit} ${shadow_distance + unit} ${shadow_blur + unit} ${luminous(color, lums[2]).alpha(effects[2])}`,
      `-${shadow_distance + unit} ${shadow_distance + unit} ${shadow_blur + unit} ${luminous(color, lums[3]).alpha(effects[3])}`,
    ].filter((v, i) => i !== (lightIndex + 2) % 4)
  }
  else {
    return [
      `inset -${shadow_distance + unit} -${shadow_distance + unit} ${shadow_blur + unit} ${luminous(color, lums[0]).alpha(effects[0])}`,
      `inset ${shadow_distance + unit} -${shadow_distance + unit} ${shadow_blur + unit} ${luminous(color, lums[1]).alpha(effects[1])}`,
      `inset ${shadow_distance + unit} ${shadow_distance + unit} ${shadow_blur + unit} ${luminous(color, lums[2]).alpha(effects[2])}`,
      `inset -${shadow_distance + unit} ${shadow_distance + unit} ${shadow_blur + unit} ${luminous(color, lums[3]).alpha(effects[3])}`,
    ].filter((v, i) => i !== (lightIndex + 2) % 4)
  }
}

const getSurfaceShadowFactors = (direction: LightDirection) => {
  const x = LIGHT_DIRECTIONS.indexOf(direction)
  const matrix = [
    [-1, -1, 1, 1],
    [1, -1, -1, 1],
    [1, 1, -1, -1],
    [-1, 1, 1, -1],
  ]
  return matrix[x]
}

export function generateEdgeEffect(options: Required<NeuOptions>, type: Type, mode: Mode) {
  const { color, light_direction, unit, edge_radius, lum, edge_effect, blur_ratio } = options
  const edge_blur = edge_radius * blur_ratio
  const factors = getSurfaceShadowFactors(light_direction)
  const dark = new Color('#000000')
  if (mode === 'glass') {
    // if concave will have light-side surface shadow and dark-side surface shadow
    if (type === 'concave') {
      return [
        // light-side
        `inset ${factors[2] * edge_radius + unit} ${factors[3] * edge_radius + unit} ${edge_blur + unit} ${luminous(color, lum).alpha(edge_effect)}`,
        // dark-side
        `inset ${factors[0] * edge_radius + unit} ${factors[1] * edge_radius + unit} ${edge_blur + unit} ${dark.alpha(edge_effect)}`,
      ]
    }
    // if convex will have light-side surface shadow
    else {
      return [
        `inset ${factors[0] * edge_radius + unit} ${factors[1] * edge_radius + unit} ${edge_blur + unit} ${luminous(color, lum).alpha(edge_effect)}`,
      ]
    }
  }
  else {
    return [
      `${factors[0] * edge_radius + unit} ${factors[1] * edge_radius + unit} ${edge_blur + unit} ${luminous(color, -lum).alpha(edge_effect)}`,
      `${factors[2] * edge_radius + unit} ${factors[3] * edge_radius + unit} ${edge_blur + unit} ${luminous(color, lum).alpha(edge_effect)}`,
    ].map(v => type === 'concave' ? `inset ${v}` : v)
  }
}

export function loadNeuCss(classes: any, id = 'neu', suffix = '') {
  const css = Object.entries(classes).map(([k, v]: [string, any]) => {
    return `.${id}-${k}${suffix ? `--${suffix}` : ''} { ${Object.entries(v).map(([k, v]) => `${k}:${v}`).join(';')} }`
  }).join('')
  const style_sheet: HTMLStyleElement = document.querySelector(`#${id}`) || document.createElement('style')
  style_sheet.id = id
  style_sheet.type = 'text/css'
  style_sheet.innerText += css
  document.head.appendChild(style_sheet)
}

const SIZE_MOD_PROPS = ['shadow_blur',
  'shadow_distance',
  'shadow_opacity',
  'edge_radius',
  'edge_effect',
]

type Size = 's' | 'm' | 'l'

export function generateNeuSizeClasses(options: NeuOptions, size?: Size) {
  const opts = Object.assign({}, options) as any
  const ratio = size === 'l' ? 2 : size === 's' ? 0.5 : 1
  const lum = size === 's' ? opts.lum * 3 : opts.lum
  Object.keys(opts).forEach((k) => {
    if (SIZE_MOD_PROPS.includes(k))
      opts[k] = ratio * (opts[k] as number)
    if (k === 'lum')
      opts[k] = lum
  })
  return opts
}

export function generateNeuClasses(options: Required<NeuOptions>, size?: Size) {
  const concaveCurtainEdgeShadow = generateEdgeEffect(options, 'concave', 'curtain')
  const convexCurtainEdgeShadow = generateEdgeEffect(options, 'convex', 'curtain')

  // const concaveGlassEdgeShadow = generateEdgeEffect(options, 'concave', 'glass')
  // const convexGlassEdgeShadow = generateEdgeEffect(options, 'convex', 'glass')

  const concaveShadow = generateMainShadow(options, 'concave')
  const convexShadow = generateMainShadow(options, 'convex')
  const concaveCurtainEffects = generateCurtainEffects(options, 'concave')
  const convexCurtainEffects = generateCurtainEffects(options, 'convex')

  const classes = {
    'concave': {
      'box-shadow': `${[...concaveCurtainEdgeShadow, ...concaveCurtainEffects, ...concaveShadow].join(', ')};`,
    },
    'convex': {
      'box-shadow': `${[...convexCurtainEdgeShadow, ...convexCurtainEffects, ...convexShadow].join(', ')};`,
    },
    'concave-sharp': {
      'box-shadow': `${[...concaveCurtainEffects, ...concaveShadow].join(', ')};`,
    },
    'convex-sharp': {
      'box-shadow': `${[...convexCurtainEffects, ...convexShadow].join(', ')};`,
    },
    'concave-shadow': {
      'box-shadow': `${[...concaveShadow].join(', ')};`,
    },
    'convex-shadow': {
      'box-shadow': `${[...convexShadow].join(', ')};`,
    },
    'concave-inset': {
      'box-shadow': `${[...concaveCurtainEdgeShadow].join(', ')};`,
    },
    'convex-inset': {
      'box-shadow': `${[...convexCurtainEdgeShadow].join(', ')};`,
    },
    'concave-no-effects': {
      'box-shadow': `${[...concaveCurtainEdgeShadow, ...concaveShadow].join(', ')};`,
    },
    'convex-no-effects': {
      'box-shadow': `${[...convexCurtainEdgeShadow, ...convexShadow].join(', ')};`,
    },
    // 'glass-concave': {
    //   'box-shadow': `${[...concaveGlassEdgeShadow, ...concaveShadow].join(', ')};`,
    // },
    // 'glass-convex': {
    //   'box-shadow': `${[...convexGlassEdgeShadow, ...convexShadow].join(', ')};`,
    // },
  }
  const result = {} as any
  Object.entries(classes).map(([k, v]: [string, any]) => {
    return result[`${k}${size ? `-${size}` : ''}`] = v
  })
  return result
}

export function generateNeuCss(options: NeuOptions, id = 'neu') {
  const _opts = Object.assign({}, default_neu_options, options)
  const { suffix, color } = _opts
  const css_m = generateNeuClasses(_opts)
  const s_options = generateNeuSizeClasses(_opts, 's')
  const css_s = generateNeuClasses(s_options, 's')
  const l_options = generateNeuSizeClasses(_opts, 'l')
  const css_l = generateNeuClasses(l_options, 'l')
  loadNeuCss({
    ...css_s,
    ...css_m,
    ...css_l,
    app: {
      'background-color': color,
      '--disabled-color': 'rgb(220, 220, 220)',
    },
    subject: {
      'background-color': color,
    },
  }, id, suffix)
}
