import { ActivityIndicator, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';

export default () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://github.com/stas-hanchev?tab=repositories' }}
        style={styles.container}
        startInLoadingState={true}
        renderLoading={() => <ActivityIndicator style={styles.loader} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  loader: { ...StyleSheet.absoluteFill },
});
