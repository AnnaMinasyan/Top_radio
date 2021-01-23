import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  BackHandler
} from 'react-native';
import Menu from "../assets/icons/menu.svg"
import Logo from "../assets/icons/logo.svg"
import MenuDots from "../assets/icons/menu_dots.svg"
import Heart from "../assets/icons/heart.svg"
import Modal from 'react-native-modal';
import global_styles from "../assets/styles/global_styles"
import { connect } from "react-redux"
import { changeFavoriteType ,changeSearchData} from '../store/actions/filterAction'
import { DrawerActions } from '@react-navigation/native';
import { NavigationScreenProp } from 'react-navigation';
import RedHeart from "../assets/icons/redHeart.svg"
import SearchSvg from "../assets/icons/search.svg"
import Search from "./Search"
import CloseSvg from "../assets/icons/close.svg"
import Arrow from "../assets/icons/arrow_back.svg"
import { changeActiveArrow, clearReducer } from '../store/actions/bottomAction'
import player from "../services/player/PlayerServices"
interface Props {
  onchangeFavoriteType(): void;
  navigation: NavigationScreenProp<any, any>;
  filterReducer: any,
  onchnageSearchData(type: any): void;
  theme: any
  type: boolean,
  menuReducer: any,
  title?: string,
  onchangeActiveArrow(type: boolean): void;
  onclearReducer(): void;
}
interface IState {
  hideMenuModal: boolean,
  menuStyle: boolean,
  showSearchView: boolean,

}
class Header extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hideMenuModal: false,
      menuStyle: true,
      showSearchView: false
    }

  }

  hideMenuModal() {
    return <Modal
      style={{ position: 'absolute', top: (30), right: (8), }}
      onBackdropPress={() => { this.setState({ hideMenuModal: false }) }}
      onRequestClose={() => this.setState({ hideMenuModal: false })}

      isVisible={this.state.hideMenuModal}>
      <View style={[styles.modal, { backgroundColor: this.props.theme.backgroundColor, }]}>
        <TouchableOpacity
          style={[styles.modalView, { marginTop: (6), borderColor: this.props.theme.backgroundColor == "white" ? '#F3F4F5' : "#1E2B4D" }]}
          onPress={() => {
            this.setState({ hideMenuModal: false })
            player.close()
            this.props.navigation.navigate("MyAlarmClock")
          }}
        >
          <Text style={[styles.modalItem, { color: this.props.theme.backgroundColor == 'white' ? '#1E2B4D' : "white" }]}>Установить будильник</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modalView, { borderColor: this.props.theme.backgroundColor == "white" ? '#F3F4F5' : "#1E2B4D" }]}
          onPress={() => {
            player.close()
            Linking.openURL('http://top-radio.ru/dobavit-radio?fbclid=IwAR2LH7GH0qQTcByNabxFiGh9yNuktf48R2dAlyYGz15_i7QegNoXYYFPnRk')
          }}
        >
          <Text style={[styles.modalItem, { color: this.props.theme.backgroundColor == 'white' ? '#1E2B4D' : "white" }]}>Предложить радиостанцию</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modalView, { borderColor: this.props.theme.backgroundColor == "white" ? '#F3F4F5' : "#1E2B4D" }]}
          onPress={() => {
            this.setState({ hideMenuModal: false })
            player.close()
            Linking.openURL("market://details?id=ru.topradio");
          }}
        >
          <Text style={[styles.modalItem, { color: this.props.theme.backgroundColor == 'white' ? '#1E2B4D' : "white" }]}>Оставить отзыв</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modalView, { borderColor: this.props.theme.backgroundColor == "white" ? '#F3F4F5' : "#1E2B4D" }]}
          onPress={() => {
            this.setState({ hideMenuModal: false })
            player.close()
            this.props.navigation.navigate('Settings')
          }}
        >
          <Text style={[styles.modalItem, { color: this.props.theme.backgroundColor == 'white' ? '#1E2B4D' : "white" }]}>Настройки</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modalView, { borderBottomWidth: 0, borderColor: this.props.theme.backgroundColor == "white" ? '#F3F4F5' : "#1E2B4D" }]}
          onPress={() => {
            player.close()
            player.init(null)
            this.props.onclearReducer()
            BackHandler.exitApp()
          }}
        >
          <Text style={[styles.modalItem, { color: this.props.theme.backgroundColor == 'white' ? '#1E2B4D' : "white" }]}>Выход</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  }
  chnageMenuType() {
    this.setState({ menuStyle: !this.state.menuStyle })

  }
  changeIsFavorite() {
    if (this.props.filterReducer.isFavorite) {
      this.props.onchangeActiveArrow(true)

      this.props.navigation.navigate("Menu")
    } else {
      player.close()
      this.props.onchangeActiveArrow(false)
      this.props.navigation.navigate("Favorite")
    }
    this.props.onchangeFavoriteType()

  }
  renderTitle() {

    return <View>
      {this.props.type || this.props.title ? <View>
        <Text numberOfLines={1} style={[styles.title, { marginLeft: this.props.title ? (20) : 0 }]}>{this.props.title ? this.props.title : this.props.menuReducer.headertext}</Text>
      </View> : <Logo height={(21)} width={(113)} style={{ marginLeft: (13), }} />}
    </View>
  }
  render() {

    return (

      <View style={styles.header}>
        <View style={[styles.row,]}>
          {this.props.type ? <View>
            <TouchableOpacity
              style={[global_styles.searchbtn, { paddingHorizontal: (0), paddingRight: (11) }]}
              onPress={() => {
                this.props.navigation.goBack()
              }}
            >
              <Arrow height={(23.49)} width={(23.49)} />
            </TouchableOpacity>
          </View> :

            <TouchableOpacity
              onPress={() => {
                if (this.props.filterReducer.isFavorite) { this.props.onchangeFavoriteType() }

                this.props.navigation.dispatch(DrawerActions.toggleDrawer())
              }}
              style={styles.headerContainer}
            >
              <Menu fill='#FFFFFF' height={(21)} width={(21)} />
            </TouchableOpacity>}
          {!this.state.showSearchView ?
            this.renderTitle()
            :
            <View style={{
              width: 195,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: (20),
            }}>
              <Search
                value={this.props.filterReducer.searchData}
                renderSearchData={this.props.onchnageSearchData}
              />
            </View>}
        </View>
        <View style={[styles.row,]}>
          <TouchableOpacity
            style={global_styles.searchbtn}
            onPress={() => {
              player.close(),
                this.setState({ showSearchView: !this.state.showSearchView })
            }}
          >
            {!this.state.showSearchView ? <SearchSvg width={(14.48)} height={(15)} /> :
              <TouchableOpacity
                onPress={() => {
              
                  this.props.onchnageSearchData('')
                  // this.setState({showSearchView:false})
                }}
              >
                <CloseSvg width={(15.48)} height={(15)} fill='#B3BACE' />
              </TouchableOpacity>}
          </TouchableOpacity>
          <TouchableOpacity
            style={global_styles.searchbtn}
            onPress={() => {
              this.changeIsFavorite()

            }}
          >
            {this.props.filterReducer.isFavorite ? <RedHeart fill='#FF5050' height={(19)} width={(21)} /> : <Heart fill='#FFFFFF' height={(21)} width={(23.61)} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={global_styles.searchbtn}
            onPress={() => {
              this.setState({ hideMenuModal: true })
            }}
          >
            <MenuDots height={(6.88)} width={(26.33)} />
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
    onchangeFavoriteType: () => {
      dispatch(changeFavoriteType())
    },
    onchangeActiveArrow: (payload: boolean) => {
      dispatch(changeActiveArrow(payload))
    },
    onclearReducer: () => {
      dispatch(clearReducer())
    },
    onchnageSearchData:(payload:string) => {
      dispatch(changeSearchData(payload))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0F1E45',
    height: 56,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 13.83
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,


  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  modal: {
    height: 269.03,
    width: 265,
    borderRadius: 8,
  },


  modalView: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderColor: '#F3F4F5',
    paddingHorizontal: 29
  },
  modalItem: {
    fontSize: 15,
    fontWeight: '500',
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginLeft: 5,
    fontWeight: '500',
    width: 120
  }
});