import {
  KeyboardTypeOptions,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import styles from '../../../screen/Auth/styles';
import React, {useState} from 'react';
import {HidePassIcon, ViewPassIcon} from '../../../assets/icons/index';

interface IInput {
  onBlur?: () => void;
  value: string;
  onChangeText: (text: string) => void;
  placeholderColor?: string;
  placeholder?: string;
  error?: string | null;
  secureTextEntry?: boolean;
  additionalContainerStyle?: ViewStyle;
  additionInputStyle?: ViewStyle;
  onFocus?: () => void;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: TextInputProps['autoCapitalize'];
}
export default function Input({
  onBlur,
  placeholder,
  value,
  onChangeText,
  placeholderColor = '#838383',
  error,
  secureTextEntry = false,
  additionalContainerStyle,
  additionInputStyle,
  onFocus,
  multiline,
  numberOfLines,
  keyboardType,
  autoCapitalize,
}: IInput) {
  const [isPassHidden, setIsPassHidden] = useState(secureTextEntry);

  return (
    <>
      <View style={[styles.inputContainer, additionalContainerStyle]}>
        <TextInput
          placeholder={placeholder}
          style={[styles.input, additionInputStyle]}
          placeholderTextColor={placeholderColor}
          onBlur={onBlur}
          onFocus={onFocus}
          value={value}
          onChangeText={text => onChangeText(text)}
          secureTextEntry={isPassHidden}
          multiline={multiline}
          numberOfLines={numberOfLines}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => {
              setIsPassHidden(!isPassHidden);
            }}
            hitSlop={{top: 15, bottom: 15, right: 15, left: 15}}>
            {isPassHidden ? (
              <ViewPassIcon fill={'#000000'} />
            ) : (
              <HidePassIcon fill={'#a36161'} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
}
