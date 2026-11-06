import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState} from 'react';
import {fonts} from '../../assets/fonts';
import {FemaleIcon, MaleAndFemaleIcon, SearchIcon, MaleIcon} from '../../assets/icons';
import SwitchBtn from './components/SwitchBtn';
import DefaultButton from '../../common/components/DefaultButton';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {LoggedInStackType} from '../../navigation/types';
import {ScreenNames} from '../../constant/screenNames';
import { useTranslation } from 'react-i18next';

export interface SettingsProps {
  sortByTime: boolean;
  selectedAnimal: boolean;
  selectedSex: 'male' | 'female' | 'all';
  size: 'big' | 'small' | 'medium';
  age: string;
  isVaccinate: boolean;
}
export default function FilterSettings() {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<LoggedInStackType>>();
  const route =
    useRoute<RouteProp<LoggedInStackType, ScreenNames.FILTER_SETTINGS_PAGE>>();
  const [settings, setSettings] = useState<SettingsProps>(
    route.params?.settings ?? {
      sortByTime: false,
      selectedAnimal: true,
      selectedSex: 'male',
      size: 'small',
      age: '1',
      isVaccinate: false,
    },
  );
  const handleSwitchAnimal = (animal: {id: boolean}) => {
    setSettings(prevState => ({
      ...prevState,
      selectedAnimal: animal.id,
    }));
  };
  const handleSwitchSex = (animal: {id: SettingsProps['selectedSex']}) => {
    setSettings(prevState => ({
      ...prevState,
      selectedSex: animal.id,
    }));
  };
  const handleSwitchSize = (animal: {id: 'small' | 'big' | 'medium'}) => {
    setSettings(prevState => ({
      ...prevState,
      size: animal.id,
    }));
  };
  const onSortByTime = () => {
    setSettings(prevState => ({
      ...prevState,
      sortByTime: !prevState.sortByTime,
    }));
  };

  return (
    <ScrollView
      style={{margin: 10, gap: 20}}
      keyboardShouldPersistTaps={'handled'}>
      <View style={{gap: 20}}>
        <TouchableOpacity
          onPress={() => {
            onSortByTime();
          }}
          style={styles.sortByTimeBtn}>
          <View style={styles.activeSortByTime}>
            {settings.sortByTime && <View style={styles.checkedSortByTime} />}
          </View>
          <Text style={styles.sortByTimeText}>
            {t('filters.sortByDate')}
          </Text>
        </TouchableOpacity>
        <SwitchBtn
          handleSwitch={handleSwitchAnimal}
          active={settings.selectedAnimal}
          items={[
            {text: t('filters.dogs'), id: true},
            {text: t('filters.cats'), id: false},
          ]}
        />
        <SwitchBtn
          handleSwitch={handleSwitchSex}
          active={settings.selectedSex}
          items={[
            {text: t('filters.male'), icon: <MaleIcon />, id: 'male'},
            {text: t('filters.female'), icon: <FemaleIcon />, id: 'female'},
            {text: t('filters.anySex'), icon: <MaleAndFemaleIcon />, id: 'all'},
          ]}
        />
        <SwitchBtn
          handleSwitch={handleSwitchSize}
          active={settings.size}
          items={[
            {text: t('filters.small'), id: 'small'},
            {text: t('filters.medium'), id: 'medium'},
            {text: t('filters.big'), id: 'big'},
          ]}
        />
        <View style={{gap: 5}}>
          <Text style={styles.btnText}>{t('filters.age')}</Text>
          <View style={styles.searchWrapper}>
            <View style={styles.searchIconWrapper}>
              <SearchIcon />
            </View>
            <TextInput
              style={styles.input}
              placeholder={'1'}
              keyboardType={'numeric'}
              value={settings.age.toString()}
              onChangeText={text =>
                setSettings(prevState => ({
                  ...prevState,
                  age: text,
                }))
              }
            />
          </View>
        </View>

        <View style={styles.switcherContainer}>
          <Text style={styles.btnText}>{t('filters.vaccination')}</Text>
          <TouchableOpacity
            style={[
              styles.switcherBtn,
              settings.isVaccinate && {
                alignItems: 'flex-end',
                backgroundColor: '#D0CBF1',
              },
            ]}
            onPress={() => {
              setSettings(prevState => ({
                ...prevState,
                isVaccinate: !prevState.isVaccinate,
              }));
            }}>
            <View style={styles.switcherCircle} />
          </TouchableOpacity>
        </View>
        <DefaultButton
          onPress={() => {
            navigation.navigate(ScreenNames.DRAWER_STACK, {
              screen: ScreenNames.TAB_BAR_STACK,
              params: {
                screen: ScreenNames.HOME_PAGE,
                params: {settings},
              },
            });
          }}
          text={t('filters.showResults')}
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  sortByTimeBtn: {flexDirection: 'row', gap: 10, alignItems: 'center'},
  activeSortByTime: {
    borderRadius: 50,
    width: 15,
    height: 15,
    borderWidth: 1,
    borderColor: '#7A71BA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeSortByType: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderColor: '#7A71BA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedSortByTime: {
    borderRadius: 50,
    width: 10,
    height: 10,
    backgroundColor: '#7A71BA',
  },
  checkedSortByType: {
    width: 10,
    height: 10,
    backgroundColor: '#7A71BA',
  },
  sortByTimeText: {
    fontFamily: fonts.MontserratRegular,
    color: 'black',
  },
  searchIconWrapper: {marginHorizontal: 20},
  input: {flex: 1, height: '100%'},
  settingsIcon: {
    height: 40,
    width: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF1F4',
  },
  searchWrapper: {
    borderRadius: 20,
    borderColor: '#A0A0A0',
    borderWidth: 1,
    height: 50,
    width: Dimensions.get('window').width - 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  switcherWrapper: {
    flexDirection: 'row',
    padding: 5,
    borderRadius: 50,
    backgroundColor: '#EAE9FB',
    height: 50,
    alignItems: 'center',
  },
  activeBtn: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: 'white',
    height: 40,
  },
  btnText: {fontFamily: fonts.MontserratRegular, color: '#0B0B0B'},
  nonActiveBtn: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 50,
  },
  selectSearch: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: '#EAE9FB',
    height: 50,
    width: Dimensions.get('window').width - 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  switcherContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  switcherBtn: {
    width: 50,
    borderRadius: 50,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D0CBF1',
    padding: 3,
  },
  switcherCircle: {
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: '#7A71BA',
  },
});