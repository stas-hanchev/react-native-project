import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import styles from '../../styles';

interface IAuthLayout {
  children: React.ReactNode;
}

export default function AuthLayout({children}: IAuthLayout) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={[styles.mainWrapper]}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.select({android: 20, ios: 90})}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          {children}
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}