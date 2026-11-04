import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import Header from "../Header";
import { fonts } from "../../../assets/fonts";

export default function DrawerContent({ navigation }: DrawerContentComponentProps) {
  return (
    <View style={styles.mainWrapper}>
      <Header isOpenDrawer={true} onClose={() => navigation.closeDrawer()} />

      <TouchableOpacity style={styles.btnWrapper}>
        <Text style={styles.text}>Наш сайт</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnWrapper}>
        <Text style={styles.text}>Налаштування мови</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnWrapper}>
        <Text style={styles.text}>Вихід</Text>
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
