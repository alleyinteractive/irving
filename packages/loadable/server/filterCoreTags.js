const { coreChunks } = require('@irvingjs/core/server/getWebpackAssetTags');

const filterCoreTags = (tags, getCoreTags = false) => {
  const regEx = new RegExp(
    `(${coreChunks.join('|')})(\\.[^.]+)?(\\.(bundle|chunk))?\\.(js|css)`
  );

  return tags.filter((tag) => {
    const matches = tag.match(regEx);
    return getCoreTags ? matches : ! matches;
  });
};

module.exports = filterCoreTags;
