import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import Menu from "../assets/icons/menu.svg"
import Logo from "../assets/icons/logo.svg"
import Menu2 from "../assets/icons/menu_2.svg"
import MenuDots from "../assets/icons/menu_dots.svg"
import Heart from "../assets/icons/heart.svg"
import Modal from 'react-native-modal';
import MenuSvg from "../assets/icons/menu_cob.svg"
import global_styles from "../assets/styles/global_styles"
import { calcFontSize, calcHeight, calcWidth } from "../assets/styles/dimensions"
import { connect } from "react-redux"
import { changeMenuType } from '../store/actions/menuActions'
import { changeFavoriteType } from '../store/actions/filterAction'
import { DrawerActions } from 'react-navigation';
import { NavigationScreenProp } from 'react-navigation';
import RedHeart from "../assets/icons/redHeart.svg"
interface Props {

  onChangeMenuType(type: boolean): void;
  onchangeFavoriteType(): void;
  navigation: NavigationScreenProp<any, any>;
  filterReducer: any,

}
interface IState {
  hideMenuModal: boolean,
  menuStyle: boolean,
}
class Header extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hideMenuModal: false,
      menuStyle: true,
    }

  }

  hideMenuModal() {
    return <Modal
      style={{ position: 'absolute', top: calcHeight(30), right: calcWidth(8), backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
      onBackdropPress={() => { this.setState({ hideMenuModal: false }) }}
      isVisible={this.state.hideMenuModal}>
      <View style={[styles.modal,{backgroundColor:this.props.filterReducer.backgroundColor}]}>
        <TouchableOpacity
          style={[styles.modalView, { marginTop: calcHeight(6) }]}
          onPress={() => {
            this.setState({ hideMenuModal: false })
           this.props.navigation.navigate("MyAlarmClock")
          }}
        >
          <Text style={[styles.modalItem,{color:this.props.filterReducer.backgroundColor=='white'?'#1E2B4D':"white"}]}>Установить будильник</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.modalView}
          onPress={() => {
            this.setState({ hideMenuModal: false })
          }}
        >
          <Text style={[styles.modalItem,{color:this.props.filterReducer.backgroundColor=='white'?'#1E2B4D':"white"}]}>Предложить радиостанцию</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.modalView}
          onPress={() => {
            this.setState({ hideMenuModal: false })
          }}
        >
          <Text style={[styles.modalItem,{color:this.props.filterReducer.backgroundColor=='white'?'#1E2B4D':"white"}]}>Оставить отзыв</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.modalView}
          onPress={() => {
            this.setState({ hideMenuModal: false })
            this.props.navigation.navigate('Settings')
          }}
        >
          <Text style={[styles.modalItem,{color:this.props.filterReducer.backgroundColor=='white'?'#1E2B4D':"white"}]}>Настройки</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modalView, { borderBottomWidth: 0 }]}
          onPress={() => {
            this.setState({ hideMenuModal: false })
          }}
        >
          <Text style={[styles.modalItem,{color:this.props.filterReducer.backgroundColor=='white'?'#1E2B4D':"white"}]}>Выход</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  }
  chnageMenuType() {
    this.setState({ menuStyle: !this.state.menuStyle })
    this.props.onChangeMenuType(!this.state.menuStyle)
  }
  changeIsFavorite() {
    console.log("iiiiiiiiii",this.props.filterReducer.isFavorite);
    
    this.props.onchangeFavoriteType()
  }

  render() {

    return (

      <View style={styles.header}>
        <View style={[styles.row,]}>
          <TouchableOpacity
            onPress={() => {
              console.log(this.props.navigation);
              

            }}
          >
            {/* <Menu fill='#FFFFFF'   height={calcHeight(21)} width={calcWidth(24)}  /> */}
          </TouchableOpacity>
          <Logo height={calcHeight(21)} width={calcHeight(113)} style={{ marginLeft: calcWidth(40) }} />

        </View>
        <View style={[styles.row, { width: '30%' }]}>
          <TouchableOpacity
            onPress={() => {
              this.changeIsFavorite()
            }}
            style={{ height: calcHeight(56), justifyContent: 'center', alignItems: 'center' }}
          >
          {this.props.filterReducer.isFavorite?<RedHeart fill='#FF5050' height={calcHeight(19)} width={calcWidth(21)}/>: <Heart fill='#FFFFFF' height={calcHeight(21)} width={calcWidth(23.61)} />} 
          </TouchableOpacity>

          {this.state.menuStyle ?
            <TouchableOpacity
              onPress={() => { this.chnageMenuType() }}
            >
              <Menu2 height={calcHeight(21)} width={calcHeight(21)} style={{ marginLeft: calcWidth(22), marginRight: calcWidth(19) }} />
            </TouchableOpacity>

            :
            <TouchableOpacity
              onPress={() => { this.chnageMenuType() }}
            >
              <MenuSvg height={calcHeight(21)} width={calcHeight(21)} style={{ marginLeft: calcWidth(22), marginRight: calcWidth(19) }} />
            </TouchableOpacity>}
          <TouchableOpacity
            onPress={() => {
              this.setState({ hideMenuModal: true })
            }}
            style={{ height: calcHeight(56), justifyContent: 'center', alignItems: 'center' }}
          >
            <MenuDots height={calcHeight(6.88)} width={calcWidth(26.33)} />
          </TouchableOpacity>
        </View>

        {this.state.hideMenuModal ? this.hideMenuModal() : null}

      </View>
    );
  }
};
const mapStateToProps = (state: any) => {
  return state
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    onChangeMenuType: (payload: any) => {
      dispatch(changeMenuType(payload))
    },
    onchangeFavoriteType: () => {
      dispatch(changeFavoriteType())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0F1E45',
    height: calcHeight(56),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: calcWidth(13),
    paddingRight: calcWidth(22.73)
  },
  row: {
    flexDirection: 'row',

    alignItems: 'center',

  },
  modal: {
   

    height: calcHeight(269.03),
    width: calcWidth(265),
    borderRadius: calcWidth(8),


  },
  modalView: {
    height: calcHeight(50),
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderColor: '#F3F4F5',
    paddingHorizontal: 29
  },
  modalItem: {
    fontSize: 15,
    fontWeight: '500',
  }
});