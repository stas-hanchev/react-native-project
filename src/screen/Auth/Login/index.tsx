import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from 'react-native';

import styles from './styles';
import React, { useState } from 'react';
import { HidePassIcon, ViewPassIcon } from '../../../assets/icons';

interface InputValues {
  email: string;
  password: string;
  errorEmail: string | null;
  errorPassword: string | null;
}

export default function Login() {
  const [inputValues, setInputValues] = useState<InputValues>({
    email: '',
    password: '',
    errorEmail: null,
    errorPassword: null,
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(true);

  const handleChangeInput = (key: keyof InputValues, value: string | null) => {
    setInputValues(prevState => ({ ...prevState, [key]: value }));
  };

  const checkEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputValues.email)) {
      setInputValues(prevState => ({
        ...prevState,
        errorEmail: 'Invalid email address',
      }));
    } else {
      setInputValues(prevState => ({ ...prevState, errorEmail: null }));
    }
  };

  const checkPassword = (password: string) => {
    if (password.length < 8) {
      setInputValues(prevState => ({
        ...prevState,
        errorPassword: 'Password must be at least 8 characters long',
      }));
    } else {
      setInputValues(prevState => ({ ...prevState, errorPassword: null }));
    }
  };

  const isDisabledLoginBtn = Boolean(
    !inputValues.email ||
      !inputValues.password ||
      inputValues.errorEmail ||
      inputValues.errorPassword,
  );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={styles.keyboardWrapper} behavior="padding">
        <View style={styles.mainWrapper}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Раді тебе вітати!</Text>
            <Text style={styles.welcomeText}>
              Кожен пухнастик заслуговує на дбайливих господарів.Ми допоможемо
              тобі знайти друга.
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.loginBtn}>
              <Text>Вхід</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registrationBtn}>
              <Text>Реєстрація</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Email"
                style={styles.input}
                placeholderTextColor="#838383"
                onBlur={() => {
                  checkEmail();
                }}
                value={inputValues.email}
                onChangeText={text => handleChangeInput('email', text)}
              />
            </View>
            {inputValues.errorEmail && (
              <Text style={styles.errorText}>{inputValues.errorEmail}</Text>
            )}
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Password"
                style={styles.input}
                placeholderTextColor="#838383"
                value={inputValues.password}
                onChangeText={text => {
                  handleChangeInput('password', text);
                  checkPassword(text);
                }}
                secureTextEntry={ isPasswordVisible }
              />
              <TouchableOpacity
                onPress={() => { setIsPasswordVisible(!isPasswordVisible); }}
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
              >
                { isPasswordVisible ? <HidePassIcon fill="#611010" /> : <ViewPassIcon fill="#000000" /> }
              </TouchableOpacity>
            </View>
            {inputValues.errorPassword && (
              <Text style={styles.errorText}>{inputValues.errorPassword}</Text>
            )}
          </View>
          <TouchableOpacity
            style={[
              styles.loginBtnContainer,
              isDisabledLoginBtn && { opacity: 0.5 },
            ]}
            disabled={isDisabledLoginBtn}
          >
            <Text style={styles.loginText}>Увійти</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
