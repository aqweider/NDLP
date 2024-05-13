module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: { production: { plugins: ['transform-remove-console'] } },
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@': '.',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        "envName": "APP_ENV",
        "moduleName": "@env",
        "path": "env/.env",
        "blocklist": null,
        "allowlist": null,
        "safe": false,
        "allowUndefined": true,
        "verbose": false
     
      },
    ],
    'react-native-reanimated/plugin'
  ],
  presets: ['module:@react-native/babel-preset'],
};
