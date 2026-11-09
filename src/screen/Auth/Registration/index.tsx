import AuthLayout from '../components/AuthLayout/index';
import AuthHeader from '../components/AuthHeader/index';
import styles from '../styles';
import { Text, View } from 'react-native';
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
import { getAuthErrorKey } from '../utils/authErrors';

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
  const [registrationErrorKey, setRegistrationErrorKey] = useState<
    string | null
  >(null);

  const registrateUser = async (
    email: string,
    password: string,
    formikHelpers: FormikHelpers<IRegistrationValues>,
  ) => {
    setRegistrationErrorKey(null);
    try {
      await createUserWithEmailAndPassword(getAuth(), email.trim(), password);
    } catch (error) {
      if (
        (error as ReactNativeFirebase.NativeFirebaseError).code ===
        'auth/email-already-in-use'
      ) {
        formikHelpers.setFieldError('email', t('validation.emailInUse'));
      } else {
        setRegistrationErrorKey(
          getAuthErrorKey(error, 'validation.registrationFailed'),
        );
      }
    } finally {
      formikHelpers.setSubmitting(false);
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
          isSubmitting,
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
                keyboardType={'email-address'}
                autoCapitalize={'none'}
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
                secureTextEntry={true}
                autoCapitalize={'none'}
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
                secureTextEntry={true}
                autoCapitalize={'none'}
              />
              {!!registrationErrorKey && (
                <Text style={styles.errorText}>{t(registrationErrorKey)}</Text>
              )}
            </View>
            <DefaultButton
              disabled={
                isSubmitting ||
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
