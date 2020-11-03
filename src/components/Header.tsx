import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  
  Linking,

} from 'react-native';
import Menu from "../assets/icons/menu.svg"
import Logo from "../assets/icons/logo.svg"
import Menu2 from "../assets/icons/menu_2.svg"
import MenuDots from "../assets/icons/menu_dots.svg"
import Heart from "../assets/icons/heart.svg"
import Modal from 'react-native-modal';
import global_styles from "../assets/styles/global_styles"
import { calcFontSize, calcHeight, calcWidth } from "../assets/styles/dimensions"
import { connect } from "react-redux"
import { changeFavoriteType } from '../store/actions/filterAction'
import { DrawerActions } from '@react-navigation/native';
import { NavigationScreenProp } from 'react-navigation';
import RedHeart from "../assets/icons/redHeart.svg"
import SearchSvg from "../assets/icons/search.svg"
import Search from "./Search"
import CloseSvg from "../assets/icons/close.svg"
import Arrow from "../assets/icons/arrow_back.svg"

interface Props {
  onchangeFavoriteType(): void;
  navigation: NavigationScreenProp<any, any>;
  filterReducer: any,
  onchnageSearchData(type: any): void;
  theme:any
  type:boolean,
  menuReducer:any,
  title?:string
}
interface IState {
  hideMenuModal: boolean,
  menuStyle: boolean,
  showSearchView:boolean,
  
}
class Header extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hideMenuModal: false,
      menuStyle: true,
      showSearchView:false
    }

  }
 
  hideMenuModal() {
    return <Modal
      style={{ position: 'absolute', top: calcHeight(30), right: calcWidth(8),  }}
      onBackdropPress={() => { this.setState({ hideMenuModal: false }) }}
      onRequestClose={() => this.setState({ hideMenuModal: false })}

      isVisible={this.state.hideMenuModal}>
      <View style={[styles.modal,{backgroundColor:this.props.theme.backgroundColor,}]}>
        <TouchableOpacity
          style={[styles.modalView, { marginTop: calcHeight(6),  borderColor: this.props.theme.backgroundColor=="white"?'#F3F4F5':"#1E2B4D" }]}
          onPress={() => {
            this.setState({ hideMenuModal: false })
           this.props.navigation.navigate("MyAlarmClock")
          }}
        >
          <Text style={[styles.modalItem,{color:this.props.theme.backgroundColor=='white'?'#1E2B4D':"white"}]}>Установить будильник</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modalView,{  borderColor: this.props.theme.backgroundColor=="white"?'#F3F4F5':"#1E2B4D"}]}
          onPress={() => {
            Linking.openURL('http://top-radio.ru/dobavit-radio?fbclid=IwAR2LH7GH0qQTcByNabxFiGh9yNuktf48R2dAlyYGz15_i7QegNoXYYFPnRk')
          }}
        >
          <Text style={[styles.modalItem,{color:this.props.theme.backgroundColor=='white'?'#1E2B4D':"white"}]}>Предложить радиостанцию</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modalView,{  borderColor: this.props.theme.backgroundColor=="white"?'#F3F4F5':"#1E2B4D"}]}
          onPress={() => {
            this.setState({ hideMenuModal: false })
            Linking.openURL("market://details?id=ru.topradio");
          }}
        >
          <Text style={[styles.modalItem,{color:this.props.theme.backgroundColor=='white'?'#1E2B4D':"white"}]}>Оставить отзыв</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modalView,{  borderColor: this.props.theme.backgroundColor=="white"?'#F3F4F5':"#1E2B4D"}]}
          onPress={() => {
            this.setState({ hideMenuModal: false })
            this.props.navigation.navigate('Settings')
          }}
        >
          <Text style={[styles.modalItem,{color:this.props.theme.backgroundColor=='white'?'#1E2B4D':"white"}]}>Настройки</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modalView, { borderBottomWidth: 0 ,borderColor: this.props.theme.backgroundColor=="white"?'#F3F4F5':"#1E2B4D"}]}
          onPress={() => {
          BackHandler.exitApp()
          }}
        >
          <Text style={[styles.modalItem,{color:this.props.theme.backgroundColor=='white'?'#1E2B4D':"white"}]}>Выход</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  }
  chnageMenuType() {
    this.setState({ menuStyle: !this.state.menuStyle })

  }
  changeIsFavorite() {
    if(this.props.filterReducer.isFavorite){
      this.props.navigation.navigate("Menu")
    }else{
      this.props.navigation.navigate("Favorite")
    }
    this.props.onchangeFavoriteType()
  
  }
  renderTitle(){
    
    return<View>
      {this.props.type || this.props.title?<View>
        <Text numberOfLines={1} style={[styles.title,{marginLeft:this.props.title?calcWidth(20):0}]}>{this.props.title?this.props.title:this.props.menuReducer.headertext}</Text>
        </View>: <Logo height={calcHeight(21)} width={calcHeight(113)} style={{ marginLeft: calcWidth(13), }} />}
    </View>
  }
  render() {

    return (

      <View style={styles.header}>
        <View style={[styles.row,]}>
          {this.props.type?<View>
            <TouchableOpacity
                    style={[global_styles.searchbtn,{paddingHorizontal:calcWidth(0),paddingRight:calcWidth(11)  }]}
                    onPress={()=>{
                        this.props.navigation.goBack()
                    }}
                    >
                    <Arrow height={calcHeight(23.49)} width={calcWidth(23.49)} />
                    </TouchableOpacity>
          </View>:
           
        <TouchableOpacity
          onPress={() => {
            if(this.props.filterReducer.isFavorite){this.props.onchangeFavoriteType()}

            this.props.navigation.dispatch(DrawerActions.toggleDrawer())
          }}
          style={styles.headerContainer}
        >
          <Menu fill='#FFFFFF' height={calcHeight(21)} width={calcWidth(21)} />
        </TouchableOpacity> }
       {!this.state.showSearchView?
      this.renderTitle()
      :
       <View style={{
       width:calcWidth(240),
       justifyContent:'center',
       alignItems:'center',
        marginLeft:calcWidth(20),}}>
         <Search 
       renderSearchData={this.props.onchnageSearchData}
       />
         </View>}   
        </View>
        <View style={[styles.row,]}>
          <TouchableOpacity
            style={global_styles.searchbtn}
              onPress={()=>{
                this.setState({showSearchView:!this.state.showSearchView})
              //  this.props.onchnageSearchData('')
              }}
          >
         {!this.state.showSearchView? <SearchSvg width={calcWidth(14.48)} height={calcHeight(15)} />:
        <TouchableOpacity
       // onPress={()=>this.props.onchnageSearchData('')}
        >
        <CloseSvg width={calcWidth(15.48)} height={calcHeight(15)} fill='#B3BACE'/>
        </TouchableOpacity>}
          </TouchableOpacity>
          <TouchableOpacity
             style={global_styles.searchbtn}
            onPress={() => {
              this.changeIsFavorite()

            }}
           // style={{ height: calcHeight(56), justifyContent: 'center', alignItems: 'center' }}
          >
          {this.props.filterReducer.isFavorite?<RedHeart fill='#FF5050' height={calcHeight(19)} width={calcWidth(21)}/>: <Heart fill='#FFFFFF' height={calcHeight(21)} width={calcWidth(23.61)} />} 
          </TouchableOpacity>

          {/* {this.state.menuStyle ?
            <TouchableOpacity
            
            style={global_styles.searchbtn}
              onPress={() => { this.chnageMenuType() }}
            >
              <Menu2 height={calcHeight(21)} width={calcHeight(21)}  />
            </TouchableOpacity>

            :
            <TouchableOpacity
            style={global_styles.searchbtn}
              onPress={() => { this.chnageMenuType() }}
            >
              <MenuSvg height={calcHeight(21)} width={calcHeight(21)} style={{ marginLeft: calcWidth(22), marginRight: calcWidth(19) }} />
            </TouchableOpacity>} */}
          <TouchableOpacity
             style={global_styles.searchbtn}
            onPress={() => {
              this.setState({ hideMenuModal: true })
            }}
           // style={{ height: calcHeight(56), justifyContent: 'center', alignItems: 'center' }}
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
    paddingLeft: calcWidth(20),
    paddingRight: calcWidth(13.83)
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: calcHeight(56),


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
  },
  title:{
    color:'white',
    fontSize:calcFontSize(20),
    marginLeft:calcWidth(5),
    fontWeight:'500',
    width:calcWidth(120)
}
});