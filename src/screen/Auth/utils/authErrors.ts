import type { ReactNativeFirebase } from '@react-native-firebase/app';

export const getAuthErrorKey = (error: unknown, fallbackKey: string) => {
  switch ((error as ReactNativeFirebase.NativeFirebaseError)?.code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
    case 'auth/invalid-email':
      return 'validation.invalidCredentials';
    case 'auth/too-many-requests':
      return 'validation.tooManyRequests';
    case 'auth/network-request-failed':
      return 'validation.networkError';
    default:
      return fallbackKey;
  }
};
