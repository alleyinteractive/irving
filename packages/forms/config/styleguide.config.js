const path = require('path');

module.exports = {
  sections: [
    {
      name: 'Irving Forms',
      content: path.join(__dirname, '../readme.md'),
      sections: [
        {
          name: 'Components',
          content: path.join(__dirname, '../components/readme.md'),
          components: path.join(__dirname, '../components/**/*.js'),
        },
      ],
    },
  ],
};
