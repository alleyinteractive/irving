export const richText = {
  allowedTags: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
    'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'cite', 'hr', 'br',
    'div', 'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'img',
    'figure', 'figcaption', 'iframe', 'audio', 'video', 'time', 'article',
    'section', 'aside', 'footer', 'header', 'nav',
  ],
  allowedAttributes: {
    '*': ['class', 'id', 'data-*', 'style'],
    iframe: ['*'],
    a: ['href', 'name', 'target'],
    img: ['src', 'srcset', 'sizes', 'alt', 'width', 'height'],
    audio: ['autoplay', 'controls', 'crossorigin', 'currentTime',
      'disableRemotePlayback', 'duration', 'loop', 'muted', 'preload', 'src'],
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
  allowedTags: ['a', 'b', 'i', 'strong', 'em', 'span'],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
  },
};
