import { StyleSheet, Text, View } from 'react-native';
import DefaultButton from '../../DefaultButton';
import { fonts } from '../../../../constant/fonts';
import { useTranslation } from 'react-i18next';

interface ErrorFallBackProps {
  error: Error;
  resetError: () => void;
}

export default function ErrorFallBack({
  error,
  resetError,
}: ErrorFallBackProps) {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('error.title')}</Text>
        {__DEV__ && (
          <Text style={styles.message}>
            {t('error.message', { message: error.message })}
          </Text>
        )}
        <DefaultButton onPress={resetError} text={t('error.tryAgain')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    flex: 1,
  },
  content: { width: '100%', gap: 20 },
  title: { fontFamily: fonts.ComfortaaRegular, fontSize: 24 },
  message: { fontFamily: fonts.MontserratSemiBold },
});
