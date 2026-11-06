import { Alert, Text, View } from 'react-native';
import { useEffect } from 'react';
import DefaultButton from '../../DefaultButton';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TabBarStackType } from '../../../../navigation/types';
import { ScreenNames } from '../../../../constant/screenNames';
import { fonts } from '../../../../constant/fonts';

interface ErrorFallBackProps {
  error: Error;
  resetError: () => void;
}

export default function ErrorFallBack({
  error,
  resetError,
}: ErrorFallBackProps) {
  const navigation = useNavigation<NativeStackNavigationProp<TabBarStackType>>();
  
  const handleResetError = () => {
    resetError();
    navigation.navigate(ScreenNames.HOME_PAGE);
  };
  
  useEffect(() => {
    if (__DEV__ && error.stack) {
      Alert.alert(error.stack);
    }
  }, [error.stack]);
  
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        flex: 1,
      }}>
      <View style={{width: '100%', gap: 20}}>
        <Text style={{fontFamily: fonts.ComfortaaRegular, fontSize: 24}}>
          Opsss. Something went wrong
        </Text>
        <Text style={{fontFamily: fonts.MontserratSemiBold}}>
          Error message: {error.message}
        </Text>
        <DefaultButton
          onPress={() => {
            handleResetError();
          }}
          text={'Go to home'}
        />
      </View>
    </View>
  );
}