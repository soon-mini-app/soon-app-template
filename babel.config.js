module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      ['babel-preset-expo',{ jsxImportSource: 'nativewind' },]
      ,'nativewind/babel',
    ],
    plugins: [
      // Compile Exported Namespaces
      '@babel/plugin-proposal-export-namespace-from',
      // React Native Reanimated
      'react-native-reanimated/plugin',
      // Use Absolute Imports
      ['module-resolver', 
        { root: ['./'],
          alias: {
            '@': './src',
            '@env': './src/core/env.js',
          },
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
        }
      ],
    ]
  }
}
