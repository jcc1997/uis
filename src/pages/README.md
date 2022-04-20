## File-based Routing

Routes will be auto-generated for Vue files in this dir with the same file structure.
Check out [`vite-plugin-pages`](https://github.com/hannoeru/vite-plugin-pages) for more details.

### Path Aliasing

`~/` is aliased to `./src/` folder.

For example, instead of having

```ts
import { isDark } from '../../../../composables'
```

now, you can use

```ts
import { isDark } from '~/composables'
```

```css
.up {
    background: #F0F0F3;
    box-shadow:
        -5px 5px 10px rgba(216, 216, 219, 0.2),
        5px -5px 10px rgba(216, 216, 219, 0.2),
        -5px -5px 10px rgba(255, 255, 255, 0.9),
        5px 5px 13px rgba(216, 216, 219, 0.9),
        inset 1px 1px 2px rgba(255, 255, 255, 0.3),
        inset -1px -1px 2px rgba(216, 216, 219, 0.5);
    border-radius: 10px;
}

.down {
    background: #F0F0F3;
    box-shadow:
        1px 1px 2px rgba(255, 255, 255, 0.3),
        -1px -1px 2px rgba(216, 216, 219, 0.5),
        inset -5px 5px 10px rgba(216, 216, 219, 0.2),
        inset 5px -5px 10px rgba(216, 216, 219, 0.2),
        inset -5px -5px 10px rgba(255, 255, 255, 0.9),
        inset 5px 5px 13px rgba(216, 216, 219, 0.9);
    border-radius: 10px;
}
```
