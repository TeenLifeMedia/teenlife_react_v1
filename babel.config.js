module.exports = function(api) {
  const presets = ['@babel/preset-env', '@babel/preset-react']
  const plugins = ['@babel/plugin-transform-async-to-generator']

  api.cache(false)

  return {
    presets,
    plugins,
  }
}
