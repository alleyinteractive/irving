export const richText = {
  allowedTags: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
    'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'cite', 'hr', 'br',
    'div', 'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'img',
    'figure', 'figcaption', 'iframe', 'video',
  ],
  allowedAttributes: {
    '*': ['class', 'id', 'data-*', 'style'],
    iframe: ['*'],
    a: ['href', 'name', 'target'],
    img: ['src', 'srcset', 'sizes', 'alt', 'width', 'height'],
    video: ['src', 'controls'],
  },
  selfClosing: [
    'img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta',
  ],
  allowedSchemes: ['http', 'https', 'ftp', 'mailto'],
  allowedSchemesByTag: {},
  allowProtocolRelative: true,
};

export const plainText = {
  allowedTags: ['a', 'b', 'i', 'strong', 'em', 'span'],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
  },
};
