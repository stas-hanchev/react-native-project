import { useEffect, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SearchIcon, SettingsIcon } from '../../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../../constant/screenNames';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LoggedInStackType } from '../../../navigation/types';
import { SettingsProps } from '../../FilterSettings';
import { useTranslation } from 'react-i18next';

interface SearchBarProps {
    onSearch: (text: string) => void;
    settings?: SettingsProps;
}

export default function SearchBar({ onSearch, settings }: SearchBarProps) {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const navigation =
    useNavigation<NativeStackNavigationProp<LoggedInStackType>>();

  useEffect(() => {
    const timeout = setTimeout(() => {
        onSearch(name)
    }, 500);

    return () => clearTimeout(timeout);
  }, [name, onSearch]);

  const handleNavigateToSettings = () => {
    navigation.navigate(ScreenNames.FILTER_SETTINGS_PAGE, { settings });
  } 

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.searchWrapper}>
        <View style={styles.searchIconWrapper}>
          <SearchIcon />
        </View>
        <TextInput
          style={styles.input}
          placeholder={t('home.searchPlaceholder')}
          value={name}
          onChangeText={text => setName(text)}
        />
      </View>
      <TouchableOpacity
        style={styles.settingsIcon}
        onPress={handleNavigateToSettings}
      >
        <SettingsIcon />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flexDirection: 'row', alignItems: 'center' },
  searchWrapper: {
    borderRadius: 20,
    backgroundColor: '#EFF1F4',
    height: 40,
    width: Dimensions.get('window').width - 70,
    marginHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchIconWrapper: { marginHorizontal: 20 },
  input: { flex: 1, height: '100%' },
  settingsIcon: {
    height: 40,
    width: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF1F4',
  },
});
