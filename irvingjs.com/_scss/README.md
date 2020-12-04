# SCSS Setup

11ty only really cares about template files out-of-the-box, so we have to instruct it to handle other "unknown" assets.

The `_scss` includes `*.11ty.js` data files, which are used to tell 11ty we want to add a CSS file to the build output. Think of them as sort of an equivelant to a Webpack entry.

To add a new "entry", create a file, following the `<input-name>.11ty.js` naming convention, and add the following:

```javascript
// extra-styles.11ty.js
const getDataClass = require('../_eleventy/getDataClass');

module.exports = getDataClass('extra-styles'); // Process ./extra-styles.scss
```

Styles are processed by the [`processStyles`](../_eleventy/processStyles.js) helper, which runs [`dart-sass`](https://www.npmjs.com/package/dart-sass) and PostCSS with [`postcss-units`](https://www.npmjs.com/package/postcss-units), [`autoprefixer`](https://www.npmjs.com/package/autoprefixer), and [`cssnano`](https://www.npmjs.com/package/cssnano).

## Pages Styles

Page styles are processed and inlined to the document head using the [`{% inlineCSS %}` shortcode](../_eleventy/irving-plugin/shortcodes/inlineCSS.js).

## @use

Include Sass variables, mixins, and functions with [the `@use` at-rule](https://sass-lang.com/documentation/at-rules/use).

```scss
@use 'core/layout';
@use 'core/color';
@use 'core/breakpoints' as *; // Remove namespacing for the `media` function.

.centered {
  @include layout.auto-margins;
  background-color: color.$primary;
  width: 100%;

  @media (media(min, md)) {
    width: 50%;
  }
}
```
