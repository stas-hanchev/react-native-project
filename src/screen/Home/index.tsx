import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, TouchableOpacity } from 'react-native';
import { RootStackNavigation } from '../../navigation/types';

export default function Home() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackNavigation>>();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Text>Hello, World!</Text>
    </TouchableOpacity>
  );
}
