import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import Home from '../../screen/Home';
import { ScreenNames } from '../../constant/screenNames';
import { TabBarStackType } from '../types';
import Favorite from '../../screen/Favorite';
import { StyleSheet, Text, View } from 'react-native';
import { HeartIcon, Label, PawIcon } from '../../assets/icons';

const Tab = createBottomTabNavigator<TabBarStackType>();

const getTabName = (name: string) => {
  switch (name) {
    case ScreenNames.HOME_PAGE:
      return 'Пухнастики';
    case ScreenNames.FAVORITE_PAGE:
      return 'Улюблені';
    default:
      return name;
  }
};

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    color: '#838383',
    marginTop: 4,
  },
});

const screenOptions = ({
  route,
}: {
  route: RouteProp<TabBarStackType>;
}): BottomTabNavigationOptions => ({
  header: () => {
    return (
      <View
        style={{
          width: '100%',
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}
      >
        {/* <Text>{getTabName(route.name)}</Text> */}
        <Label />
      </View>
    );
  },
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
  tabBarLabel: () => (
    <Text style={styles.label} numberOfLines={1}>
      {getTabName(route.name)}
    </Text>
  ),
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
