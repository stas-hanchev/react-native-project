import { useCallback, useRef } from 'react';
import { ActivityIndicator, BackHandler, StyleSheet, View } from 'react-native';
import WebView, { WebViewNavigation } from 'react-native-webview';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import SettingsHeader from '../../common/components/SettingsHeader';

const WEBSITE_URL = 'https://github.com/stas-hanchev?tab=repositories';

const renderLoading = () => <ActivityIndicator style={styles.loader} />;

export default function WebPage() {
  const { t } = useTranslation();
  const goBackRef = useRef<(() => void) | null>(null);
  const canGoBackRef = useRef(false);

  const handleNavigationStateChange = (state: WebViewNavigation): void => {
    canGoBackRef.current = state.canGoBack;
  };

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          if (canGoBackRef.current) {
            goBackRef.current?.();
            return true;
          }
          return false;
        },
      );

      return () => subscription.remove();
    }, []),
  );

  return (
    <View style={styles.container}>
      <SettingsHeader title={t('drawer.website')} />
      <WebView
        ref={instance => {
          goBackRef.current = instance ? () => instance.goBack() : null;
        }}
        source={{ uri: WEBSITE_URL }}
        style={styles.container}
        startInLoadingState={true}
        renderLoading={renderLoading}
        onNavigationStateChange={handleNavigationStateChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loader: { ...StyleSheet.absoluteFill },
});
