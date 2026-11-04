import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { CloseIcon, Label } from '../../../assets/icons';

interface HeaderProps {
  isOpenDrawer?: boolean;
  onClose?: () => void;
}

export default function Header({ isOpenDrawer, onClose }: HeaderProps) {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <Label />
      {isOpenDrawer ? (
        <TouchableOpacity
          onPress={onClose}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <CloseIcon />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.burgerBtn}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <View style={styles.line} />
          <View style={styles.line} />
          <View style={styles.line} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 60,
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  burgerBtn: {
    height: 20,
    gap: 5,
    width: 20,
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: 'black',
  },
});
