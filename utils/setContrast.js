/**
 * Determine whether its better to use black or white text.
 * @param {string} rgb
 */
export default function setContrast(rgb) {
  return 125 < (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000 ?
    '#000000' : '#ffffff';
}
