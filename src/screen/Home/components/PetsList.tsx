import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getFavorites, toggleFavorite } from '../../../common/utils/favorites';
import type { Pet } from '../index';
import { fonts } from '../../../assets/fonts';
import { FavoriteIcon } from '../../../assets/icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LoggedInStackType } from '../../../navigation/types';
import { ScreenNames } from '../../../constant/screenNames';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface PetsListProps {
  pets: Pet[];
  onFavoriteToggle?: () => void;
}

export default function PetsList({ pets, onFavoriteToggle }: PetsListProps) {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<LoggedInStackType>>();

  const [favorites, setFavorites] = useState<Pet[]>([]);

  const handleGoToPet = (item: Pet) => {
    navigation.navigate(ScreenNames.PET_PAGE, { pet: item });
  };

  const refreshFavorites = async () => {
    setFavorites(await getFavorites());
  };

  useFocusEffect(
    useCallback(() => {
      refreshFavorites();
    }, []),
  );

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
                <TouchableOpacity
                  style={styles.favoriteBtn}
                  onPress={() => {
                    toggleFavorite(item).then(() => {
                      refreshFavorites();
                      onFavoriteToggle?.();
                    });
                  }}
                >
                  <FavoriteIcon
                    isFavorite={favorites.some(
                      element => element.id === item.id,
                    )}
                  />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{item.type}</Text>
                  <Text style={styles.text}>{t('pet.age', { count: item.age })}</Text>
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
