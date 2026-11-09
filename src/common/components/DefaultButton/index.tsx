import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import styles from '../../../screen/Auth/styles';
import React from 'react';

interface IDefaultButton {
  disabled?: boolean;
  onPress: () => void;
  text: string;
}
export default function DefaultButton({
  disabled = false,
  onPress,
  text,
}: IDefaultButton) {
  return (
    <TouchableOpacity
      style={[styles.loginBtnContainer, disabled && buttonStyles.disabled]}
      disabled={disabled}
      onPress={onPress}>
      <Text style={styles.loginText}>{text}</Text>
    </TouchableOpacity>
  );
}

const buttonStyles = StyleSheet.create({
  disabled: {opacity: 0.5},
});
