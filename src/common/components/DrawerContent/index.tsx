import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import Header from "../Header";
import { fonts } from "../../../assets/fonts";
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LoggedInStackType } from "../../../navigation/types";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../../../constant/screenNames";

export default function DrawerContent({ navigation }: DrawerContentComponentProps) {
  const loggedInNavigation = useNavigation<NativeStackNavigationProp<LoggedInStackType>>();
  const navigateToLanguages = () => {
    loggedInNavigation.navigate(ScreenNames.LANGUAGES_PAGE);
  };

  const { t } = useTranslation();
  
  return (
    <View style={styles.mainWrapper}>
      <Header isOpenDrawer={true} onClose={() => navigation.closeDrawer()} />

      <TouchableOpacity style={styles.btnWrapper}>
        <Text style={styles.text}>{t('drawer.website')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnWrapper} onPress={navigateToLanguages}>
        <Text style={styles.text}>{t('drawer.language')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnWrapper}>
        <Text style={styles.text}>{t('drawer.logout')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {marginHorizontal: 10, gap: 16},
  btnWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: fonts.ComfortaaRegular,
    fontSize: 16,
    color: 'black',
  },
});
