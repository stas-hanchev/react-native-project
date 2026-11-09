export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_PATTERN = /^\+?\d{10,15}$/;
export const MIN_PASSWORD_LENGTH = 8;

export const isEmailValid = (email: string) => EMAIL_PATTERN.test(email.trim());

export const isPhoneValid = (phone: string) =>
  PHONE_PATTERN.test(phone.replace(/[\s()-]/g, ''));

export const isPasswordValid = (password: string) =>
  password.length >= MIN_PASSWORD_LENGTH;
