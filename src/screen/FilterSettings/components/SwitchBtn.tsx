import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {fonts} from '../../../constant/fonts';

interface SwitchBtnProps<T extends string | boolean> {
  items: {
    text: string;
    icon?: React.ReactNode;
    id: T;
  }[];
  active: T;
  handleSwitch: (item: {id: T}) => void;
}
export default function SwitchBtn<T extends string | boolean>({
  items,
  active,
  handleSwitch,
}: SwitchBtnProps<T>) {
  return (
    <View style={styles.switcherWrapper}>
      {items.map(e => (
        <TouchableOpacity
          key={String(e.id)}
          onPress={() => handleSwitch(e)}
          style={active === e.id ? styles.activeBtn : styles.nonActiveBtn}>
          {!!e.icon && <View style={styles.iconContainer}>{e.icon}</View>}
          <View style={[styles.textContainer, !!e.icon && styles.textWithIcon]}>
            <Text style={styles.btnText} numberOfLines={1} adjustsFontSizeToFit>
              {e.text}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  switcherWrapper: {
    flexDirection: 'row',
    padding: 5,
    borderRadius: 50,
    backgroundColor: '#EAE9FB',
    height: 50,
    alignItems: 'center',
  },
  activeBtn: {
    flexDirection: 'row',
    flex: 0.5,
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'white',
    height: 40,
    paddingHorizontal: 10,
    gap: 20,
  },
  btnText: {
    fontFamily: fonts.MontserratRegular,
    color: '#0B0B0B',
  },
  nonActiveBtn: {
    gap: 20,
    flex: 0.5,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 50,
  },
  iconContainer: {flex: 0.05},
  textContainer: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  textWithIcon: {flex: 0.8},
});