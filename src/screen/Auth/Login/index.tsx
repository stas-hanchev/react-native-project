import { View } from 'react-native';
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

  const handleChangeInput = (
    key: 'email' | 'password' | 'errorEmail' | 'errorPassword',
    value: string | null,
  ) => {
    setInputValues(prevState => ({ ...prevState, [key]: value }));
  };

  const checkEmail = () => {
    const emailValidator = new RegExp(
      '^([a-z0-9._%-]+@[a-z0-9.-]+.[a-z]{2,6})*$',
    );
    if (!emailValidator.test(inputValues.email)) {
      handleChangeInput('errorEmail', t('validation.emailInvalid'));
    } else {
      handleChangeInput('errorEmail', null);
    }
  };

  const checkPassword = (text: string) => {
    if (text.length < 8) {
      handleChangeInput(
        'errorPassword',
        t('validation.passwordLength'),
      );
    } else {
      handleChangeInput('errorPassword', null);
    }
  };

  const isDisabledLoginBtn = Boolean(
    inputValues.errorEmail ||
      inputValues.errorPassword ||
      !inputValues.email ||
      !inputValues.password,
  );

  const onLogin = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthLayout>
      <AuthHeader activeTab={'login'} />
      <View style={styles.formContainer}>
        <Input
          onBlur={checkEmail}
          value={inputValues.email}
          onChangeText={text => handleChangeInput('email', text)}
          error={inputValues.errorEmail}
          placeholder={t('auth.emailPlaceholder')}
        />
        <Input
          placeholder={t('auth.passwordPlaceholder')}
          value={inputValues.password}
          onChangeText={text => {
            handleChangeInput('password', text);
            checkPassword(text);
          }}
          secureTextEntry={true}
        />
      </View>
      <DefaultButton
        onPress={() => {
          onLogin(inputValues.email, inputValues.password);
        }}
        disabled={isDisabledLoginBtn}
        text={t('auth.loginButton')}
      />
    </AuthLayout>
  );
}
