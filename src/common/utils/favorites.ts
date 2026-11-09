import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from '@react-native-firebase/auth';
import type { Pet } from '../../screen/Home';

const getFavoritesKey = () =>
  `favorites:${getAuth().currentUser?.uid ?? 'guest'}`;

export const getFavorites = async (): Promise<Pet[]> => {
  try {
    const storedFavorites = await AsyncStorage.getItem(getFavoritesKey());
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const toggleFavorite = async (pet: Pet) => {
  try {
    const favorites = await getFavorites();
    const nextFavorites = favorites.some(favorite => favorite.id === pet.id)
      ? favorites.filter(favorite => favorite.id !== pet.id)
      : [...favorites, pet];

    await AsyncStorage.setItem(getFavoritesKey(), JSON.stringify(nextFavorites));
  } catch (error) {
    console.error(error);
  }
};
