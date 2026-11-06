import * as Yup from 'yup';
import type { TFunction } from 'i18next';

export const RegistrationSchema = (t: TFunction) =>
  Yup.object({
    email: Yup.string()
      .email(t('validation.emailInvalid'))
      .required(t('validation.emailRequired')),
    password: Yup.string()
      .matches(new RegExp(/^.{8,100}$/), {
        message: t('validation.passwordLength'),
      })
      .required(t('validation.passwordRequired')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], t('validation.passwordsMismatch'))
      .required(t('validation.confirmPasswordRequired')),
  });
