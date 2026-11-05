import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import { Pet } from '../Home';
import {
  ArrowIcon,
  CloseIcon,
  DogImage,
  HeartIcon,
  LongArrowIcon,
  PlaceIcon,
} from '../../assets/icons';
import { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LoggedInStackType } from '../../navigation/types';
import { fonts } from '../../constant/fonts';
import DefaultButton from '../../common/components/DefaultButton';
import Input from '../../common/components/Input';

interface IFormInfo {
  name: string;
  phone: string;
  email: string;
  comment: string;
}
export default function PetPage() {
  const route = useRoute<RouteProp<{ params: { pet: Pet } }>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<LoggedInStackType>>();

  const [sliderIndex, setSliderIndex] = useState<number>(0);
  const [formInfo, setFormInfo] = useState<IFormInfo>({
    name: '',
    phone: '',
    email: '',
    comment: '',
  });
  const [modalStep, setModalStep] = useState<'form' | 'success' | null>(null);
  const closeModal = () => setModalStep(null);
  const handleNext = () => {
    if (sliderIndex + 1 < route?.params?.pet?.images.length) {
      setSliderIndex(prevState => prevState + 1);
    } else {
      setSliderIndex(0);
    }
  };
  const handlePrev = () => {
    if (sliderIndex - 1 >= 0) {
      setSliderIndex(prevState => prevState - 1);
    } else {
      setSliderIndex(route?.params?.pet?.images.length);
    }
  };
  const handleEditForm = (key: string, value: string) => {
    setFormInfo(prevState => ({ ...prevState, [key]: value }));
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        <View style={styles.imgBackground}>
          <Image
            source={{ uri: route?.params?.pet?.images[sliderIndex] }}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />
          <View style={styles.mainContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={styles.backBtn}
              hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
            >
              <ArrowIcon height={20} width={20} color={'white'} />
            </TouchableOpacity>
            <View style={styles.sliderWrapper}>
              <TouchableOpacity
                style={styles.sliderBtnLeft}
                onPress={handlePrev}
              >
                <LongArrowIcon />
              </TouchableOpacity>
              <View style={styles.dotWrapper}>
                {route?.params?.pet?.images.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.activeDot,
                      index !== sliderIndex && { opacity: 0.5 },
                    ]}
                  />
                ))}
              </View>
              <TouchableOpacity
                style={styles.sliderBtnRight}
                onPress={handleNext}
              >
                <LongArrowIcon />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ margin: 10, gap: 10 }}>
          <View style={styles.titleContainer}>
            <View>
              <Text style={styles.titleText}>{route?.params?.pet?.name}</Text>
              <View style={styles.iconContainer}>
                <PlaceIcon />
                <Text style={styles.locationText}>
                  {route?.params?.pet.location}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.heartContainer}>
              <HeartIcon />
            </TouchableOpacity>
          </View>
          <View style={{ gap: 10, marginHorizontal: 10 }}>
            <Text style={[styles.titleText, { fontSize: 18 }]}>
              Характеристики:
            </Text>
            <View style={styles.characterContainer}>
              <View style={styles.characterWrapper}>
                <Text style={styles.characterText}>
                  {route?.params?.pet.age} років
                </Text>
              </View>
              <View style={styles.characterWrapper}>
                <Text style={styles.characterText}>
                  {route?.params?.pet.color}
                </Text>
              </View>
              <View style={styles.characterWrapper}>
                <Text style={styles.characterText}>
                  {route?.params?.pet.type}
                </Text>
              </View>
              <View style={styles.characterWrapper}>
                <Text style={styles.characterText}>
                  {route?.params?.pet.sex}
                </Text>
              </View>
              <View style={styles.characterWrapper}>
                <Text style={styles.characterText}>
                  {route?.params?.pet.isVaccinated
                    ? 'Вакцінований'
                    : 'Не вакцинований'}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ margin: 10, gap: 10 }}>
            <Text style={[styles.titleText, { fontSize: 18 }]}>
              Моя історія:
            </Text>
            <View>
              <Text style={styles.characterText}>
                {route?.params?.pet.description}
              </Text>
            </View>
          </View>
          <DefaultButton
            onPress={() => setModalStep('form')}
            text={"Подарувати сім'ю"}
          />
        </View>
      </View>
      <Modal
        visible={modalStep !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <KeyboardAvoidingView style={styles.modalWrapper} behavior="padding">
          <Pressable style={styles.modalBackdrop} onPress={closeModal} />
          {modalStep === 'form' && (
            <View style={styles.modalContainer}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ gap: 10 }}>
                  <Text
                    style={{ fontFamily: fonts.ComfortaaRegular, fontSize: 24 }}
                  >
                    Забрати хвостика додому
                  </Text>
                  <Text style={{ fontFamily: fonts.MontserratRegular }}>
                    Залиш свої дані і ми з тобою зв’яжемося
                  </Text>
                </View>
                <TouchableOpacity onPress={closeModal}>
                  <CloseIcon />
                </TouchableOpacity>
              </View>
              <View>
                <Text>Ім'я</Text>
                <Input
                  value={formInfo.name}
                  placeholder={"Введи своє ім'я"}
                  onChangeText={text => {
                    handleEditForm('name', text);
                  }}
                />
              </View>
              <View>
                <Text>Телефон</Text>
                <Input
                  value={formInfo.phone}
                  placeholder={'+380'}
                  onChangeText={text => {
                    handleEditForm('phone', text);
                  }}
                />
              </View>
              <View>
                <Text>Email</Text>
                <Input
                  value={formInfo.email}
                  placeholder={'Введи свою пошту'}
                  onChangeText={text => {
                    handleEditForm('email', text);
                  }}
                />
              </View>
              <View>
                <Text>Коментар</Text>
                <Input
                  placeholder={'Залиш коментар'}
                  value={formInfo.comment}
                  onChangeText={text => {
                    handleEditForm('comment', text);
                  }}
                  multiline={true}
                  numberOfLines={3}
                  additionalContainerStyle={{
                    height: 100,
                    alignItems: 'flex-start',
                  }}
                />
              </View>
              <DefaultButton
                disabled={!formInfo.email || !formInfo.phone || !formInfo.name}
                onPress={() => setModalStep('success')}
                text={'Забрати хвостика додому'}
              />
            </View>
          )}
          {modalStep === 'success' && (
            <View style={[styles.modalContainer, { height: 300 }]}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={DogImage}
                  style={{ width: 80, height: 80, flex: 1 }}
                  resizeMode={'contain'}
                />
                <TouchableOpacity onPress={closeModal}>
                  <CloseIcon />
                </TouchableOpacity>
              </View>
              <View style={{ gap: 10, alignItems: 'center' }}>
                <Text
                  style={{ fontFamily: fonts.ComfortaaRegular, fontSize: 24 }}
                >
                  Дякуємо за заявку!
                </Text>
                <Text style={{ fontFamily: fonts.MontserratRegular }}>
                  Вітаємо! Ти на крок ближче до того щоб завести собі пухнастого
                  друга. Ми скоро зв’яжемося з тобою.
                </Text>
              </View>
              <DefaultButton onPress={closeModal} text={'Окей'} />
            </View>
          )}
        </KeyboardAvoidingView>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imgBackground: { width: '100%', height: 400 },
  mainContainer: {
    padding: 10,
    justifyContent: 'space-between',
    height: '100%',
  },
  backBtn: {
    transform: [{ rotate: '180deg' }],
    alignSelf: 'flex-start',
  },
  sliderWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sliderBtnLeft: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 10,
    transform: [{ rotate: '180deg' }],
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  dotWrapper: { flexDirection: 'row', gap: 3 },
  sliderBtnRight: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    alignItems: 'center',
  },
  titleText: { fontFamily: fonts.ComfortaaRegular, fontSize: 24 },
  iconContainer: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  locationText: {
    fontFamily: fonts.MontserratRegular,
    fontSize: 16,
    color: '#838383',
  },
  heartContainer: {
    alignSelf: 'flex-start',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EAE9FB',
  },
  characterWrapper: {
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#EAE9FB',
  },
  characterText: { fontFamily: fonts.MontserratRegular, color: 'black' },
  characterContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '100%',
    height: 600,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    gap: 20,
  },
});
