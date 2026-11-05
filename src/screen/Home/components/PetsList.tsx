import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { Pet } from '../index';
import { fonts } from '../../../assets/fonts';
import { FavoriteIcon } from '../../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LoggedInStackType } from '../../../navigation/types';
import { ScreenNames } from '../../../constant/screenNames';

interface PetsListProps {
  pets: Pet[];
}

export default function PetsList({ pets }: PetsListProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<LoggedInStackType>>();

  const handleGoToPet = (item: Pet) => {
    navigation.navigate(ScreenNames.PET_PAGE, { pet: item });
  };

  return (
    <View style={styles.flex}>
      <FlatList
        data={pets}
        style={styles.mainContainer}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleGoToPet(item)}
            >
              <View style={styles.image}>
                <Image
                  source={{ uri: item.images[0] }}
                  style={[StyleSheet.absoluteFill, styles.imageRadius]}
                  resizeMode={'cover'}
                />
                <TouchableOpacity style={styles.favoriteBtn}>
                  <FavoriteIcon />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{item.type}</Text>
                  <Text style={styles.text}>{item.age} years</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  mainContainer: {
    width: '100%',
    marginHorizontal: 10,
  },
  item: {
    height: 200,
    width: Dimensions.get('window').width / 2 - 30,
    margin: 10,
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    justifyContent: 'space-between',
  },
  imageRadius: { borderRadius: 20 },
  favoriteBtn: { alignSelf: 'flex-end', margin: 10 },
  textContainer: { margin: 15 },
  text: {
    color: 'white',
    fontFamily: fonts.MontserratSemiBold,
  },
});
