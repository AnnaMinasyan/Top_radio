import React, {useState} from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {Form, Item, Input, Button} from 'native-base';
// @ts-ignore
import TextInputMask from 'react-native-text-input-mask';

import {NavigationScreenProp} from 'react-navigation';
import Filter from '../assets/icons/filter-icon.svg';
import Checked from '../assets/icons/checked-radio.svg';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 24,
    paddingLeft: 12,
    paddingRight: 18,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#99aaaa',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 24,
  },
  closeBtn: {
    color: 'transparent',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
  },
  formContainer: {
    paddingTop: 16,
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  inputRow: {
    marginTop: 26,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    marginRight: 6,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  inputWrapper: {
    height: 32,
    borderColor: '#e1e5e9',
    alignItems: 'center',
  },
  inputWrapperSmall: {
    width: 100,
  },
  inputItem: {
    paddingLeft: 12,
    color: '#000',
    fontSize: 15,
    textAlignVertical: 'center',
    paddingTop: 0,
    paddingBottom: 0,
  },
  radioContainer: {
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  circle: {
    marginRight: 12,
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedCircle: {
    width: 19,
    height: 19,
  },
  radioText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  moreBtn: {
    marginTop: 4,
  },
  moreText: {
    color: '#0a7dfb',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  showBtn: {
    justifyContent: 'center',
    marginTop: 36,
    height: 32,
    backgroundColor: '#f1f5f9',
    borderColor: '#e1e5e9',
  },
  showText: {
    fontSize: 15,
    fontWeight: '400',
    letterSpacing: 0.75,
    lineHeight: 19,
  },
});

const FilterDrawerContent: React.FunctionComponent<Props> = (props) => {
  let prices = [
      {key: 'all', text: 'Все'},
      {key: 'free', text: 'Бесплатные'},
      {key: 'paid', text: 'Платные'},
      {key: 'price4', text: 'Цена 4'},
      {key: 'price5', text: 'Цена 5'},
    ],
    categories = [
      {key: 'apartment', text: 'Многоквартирный дом'},
      {key: 'yard', text: 'Дворовая территория МКД'},
      {key: 'roads', text: 'Дороги'},
      {key: 'cat4', text: 'Категория 4'},
      {key: 'cat5', text: 'Категория 5'},
    ];

  const [areAllPrices, showAllPrices] = useState(false);
  const [areAllCategories, showAllCategories] = useState(false);
  const [price, selectPrice] = useState('all');
  const [category, selectCategory] = useState('apartment');

  const originPrices = [...prices];
  prices = !areAllPrices ? prices.slice(0, 3) : originPrices;

  const originCategories = [...categories];
  categories = !areAllCategories ? categories.slice(0, 3) : originCategories;


  return (
    <DrawerContentScrollView {...props}>
      <View>
        <View style={styles.header}>
          <TouchableOpacity>
            <Filter width={22} height={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Фильтр</Text>
          {/* <TouchableOpacity onPress={() => navigation.closeDrawer()}>
            <Text style={styles.closeBtn}>&#10060;</Text>
          </TouchableOpacity> */}
        </View>

        <Form style={styles.formContainer}>
          <Item regular style={styles.inputWrapper}>
            <Input
              style={styles.inputItem}
              placeholder="№ обращения"
              placeholderTextColor="#99aaaa"
            />
          </Item>

          <View style={styles.inputRow}>
            <Text style={styles.label}>Дата с</Text>
            <Item
              regular
              style={[styles.inputWrapper, styles.inputWrapperSmall]}>
              <TextInputMask
                style={styles.inputItem}
                placeholder="__.__.____"
                placeholderTextColor="#99aaaa"
                mask={'[00].[00].[0000]'}
              />
            </Item>

            <Text style={styles.label}>по</Text>
            <Item
              regular
              style={[styles.inputWrapper, styles.inputWrapperSmall]}>
              <TextInputMask
                style={styles.inputItem}
                placeholder="__.__.____"
                placeholderTextColor="#99aaaa"
                mask={'[00].[00].[0000]'}
              />
            </Item>
          </View>

          <View style={styles.radioContainer}>
            {prices.map((item) => {
              return (
                <View key={item.key} style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.circle}
                    onPress={() => selectPrice(item.key)}>
                    {price === item.key && (
                      <Checked style={styles.checkedCircle} />
                    )}
                  </TouchableOpacity>
                  <Text style={styles.radioText}>{item.text}</Text>
                </View>
              );
            })}
            <TouchableOpacity
              style={styles.moreBtn}
              onPress={() => showAllPrices(!areAllPrices)}>
              <Text style={styles.moreText}>
                {areAllPrices ? 'скрыть' : 'ещё'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.radioContainer}>
            {categories.map((item) => {
              return (
                <View key={item.key} style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.circle}
                    onPress={() => selectCategory(item.key)}>
                    {category === item.key && (
                      <Checked style={styles.checkedCircle} />
                    )}
                  </TouchableOpacity>
                  <Text style={styles.radioText}>{item.text}</Text>
                </View>
              );
            })}
            <TouchableOpacity
              style={styles.moreBtn}
              onPress={() => showAllCategories(!areAllCategories)}>
              <Text style={styles.moreText}>
                {areAllCategories ? 'скрыть' : 'ещё'}
              </Text>
            </TouchableOpacity>
          </View>

          <Button bordered style={styles.showBtn}>
            <Text style={styles.showText}>Показать</Text>
          </Button>
        </Form>
      </View>
    </DrawerContentScrollView>
  );
};

export default FilterDrawerContent;
