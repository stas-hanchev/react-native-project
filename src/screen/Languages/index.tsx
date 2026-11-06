import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import SettingsHeader from '../../common/components/SettingsHeader';
import { CheckIcon, ENIcon, PLIcon, UKIcon } from '../../assets/icons';
import { fonts } from '../../constant/fonts';
import { selectLanguage } from '../../localization';

const languages = [
  { code: 'pl', icon: <PLIcon /> },
  { code: 'uk', icon: <UKIcon /> },
  { code: 'en', icon: <ENIcon /> },
];

export default function Languages() {
  const { t, i18n } = useTranslation();

  return (
    <View>
      <SettingsHeader title={t('drawer.language')} />
      <View style={styles.list}>
        {languages.map(({ code, icon }) => {
          const isSelected = i18n.language === code;

          return (
            <TouchableOpacity
              key={code}
              style={[styles.item, isSelected && styles.selectedItem]}
              onPress={() => selectLanguage(code)}
            >
              <View style={styles.iconWrapper}>
                {icon}
                <Text style={styles.text}>{t(`languages.${code}`)}</Text>
              </View>
              {isSelected && <CheckIcon />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list: { margin: 10, gap: 10 },
  item: {
    borderRadius: 50,
    borderColor: '#838383',
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 28,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedItem: { backgroundColor: '#EAE9FB' },
  iconWrapper: { alignItems: 'center', flexDirection: 'row', gap: 20 },
  text: { fontFamily: fonts.MontserratRegular, color: 'black' },
});
