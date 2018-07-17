export const richText = {
  allowedTags: [
    'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
    'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
    'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'img',
    'figure', 'figcaption', 'iframe',
  ],
  allowedAttributes: {
    '*': ['class', 'id'],
    iframe: ['*'],
    a: ['href', 'name', 'target'],
    img: ['src', 'srcset', 'sizes'],
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
