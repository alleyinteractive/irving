const path = require('path');

module.exports = {
  sections: [
    {
      name: 'Styled Components',
      content: path.join(__dirname, '../components/readme.md'),
      components: path.join(__dirname, '../components/**/*.js'),
    },
  ],
};
