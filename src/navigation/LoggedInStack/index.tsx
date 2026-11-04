import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoggedInStackType } from '../types';
import { ScreenNames } from '../../constant/screenNames';

import TabBarStack from '../TabBarStack/index';

const Stack = createNativeStackNavigator<LoggedInStackType>();

export default function LoggedInStack() {
  return (
    <Stack.Navigator
      initialRouteName={ScreenNames.TAB_BAR_STACK}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={ScreenNames.TAB_BAR_STACK} component={TabBarStack} />
    </Stack.Navigator>
  );
}
