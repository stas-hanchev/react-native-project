import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-worklets', () => ({
  ...jest.requireActual('react-native-worklets'),
  getUIRuntimeHolder: undefined,
}));

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest'),
);

jest.mock('react-native-localize', () => require('react-native-localize/mock'));

jest.mock('react-native-splash-screen', () => ({
  show: jest.fn(),
  hide: jest.fn(),
}));

jest.mock('react-native-webview', () => {
  const { View } = require('react-native');
  return { __esModule: true, default: View, WebView: View };
});

jest.mock('@react-native-firebase/auth', () => ({
  getAuth: jest.fn(() => ({ currentUser: null })),
  onAuthStateChanged: jest.fn((auth, callback) => {
    callback(null);
    return jest.fn();
  }),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('@react-native-firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(() => Promise.resolve({ docs: [] })),
}));
