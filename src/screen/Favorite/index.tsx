import { useCallback, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import PetsList from '../Home/components/PetsList';
import type { Pet } from '../Home';
import { useTranslation } from 'react-i18next';

export default function Favorite() {
  const { t } = useTranslation();
  const [favorites, setFavorites] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadFavorites = useCallback(async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites]),
  );

  const renderContent = () => {
    if (isLoading) {
      return <ActivityIndicator style={styles.loader} />;
    }
    if (!favorites.length) {
      return <Text style={styles.emptyText}>{t('favorite.empty')}</Text>;
    }
    return <PetsList pets={favorites} onFavoriteToggle={loadFavorites} />;
  };

  return <View style={styles.container}>{renderContent()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    marginTop: 40,
  },
  emptyText: {
    marginTop: 40,
    textAlign: 'center',
    color: '#838383',
  },
});
