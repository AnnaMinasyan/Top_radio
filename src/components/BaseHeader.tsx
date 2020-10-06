import React from 'react';
import {
  View, TouchableOpacity, StyleSheet,
  Text
} from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { swipeablePanelActiveSelector, playItem } from "../store/selector/filterSelector"
import { useSelector, useDispatch } from "react-redux"
import Menu from "../assets/icons/menu.svg"
import Filter from '../assets/icons/filter-icon.svg';
import global_styles from "../assets/styles/global_styles"
import { calcFontSize, calcHeight, calcWidth } from "../assets/styles/dimensions"
import { useEffect, useState, } from 'react';

interface Props {
  //filterReducer: any
}

const BaseHeader: React.FunctionComponent<Props> = (props) => {
  const navigation = useNavigation();
  const swipeablePanelActive = useSelector(swipeablePanelActiveSelector)
  const [showMenu, setshowMenu] = useState<boolean>(true)

  useEffect(() => {
    if (swipeablePanelActive== true) {

      setshowMenu(false)
    } else {

      setshowMenu(true)
    }
  }, [swipeablePanelActive])
  return (
    <View>
      {showMenu ?
        <TouchableOpacity
          onPress={() => {

            navigation.dispatch(DrawerActions.toggleDrawer())
          }}
          style={styles.headerContainer}
        >
          <Menu fill='#FFFFFF' height={calcHeight(21)} width={calcWidth(21)} />
        </TouchableOpacity> :null
      }

    </View>

  );
};

export default BaseHeader;
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: calcWidth(15),
    height: calcHeight(56),
    zIndex: 999,
    width: calcWidth(50),


  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0088cc',
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.8,
    color: '#fff',
    marginLeft: 12.70
  },
});