/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  LogBox,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import RootNavigation from './src/navigation';

import 'react-native-gesture-handler';
import './src/localization';
import SplashScreen from 'react-native-splash-screen';

// import {
//   collection,
//   doc,
//   getFirestore,
//   writeBatch,
// } from '@react-native-firebase/firestore';

// import { animals } from './animals_list';
// import { useEffect } from 'react';

LogBox.ignoreLogs([
  '[Reanimated] Dependencies should only be used on the web',
]);

function App() {
  const isDarkMode = useColorScheme() === 'dark';

//   const db = getFirestore();

//   const uploadAnimalsToFirestore = async (
//     animals: Record<string, unknown>[],
//   ) => {
//     const collectionRef = collection(db, 'animals');
//     const batch = writeBatch(db);

//     animals.forEach(animal => {
//       batch.set(doc(collectionRef), animal);
//     });

//     await batch.commit();
//   };

//   useEffect(() => {
//     uploadAnimalsToFirestore(animals);
//   }, []);

  SplashScreen.hide();

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={styles.container}>
        <RootNavigation />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
