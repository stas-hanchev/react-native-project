module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: ['./jest.setup.js'],
  resolver: 'react-native-reanimated/jest/resolver',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation|@react-native-firebase|@react-native-async-storage|react-native-.*)/)',
  ],
};
