const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const resolveFrom = require("resolve-from");

const config = getDefaultConfig(__dirname);

const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"],
    resolveRequest:(context, moduleName, platform) => {
      if (
        // If the bundle is resolving "event-target-shim" from a module that is part of "react-native-webrtc".
        moduleName.startsWith("event-target-shim") &&
        context.originModulePath.includes("react-native-webrtc")
      ) {
        // Resolve event-target-shim relative to the react-native-webrtc package to use v6.
        // React Native requires v5 which is not compatible with react-native-webrtc.
        const eventTargetShimPath = resolveFrom(
          context.originModulePath,
          moduleName
        );
    
        return {
          filePath: eventTargetShimPath,
          type: "sourceFile",
        };
      }
    
      // Ensure you call the default resolver.
      return context.resolveRequest(context, moduleName, platform);
    }
  };

module.exports = withNativeWind(config, { 
    input: './global.css' 
});