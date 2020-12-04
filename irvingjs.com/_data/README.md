# Config

Use the following properties to output common strings and meta values. Properties marked `undefined` are optional, **all other values are required**.

Reference these values in templates with dot notation from the `config` root.

```html
<a href="{{ config.url }}">{{ config.strings.shortName }}</a>
```

## Domain

We set the domain outside the config object to allow for incorporating it in other values (`url`, `email`) and for dynamically updating it for development mode.

**`clientDomain`**

> The production site's domain.

## Strings

The following strings track the client name for different uses. There may often be instances where two or three of these values are the same, but a distinction is provided in case it's needed.

**`strings.legalName`**

> The client's legal entity, used for legal pages (cookies, TOS, Privacy)
>
> E.g., `Defector Media, LLC`

**`strings.parentCompany`**

> The client's parent company, if any. Should be the same as `shortName` if there's no natural option.
>
> E.g., `Defector Media`

**`strings.shortName`**

> The client's common name.
>
> E.g., `Defector`

## Meta values

These are used in the document `<head>` to simplify updating site-specific values.

**`meta.title`**

> The document title. Will also be used as the suffix for legal pages.

**`meta.description`**

> The document description.

**`meta.themeColor`**

> The MS and Android tile/theme color.

**`meta.version`**

> Appended to assets as a query string.

## Contact info

Address, phone number and email are all requried for the legal pages.

**`contact.address`**

> An array, with each address line occupying an array element. Used on legal pages in the point of contact

**`contact.phone`**

> Used on legal pages in the point of contact.

**`contact.email`**

> The main contact email, used on legal pages.
>
> Use the `{% mailto %}` shortcode to output a mailto link using this email address. See [`the lede-plugin`](_eleventy/lede-plugin/shortcodes/mailto.js) for more usage notes.

**`contact.twitterUsername`** `undefined`

> Used in the `twitter:site` meta tag, but also available site-side as-needed.

## Fonts

Configure landing page fonts.

**`fonts.google`** `undefined`

> The Google Fonts stylesheet URL.

**`fonts.typekitId`** `undefined`

> The TypeKit `kitId`

## 3rd-party options

Enabled 3rd-party integrations.

**`thirdParty.picoId`** `undefined`

> The Pico ID

**`thirdParty.gtmId`** `undefined`

> The Google Tag Manager ID
