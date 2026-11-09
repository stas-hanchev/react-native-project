import { Text, View } from 'react-native';
import React, { useState } from 'react';
import styles from '../styles';
import AuthHeader from '../components/AuthHeader/index';
import Input from '../../../common/components/Input/index';
import DefaultButton from '../../../common/components/DefaultButton/index';
import AuthLayout from '../components/AuthLayout/index';
import {
  getAuth,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import { useTranslation } from 'react-i18next';
import { isEmailValid, isPasswordValid } from '../../../constant/validation';
import { getAuthErrorKey } from '../utils/authErrors';

interface IInputValue {
  email: string;
  password: string;
  errorEmail: null | string;
  errorPassword: null | string;
}

export default function LoginPage() {
  const { t } = useTranslation();
  const [inputValues, setInputValues] = useState<IInputValue>({
    email: '',
    password: '',
    errorEmail: null,
    errorPassword: null,
  });
  const [loginErrorKey, setLoginErrorKey] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangeInput = (
    key: 'email' | 'password' | 'errorEmail' | 'errorPassword',
    value: string | null,
  ) => {
    setInputValues(prevState => ({ ...prevState, [key]: value }));
  };

  const checkEmail = (email: string) => {
    handleChangeInput(
      'errorEmail',
      isEmailValid(email) ? null : t('validation.emailInvalid'),
    );
  };

  const checkPassword = (password: string) => {
    handleChangeInput(
      'errorPassword',
      isPasswordValid(password) ? null : t('validation.passwordLength'),
    );
  };

  const onChangeEmail = (text: string) => {
    handleChangeInput('email', text);
    setLoginErrorKey(null);
    if (inputValues.errorEmail) {
      checkEmail(text);
    }
  };

  const onChangePassword = (text: string) => {
    handleChangeInput('password', text);
    setLoginErrorKey(null);
    if (inputValues.errorPassword) {
      checkPassword(text);
    }
  };

  const isDisabledLoginBtn =
    isSubmitting ||
    !isEmailValid(inputValues.email) ||
    !isPasswordValid(inputValues.password);

  const onLogin = async () => {
    setIsSubmitting(true);
    setLoginErrorKey(null);
    try {
      await signInWithEmailAndPassword(
        getAuth(),
        inputValues.email.trim(),
        inputValues.password,
      );
    } catch (error) {
      setLoginErrorKey(getAuthErrorKey(error, 'validation.loginFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <AuthHeader activeTab={'login'} />
      <View style={styles.formContainer}>
        <Input
          onBlur={() => checkEmail(inputValues.email)}
          value={inputValues.email}
          onChangeText={onChangeEmail}
          error={inputValues.errorEmail}
          placeholder={t('auth.emailPlaceholder')}
          keyboardType={'email-address'}
          autoCapitalize={'none'}
        />
        <Input
          onBlur={() => checkPassword(inputValues.password)}
          placeholder={t('auth.passwordPlaceholder')}
          value={inputValues.password}
          onChangeText={onChangePassword}
          error={inputValues.errorPassword}
          secureTextEntry={true}
          autoCapitalize={'none'}
        />
        {!!loginErrorKey && (
          <Text style={styles.errorText}>{t(loginErrorKey)}</Text>
        )}
      </View>
      <DefaultButton
        onPress={onLogin}
        disabled={isDisabledLoginBtn}
        text={t('auth.loginButton')}
      />
    </AuthLayout>
  );
}
