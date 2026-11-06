import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import Home from '../../screen/Home';
import { ScreenNames } from '../../constant/screenNames';
import { TabBarStackType } from '../types';
import Favorite from '../../screen/Favorite';
import { StyleSheet, Text } from 'react-native';
import { HeartIcon, PawIcon } from '../../assets/icons';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator<TabBarStackType>();

const tabTitleKeys: Record<keyof TabBarStackType, string> = {
  [ScreenNames.HOME_PAGE]: 'tabs.home',
  [ScreenNames.FAVORITE_PAGE]: 'tabs.favorites',
};

const TabLabel = ({ name }: { name: keyof TabBarStackType }) => {
  const { t } = useTranslation();

  return (
    <Text style={styles.label} numberOfLines={1}>
      {t(tabTitleKeys[name])}
    </Text>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    color: '#838383',
    marginTop: 4,
  },
  hiddenTab: {
    display: 'none',
  },
});

const screenOptions = ({
  route,
}: {
  route: RouteProp<TabBarStackType>;
}): BottomTabNavigationOptions => ({
  headerShown: false,
  tabBarStyle: {
    height: 60,
    width: '100%',
    backgroundColor: '#E5F3F5',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingBottom: 10,
  },
  tabBarIcon: ({ focused }) => {
    if (route.name === ScreenNames.HOME_PAGE) {
      return <PawIcon isFocused={focused} />;
    }
    if (route.name === ScreenNames.FAVORITE_PAGE) {
      return <HeartIcon isFocused={focused} />;
    }
    return null;
  },
  tabBarLabel: () => <TabLabel name={route.name} />,
});

export default function TabBarStack() {
  return (
    <Tab.Navigator
      initialRouteName={ScreenNames.HOME_PAGE}
      screenOptions={screenOptions}
    >
      <Tab.Screen name={ScreenNames.HOME_PAGE} component={Home} />
      <Tab.Screen name={ScreenNames.FAVORITE_PAGE} component={Favorite} />
    </Tab.Navigator>
  );
}
