module.exports = (mode, opEnv) => {
  switch (`${mode}_${opEnv}`) {
    case 'production_server':
      return {

      };

    case 'production_browser':
      return {

      };

    case 'development_server':
      return {

      };

    case 'development_browser':
      return {

      };
  }
};
