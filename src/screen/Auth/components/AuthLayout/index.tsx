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
      <KeyboardAvoidingView
        style={styles.keyboardWrapper}
        keyboardVerticalOffset={Platform.select({android: 20, ios: 90})}
        behavior="padding">
        <View style={styles.mainWrapper}>{children}</View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}