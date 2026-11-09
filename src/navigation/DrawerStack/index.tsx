import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerNavigationOptions,
} from '@react-navigation/drawer';
import { ScreenNames } from '../../constant/screenNames';
import TabBarStack from '../TabBarStack';
import { DrawerStackType } from '../types';
import Header from '../../common/components/Header';
import { Dimensions } from 'react-native';
import DrawerContent from '../../common/components/DrawerContent';

const Drawer = createDrawerNavigator<DrawerStackType>();

const renderDrawerContent = (props: DrawerContentComponentProps) => (
  <DrawerContent {...props} />
);

const renderHeader = () => <Header />;

const screenOptions: DrawerNavigationOptions = {
  header: renderHeader,
  drawerPosition: 'right',
  drawerStyle: {
    width: Dimensions.get('window').width,
  },
};

export default function DrawerStack() {
  return (
    <Drawer.Navigator
      initialRouteName={ScreenNames.TAB_BAR_STACK}
      drawerContent={renderDrawerContent}
      screenOptions={screenOptions}
    >
      <Drawer.Screen name={ScreenNames.TAB_BAR_STACK} component={TabBarStack} />
    </Drawer.Navigator>
  );
}
