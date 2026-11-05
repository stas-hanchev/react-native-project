import { NavigatorScreenParams } from '@react-navigation/native';
import { ScreenNames } from '../../constant/screenNames';
import type { SettingsProps } from '../../screen/FilterSettings';
import { Pet } from '../../screen/Home';

export type DrawerStackType = {
    [ScreenNames.TAB_BAR_STACK]: NavigatorScreenParams<TabBarStackType>;
}

export type TabBarStackType = {
    [ScreenNames.HOME_PAGE]: { settings?: SettingsProps } | undefined;
    [ScreenNames.FAVORITE_PAGE]: undefined;
}

export type LoggedInStackType = {
    [ScreenNames.DRAWER_STACK]: NavigatorScreenParams<DrawerStackType>;
    [ScreenNames.FILTER_SETTINGS_PAGE]: { settings?: SettingsProps } | undefined;
    [ScreenNames.PET_PAGE]: { pet: Pet };
}

export type LoggedOutStackType = {
    [ScreenNames.LOGIN_PAGE]: undefined;
    [ScreenNames.REGISTRATION_PAGE]: undefined;
}

export type RootStackNavigation = {
    [ScreenNames.LOGGED_IN_STACK]: NavigatorScreenParams<LoggedInStackType>;
    [ScreenNames.LOGGED_OUT_STACK]: NavigatorScreenParams<LoggedOutStackType>;
}
