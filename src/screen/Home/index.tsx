// import { getAuth, signOut } from '@react-native-firebase/auth';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  QueryConstraint,
  where,
} from '@react-native-firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import PetsList from './components/PetsList';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import SearchBar from './components/SearchBar';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SettingsProps } from '../FilterSettings';
import { TabBarStackType } from '../../navigation/types';
import { ScreenNames } from '../../constant/screenNames';
import { useTranslation } from 'react-i18next';

export interface Pet {
  id: string;
  age: number;
  type: string;
  location: string;
  name: string;
  description: string;
  size: string;
  isVaccinated: boolean;
  images: string[];
  sex: string;
  isDog: boolean;
  color: string;
  timeStamp: number;
}

const getConstraints = (settings?: SettingsProps): QueryConstraint[] => {
  if (!settings) {
    return [];
  }

  const constraints: QueryConstraint[] = [
    where('isDog', '==', settings.selectedAnimal),
    where('size', '==', settings.size),
  ];

  if (settings.selectedSex !== 'all') {
    constraints.push(where('sex', '==', settings.selectedSex));
  }
  if (settings.age.trim()) {
    constraints.push(where('age', '==', Number(settings.age)));
  }
  if (settings.isVaccinate) {
    constraints.push(where('isVaccinated', '==', true));
  }

  return constraints;
};

export default function Home() {
  const { t } = useTranslation();
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  const route = useRoute<RouteProp<TabBarStackType, ScreenNames.HOME_PAGE>>();
  const routeSettings = route.params?.settings;

  // <TouchableOpacity onPress={() => signOut(getAuth())}>
  // </TouchableOpacity>

  useEffect(() => {
    let isActual = true;

    const loadPets = async () => {
      setIsLoading(true);
      try {
        const result = await getDocs(
          query(
            collection(getFirestore(), 'animals'),
            ...getConstraints(routeSettings),
          ),
        );
        const petsList: Pet[] = result.docs.map(item => ({
          id: item.id,
          ...(item.data() as Omit<Pet, 'id'>),
        }));
        if (routeSettings?.sortByTime) {
          petsList.sort((a, b) => b.timeStamp - a.timeStamp);
        }
        if (isActual) {
          setPets(petsList);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (isActual) {
          setIsLoading(false);
        }
      }
    };

    loadPets();
    
    return () => {
      isActual = false;
    };
  }, [routeSettings]);

  const visiblePets = useMemo(() => {
    const text = searchText.trim().toLowerCase();
    if (!text) {
      return pets;
    }
    return pets.filter(pet =>
      [pet.name, pet.type].some(value =>
        value?.toLowerCase().includes(text),
      ),
    );
  }, [pets, searchText]);

  const renderContent = () => {
    if (isLoading) {
      return <ActivityIndicator style={styles.loader} />;
    }
    if (!visiblePets.length) {
      return <Text style={styles.emptyText}>{t('home.nothingFound')}</Text>;
    }
    return <PetsList pets={visiblePets} />;
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={setSearchText} settings={routeSettings} />
      {renderContent()}
    </View>
  );
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
