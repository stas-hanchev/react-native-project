import { Text, View } from 'react-native';
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
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        flex: 1,
      }}>
      <View style={{width: '100%', gap: 20}}>
        <Text style={{fontFamily: fonts.ComfortaaRegular, fontSize: 24}}>
          {t('error.title')}
        </Text>
        {__DEV__ && (
          <Text style={{fontFamily: fonts.MontserratSemiBold}}>
            {t('error.message', { message: error.message })}
          </Text>
        )}
        <DefaultButton onPress={resetError} text={t('error.tryAgain')} />
      </View>
    </View>
  );
}
