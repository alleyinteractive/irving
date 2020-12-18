export const richText = {
  allowedTags: [
   'address', 'a', 'abbr', 'acronym', 'area', 'article', 'aside', 'audio', 'b',
   'bdo', 'big', 'blockquote', 'br', 'button', 'caption', 'cite', 'code',
   'col', 'colgroup', 'del', 'dd', 'dfn', 'details', 'div', 'dl', 'dt', 'em',
   'fieldset', 'figure', 'figcaption', 'font', 'footer', 'h1', 'h2', 'h3',
   'h4', 'h5', 'h6', 'header', 'hgroup', 'hr', 'i', 'frame', 'img', 'ins',
   'kbd', 'label', 'legend', 'li', 'link', 'map', 'mark', 'menu', 'nav', 'p',
   'pre', 'q', 's', 'samp', 'span', 'section', 'small', 'strike', 'strong',
   'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th',
   'thead', 'title', 'tr', 'track', 'tt', 'u', 'ul', 'ol', 'var', 'video'
  ],
  allowedAttributes: {
    '*': ['class', 'id', 'data-*', 'style'],
    link: ['rel', 'href', 'type'],
    a: ['href', 'rel', 'rev', 'name', 'target', 'download'],
    area: ['alt', 'coords', 'href', 'nohref', 'shape', 'target'],
    article: ['align', 'dir', 'lang', 'xml:lang'],
    aside: ['align', 'dir', 'lang', 'xml:lang'],
    audio: ['autoplay', 'controls', 'crossorigin', 'currentTime',
      'disableRemotePlayback', 'duration', 'loop', 'muted', 'preload', 'src'],
    bdo: ['dir'],
    blockquote: ['cite', 'lang', 'xml:lang'],
    button: ['disabled', 'name', 'type', 'value'],
    caption: ['align'],
    cite: ['dir', 'lang'],
    col: ['align', 'char', 'charoff', 'span', 'dir', 'valign', 'width'],
    colgroup: ['align', 'char', 'charoff', 'span', 'valign', 'width'],
    del: ['datetime'],
    details: ['align', 'dir', 'lang', 'open', 'xml:lang'],
    div: ['align', 'dir', 'lang', 'xml:lang'],
    figure: ['align', 'dir', 'lang', 'xml:lang'],
    figcaption: ['align', 'dir', 'lang', 'xml:lang'],
    font: ['color', 'face', 'size'],
    footer: ['align', 'dir', 'lang', 'xml:lang'],
    h1: ['align'],
    h2: ['align'],
    h3: ['align'],
    h4: ['align'],
    h5: ['align'],
    h6: ['align'],
    header: ['align', 'dir', 'lang', 'xml:lang'],
    hgroup: ['align', 'dir', 'lang', 'xml:lang'],
    hr: ['align', 'noshade', 'size', 'width'],
    iframe: ['*'],
    img: ['alt', 'align', 'border', 'height', 'hspace', 'loading', 'longdesc',
      'vspace', 'src', 'srcset', 'sizes', 'usemap', 'width'],
    ins: ['datetime', 'cite'],
    label: ['for'],
    legend: ['align'],
    li: ['align', 'value'],
    map: ['name'],
    menu: ['type'],
    nav: ['align', 'dir', 'lang', 'xml:lang'],
    p: ['align', 'dir', 'lang', 'xml:lang'],
    pre: ['width'],
    q: ['cite'],
    span: ['dir', 'align', 'lang', 'xml:lang'],
    section: ['align', 'dir', 'lang', 'xml:lang'],
    summary: ['align', 'dir', 'lang', 'xml:lang'],
    table: ['align', 'bgcolor', 'border', 'cellpadding', 'cellspacing', 'dir',
      'rules', 'summary', 'width'],
    tbody: ['align', 'char', 'charoff', 'valign'],
    td: ['abbr', 'align', 'axis', 'bgcolor', 'char', 'charoff', 'colspan',
      'dir', 'headers', 'height', 'nowrap', 'rowspan', 'scope', 'valign',
        'width'],
    textarea: ['cols', 'rows', 'disabled', 'name', 'readonly'],
    tfoot: ['align', 'char', 'charoff', 'valign'],
    th: ['abbr', 'align', 'axis', 'bgcolor', 'char', 'charoff', 'colspan',
      'headers', 'height', 'nowrap', 'rowspan', 'scope', 'valign', 'width'],
    thead: ['align', 'char', 'charoff', 'valign'],
    tr: ['align', 'bgcolor', 'char', 'charoff', 'valign'],
    track: ['default', 'kind', 'label', 'src', 'srclang'],
    ul: ['type'],
    ol: ['start', 'type', 'reversed'],
    video: ['autoplay', 'autoPictureInPicture', 'buffered', 'controls',
      'controlslist', 'crossorigin', 'currentTime', 'disablePictureInPicture',
      'disableRemotePlayback', 'duration', 'height', 'intrinsicsize', 'loop',
      'muted', 'playsinline', 'poster', 'preload', 'src', 'width'],
  },
  selfClosing: [
    'img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta',
  ],
  allowedSchemes: ['http', 'https', 'ftp', 'mailto'],
  allowedSchemesByTag: {},
  allowProtocolRelative: true,
};

export const plainText = {
  allowedTags: ['a', 'abbr', 'acronym', 'b', 'blockquote', 'cite', 'code',
  'del', 'em', 'i', 'q', 's', 'span', 'strike', 'strong'],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    abbr: ['title'],
    acronym: ['title'],
    blockquote: ['cite'],
    del: ['datetime'],
    q: ['cite'],
  },
};
