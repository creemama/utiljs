// "Configure Babel" https://babeljs.io/docs/en/configuration#babelconfigjs
module.exports = function(api) {
  api.cache(true);

  const presets = ["@babel/preset-env"];
  const plugins = [["@babel/plugin-transform-runtime", { corejs: 2 }]];

  return {
    presets,
    plugins
  };
};
