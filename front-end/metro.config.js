const { getDefaultConfig } = require("metro-config");
const { resolver: defaultResolver, transformer } = getDefaultConfig.getDefaultValues();

exports.resolver = {
  ...defaultResolver,
  assetExts: defaultResolver.assetExts.filter((ext) => ext !== 'svg'),
  sourceExts: [
    ...defaultResolver.sourceExts,
    "cjs",
    "svg",
  ],
};
exports.transformer = {
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
}