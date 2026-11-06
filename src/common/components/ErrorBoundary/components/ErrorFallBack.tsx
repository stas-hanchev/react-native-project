import { Text, View } from 'react-native';
import DefaultButton from '../../DefaultButton';
import { fonts } from '../../../../constant/fonts';

interface ErrorFallBackProps {
  error: Error;
  resetError: () => void;
}

export default function ErrorFallBack({
  error,
  resetError,
}: ErrorFallBackProps) {
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
          Opsss. Something went wrong
        </Text>
        {__DEV__ && (
          <Text style={{fontFamily: fonts.MontserratSemiBold}}>
            Error message: {error.message}
          </Text>
        )}
        <DefaultButton onPress={resetError} text={'Try again'} />
      </View>
    </View>
  );
}
