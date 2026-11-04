import { getAuth, signOut } from '@react-native-firebase/auth';
import { Text, TouchableOpacity } from 'react-native';

export default function Home() {
  return (
    <TouchableOpacity onPress={() => signOut(getAuth())}>
      <Text>Hello, World!</Text>
    </TouchableOpacity>
  );
}
