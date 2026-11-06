import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../../styles';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../../../constant/screenNames';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LoggedOutStackType } from '../../../../navigation/types';
import { useTranslation } from 'react-i18next';

interface IAuthHeader {
  activeTab: 'login' | 'registration';
}
export default function AuthHeader({ activeTab }: IAuthHeader) {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<LoggedOutStackType>>();

  const navigateToLogin = () => {
    navigation.navigate(ScreenNames.LOGIN_PAGE);
  };

  const navigateToRegistration = () => {
    navigation.navigate(ScreenNames.REGISTRATION_PAGE);
  };
  return (
    <>
      <View style={[styles.titleContainer]}>
        <Text style={styles.title}>{t('auth.title')}</Text>
        <Text style={styles.welcomeText}>{t('auth.welcome')}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={navigateToLogin}
          style={activeTab === 'login' ? styles.activeTab : styles.disabledTab}
        >
          <Text style={styles.authText}>{t('auth.loginTab')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigateToRegistration}
          style={
            activeTab === 'registration' ? styles.activeTab : styles.disabledTab
          }
        >
          <Text style={styles.authText}>{t('auth.registrationTab')}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
