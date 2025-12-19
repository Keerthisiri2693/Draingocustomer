// Metro configuration for React Native
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  watchFolders: [
    // Add any additional folders you want Metro to watch
    // For example, if you have shared code:
    // path.resolve(__dirname, '../shared'),
  ],
  resolver: {
    // Add any custom resolver configurations here
    // For example, to resolve additional file extensions:
    sourceExts: [...defaultConfig.resolver.sourceExts, 'cjs'],
  },
};

module.exports = mergeConfig(defaultConfig, config);