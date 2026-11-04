import AuthLayout from '../components/AuthLayout/index';
import AuthHeader from '../components/AuthHeader/index';
import styles from '../styles';
import { View } from 'react-native';
import Input from '../../../common/components/Input/index';
import { Formik, FormikHelpers, FormikValues } from 'formik';
import { RegistrationSchema } from '../utils/validation';
import DefaultButton from '../../../common/components/DefaultButton/index';
import { useEffect, useState } from 'react';

import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from '@react-native-firebase/auth';
import type { ReactNativeFirebase } from '@react-native-firebase/app';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { RootStackNavigation } from '../../../navigation/types';
import { ScreenNames } from '../../../constant/screenNames';

interface IRegistrationValues {
  email: string;
  password: string;
  confirmPassword: string;
}

interface ITouched {
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
}

export default function Registration() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackNavigation>>();

  const [touched, setTouched] = useState<ITouched>({
    email: false,
    password: false,
    confirmPassword: false,
  });

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), user => {
      if (user) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: ScreenNames.LOGGED_IN_STACK,
                params: { screen: ScreenNames.HOME_PAGE },
              },
            ],
          }),
        );
      }
    });

    return subscriber;
  }, [navigation]);

  const registrateUser = async (
    email: string,
    password: string,
    formikHelpers: FormikHelpers<IRegistrationValues>,
  ) => {
    try {
      await createUserWithEmailAndPassword(getAuth(), email, password);
    } catch (error) {
      if (
        (error as ReactNativeFirebase.NativeFirebaseError).code ===
        'auth/email-already-in-use'
      ) {
        formikHelpers.setFieldError('email', 'Email is already in use');
      }
      console.error(error);
    }
  };

  return (
    <AuthLayout>
      <AuthHeader activeTab={'registration'} />
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={(value, formikHelpers) => {
          registrateUser(value.email, value.password, formikHelpers);
        }}
        validationSchema={RegistrationSchema()}
      >
        {({
          values,
          setFieldValue,
          handleSubmit,
          isValid,
          errors,
        }: FormikValues) => (
          <>
            <View style={styles.formContainer}>
              <Input
                onFocus={() =>
                  setTouched(prevState => ({ ...prevState, email: true }))
                }
                value={values.email}
                onChangeText={value => {
                  setFieldValue('email', value);
                }}
                placeholder={'Email'}
                error={touched.email && errors.email}
              />
              <Input
                onFocus={() =>
                  setTouched(prevState => ({ ...prevState, password: true }))
                }
                value={values.password}
                onChangeText={value => {
                  setFieldValue('password', value);
                }}
                placeholder={'Password'}
                error={touched.password && errors.password}
              />
              <Input
                onFocus={() =>
                  setTouched(prevState => ({
                    ...prevState,
                    confirmPassword: true,
                  }))
                }
                value={values.confirmPassword}
                onChangeText={value => {
                  setFieldValue('confirmPassword', value);
                }}
                placeholder={'Confirm password'}
                error={touched.confirmPassword && errors.confirmPassword}
              />
            </View>
            <DefaultButton
              disabled={
                !isValid ||
                !values.email ||
                !values.password ||
                !values.confirmPassword
              }
              onPress={handleSubmit}
              text={'Зарееструватись'}
            />
          </>
        )}
      </Formik>
    </AuthLayout>
  );
}
