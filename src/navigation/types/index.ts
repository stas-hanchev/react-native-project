import { NavigatorScreenParams } from '@react-navigation/native';
import { ScreenNames } from '../../constant/screenNames';

export type LoggedInStackType = {
    [ScreenNames.HOME_PAGE]: undefined;
}

export type LoggedOutStackType = {
    [ScreenNames.LOGIN_PAGE]: undefined;
    [ScreenNames.REGISTRATION_PAGE]: undefined;
}

export type RootStackNavigation = {
    [ScreenNames.LOGGED_IN_STACK]: NavigatorScreenParams<LoggedInStackType>;
    [ScreenNames.LOGGED_OUT_STACK]: NavigatorScreenParams<LoggedOutStackType>;
}
