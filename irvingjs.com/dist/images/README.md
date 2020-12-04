# Images

Favicons and social OG images are organized in a subdirectory but copied to the site root during the build.

Template images can be organized in the [`images/`](images/) directory as needed and are copied over to the site with their directory structure maintained.

## SVGs

We're using the [eleventy-plugin-svg-contents](https://www.npmjs.com/package/eleventy-plugin-svg-contents) package, which adds a filter for outputting an SVG file's contents.

Usage:

```liquid
{{ '/images/close.svg' | svgContents }}
```

## Social Share

**Location**: `images/social/`

Add a file named `card.png`. The meta properties in `_layouts/default.html` are set up for a `1200x630` image.

```html
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```

## Favicon Sizes

**Location**: `images/favicons/`

This table represents what the document `<head>` expects for the site's favorite icons. Any changes will require updates to the markup.

| Size    | Name              | Purpose                                                  |
|:--------|:------------------|:---------------------------------------------------------|
| n/a     | `favicon.ico`     | Classic format, will 404 if not present                  |
| 32×32   | `favicon-32.png`  | Standard for most desktop browsers                       |
| 128×128 | `favicon-128.png` | Chrome Web Store icon & Small Windows 8 Star Screen Icon |
| 152×152 | `favicon-152.png` | iPad touch icon                                          |
| 167×167 | `favicon-167.png` | iPad Retina touch icon                                   |
| 180×180 | `favicon-180.png` | iPhone Retina                                            |
| 192×192 | `favicon-192.png` | Google Developer Web App Manifest Recommendation         |
| 196×196 | `favicon-196.png` | Chrome for Android home screen icon                      |
| 270x270 | `favicon-270.png` | Windows 10 (Metro UI)                                    |

_Adapted from [The 2020 Guide to FavIcons for Nearly Everyone and Every Browser](https://www.emergeinteractive.com/insights/detail/the-essentials-of-favicons/) and [Here's Everything You Need to Know About Favicons in 2020](https://sympli.io/blog/heres-everything-you-need-to-know-about-favicons-in-2020/)_
