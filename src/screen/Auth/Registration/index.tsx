import AuthLayout from '../components/AuthLayout/index';
import AuthHeader from '../components/AuthHeader/index';
import styles from '../styles';
import { View } from 'react-native';
import Input from '../../../common/components/Input/index';
import { Formik, FormikHelpers, FormikValues } from 'formik';
import { RegistrationSchema } from '../utils/validation';
import DefaultButton from '../../../common/components/DefaultButton/index';
import { useState } from 'react';

import {
  createUserWithEmailAndPassword,
  getAuth,
} from '@react-native-firebase/auth';
import type { ReactNativeFirebase } from '@react-native-firebase/app';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const [touched, setTouched] = useState<ITouched>({
    email: false,
    password: false,
    confirmPassword: false,
  });

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
        formikHelpers.setFieldError('email', t('validation.emailInUse'));
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
        validationSchema={RegistrationSchema(t)}
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
                placeholder={t('auth.emailPlaceholder')}
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
                placeholder={t('auth.passwordPlaceholder')}
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
                placeholder={t('auth.confirmPasswordPlaceholder')}
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
              text={t('auth.registrationButton')}
            />
          </>
        )}
      </Formik>
    </AuthLayout>
  );
}
