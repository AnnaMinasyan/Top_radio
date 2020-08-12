import React from 'react'

import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
  TouchableWithoutFeedback,

} from 'react-native';
import global_styles from "../assets/styles/global_styles"
import { calcFontSize, calcHeight, calcWidth, deviceWidth } from "../assets/styles/dimensions"
import Header from "../components/Header"
import Search from "../components/Search"
import { IMenuProps } from "../Interface"
import { changeMenuType } from '../store/actions/menuActions'
import { changeBackgroundColor } from "../store/actions/filterAction"
import HeaderByBack from "../components/HeaderByBack"
import PlaySvG from "../assets/icons/play.svg"
import RadioMenuElement from "../components/RadioMenuElement"
import { storeData, getData } from "../utils/local_storage"
import SimpleImage from "../components/SimpleImage"
import { connect } from "react-redux"
import ConnectSvg from "../assets/icons/connect.svg"
import ArrowLeft from "../assets/icons/arrow_right.svg"
import AlarmClockSvg from "../assets/icons/alarmClock.svg"
import DateTimePicker from '@react-native-community/datetimepicker';
import RepeatSvg from "../assets/icons/repeat.svg"
import { Switch } from 'react-native-switch';
import SimpleSwitch from '../components/SimpleSwitch';
import AvtoPlaySvg from "../assets/icons/avtoPlay.svg"
import HeadSetSvg from "../assets/icons/headsets.svg";
import RefleshSvg from "../assets/icons/reflesh.svg"
import CradSvg from "../assets/icons/card.svg"
import PhoneSvg from "../assets/icons/phone.svg"
import Modal from 'react-native-modal'; // 2.4.0
import MoonSvg from "../assets/icons/sleep.svg"
import SunSvg from "../assets/icons/sun.svg"
import ToDo from "../components/toDoList"
import { IData } from "../Interface"

interface IState {
  data: any,
  isEnabled: boolean,
  visibleModal: number | null,
  theme: string
  bufferSize: IData[],
  selectBufferSize:string
}

class Settings extends React.Component<any, IState> {
  constructor(props: any) {

    super(props)
    this.state = {
      data: new Date(1598051730000),
      isEnabled: true,
      visibleModal: null,
      theme: 'Светлая',
      bufferSize: [
        {
          title: '500 ms',
          check: true
        },
        {
          title: '5 sec',
          check: false
        },
        {
          title: '15 sec',
          check: false
        }
      ],
      selectBufferSize:'500 ms'
    }
    // const unsubscribe = props.navigation.addListener('focus', () => {
    //     this.setData()
    //   });

  }
  onRenderModalTheme() {
    return <View style={[styles.modalTheme,]}>
      <TouchableOpacity
        style={[styles.modalThemeBtn, { backgroundColor: '#1E2B4D' }]}
        onPress={() => {
          this.props.onchangeBackgroundColor(this.props.filterReducer.backgroundColor == "white")
          this.setState({
            visibleModal: null,
            theme: 'Тёмная'
          })
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MoonSvg width={calcWidth(20)} height={calcWidth(20)} fill='white' />
          <Text style={[global_styles.stationTexttitle, styles.themeTxt, { color: "white", }]}>Тёмная </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          this.props.onchangeBackgroundColor(this.props.filterReducer.backgroundColor == "white")
          this.setState({
            visibleModal: null,
            theme: 'Светлая'
          })
        }}
        style={[styles.modalThemeBtn, { backgroundColor: 'white' }]}

      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <SunSvg width={calcWidth(22)} height={calcWidth(22)} fill='#B3BACE' />
          <Text style={[global_styles.stationTexttitle, styles.themeTxt, { color: "#1E2B4D", }]}>
            Светлая
        </Text>
        </View>
      </TouchableOpacity>
    </View>
  }
  _changeBufferSize(res: IData) {
    console.log("Pppppppp",res);
    
    let newArr=this.state.bufferSize
    for (let index = 0; index < newArr.length; index++) {
      const element = newArr[index];
      if(element.title==res.title){
        newArr[index].check=true
      }else{
        newArr[index].check=false
      }
      
    }
    console.log(newArr);
    this.setState({
      bufferSize:newArr, 
      visibleModal:null,
      selectBufferSize:res.title
    })
    
  }
  onRenderModalBufferSize() {
    return <View 
    style={styles.bufferSizeModal}>
       <Text style={[global_styles.stationTexttitle, { color:  "#1E2B4D", fontSize:calcFontSize(18) , marginBottom:calcHeight(20)}]}>
                Размер буфера
            </Text>
      {this.state.bufferSize.map((res) => {
        return <View style={{width:calcWidth(300),
        flexDirection:'row' ,  
        justifyContent:'space-between', 
        alignItems:'center',
        height:calcHeight(50)
         }}>
          <Text style={styles.bufferSizeModalText}>{res.title}</Text>
          <ToDo data={res} valueChanged={(f:any)=>this._changeBufferSize(f)} />
        </View>
      })}
    </View>
  }
  onRenderModalSleepTimer(){
return<View style={[styles.modalSleepTimer]}>

</View>
  }

  render() {

    return (

      <View style={[styles.container, { backgroundColor: this.props.filterReducer.backgroundColor }]}>
        <HeaderByBack title='Настройки' onNavigate={() => { this.props.navigation.goBack() }} />
        <View style={[styles.radiostation, { marginTop: calcFontSize(21), backgroundColor: this.props.filterReducer.backgroundColor }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <AvtoPlaySvg height={calcHeight(23)} width={calcHeight(23)} fill='#B3BACE' />
            <View style={{ marginLeft: calcWidth(17) }}>

              <Text style={[global_styles.stationTexttitle, { color: this.props.filterReducer.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>Автовоспроизведение</Text>
            </View>
          </View>
          <View>
            <SimpleSwitch />
          </View>
        </View>
        <View style={[styles.radiostation, { backgroundColor: this.props.filterReducer.backgroundColor }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <HeadSetSvg height={calcHeight(23)} width={calcHeight(23)} fill='#B3BACE' />
            <View style={{ marginLeft: calcWidth(17) }}>

              <Text style={[global_styles.stationTexttitle, { color: this.props.filterReducer.backgroundColor == "white" ? "#1E2B4D" : "white" }]} numberOfLines={2} >Пауза при отключении гарнитуры</Text>
            </View>
          </View>
          <View>
            <SimpleSwitch />
          </View>
        </View>
        <View style={[styles.radiostation, { backgroundColor: this.props.filterReducer.backgroundColor }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <RefleshSvg height={calcHeight(20.4)} width={calcHeight(22)} fill='#B3BACE' />
            <View style={{ marginLeft: calcWidth(17) }}>

              <Text style={[global_styles.stationTexttitle, { color: this.props.filterReducer.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>Переподключаться</Text>
            </View>
          </View>
          <View>
            <SimpleSwitch />
          </View>
        </View>
        <TouchableOpacity

          style={[styles.radiostation, { backgroundColor: this.props.filterReducer.backgroundColor }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <AlarmClockSvg height={calcHeight(26.88)} width={calcHeight(28)} fill='#B3BACE' />
            <View style={{ marginLeft: calcWidth(17) }}>

              <Text style={[global_styles.stationTexttitle, { color: this.props.filterReducer.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>
                Таймер сна
            </Text>
              <Text style={global_styles.stationComment}>20 мин</Text>
            </View>
          </View>
          <ArrowLeft height={calcHeight(12)} width={calcWidth(6.84)} fill='#B3BACE' />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.setState({ visibleModal: 2 })
          }}
          style={[styles.radiostation, { backgroundColor: this.props.filterReducer.backgroundColor }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <CradSvg height={calcHeight(20)} width={calcHeight(20)} fill='#B3BACE' />
            <View style={{ marginLeft: calcWidth(17) }}>

              <Text style={[global_styles.stationTexttitle, { color: this.props.filterReducer.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>
                Размер буфера
            </Text>
        <Text style={global_styles.stationComment}>{this.state.selectBufferSize}</Text>
            </View>
          </View>
          <ArrowLeft height={calcHeight(12)} width={calcWidth(6.84)} fill='#B3BACE' />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.setState({ visibleModal: 1 })
            //  this.props.onchangeBackgroundColor(this.props.filterReducer.backgroundColor=="white")
          }}
          style={[styles.radiostation, { borderBottomWidth: 1, backgroundColor: this.props.filterReducer.backgroundColor }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <PhoneSvg height={calcHeight(24)} width={calcHeight(14.45)} fill='#B3BACE' />
            <View style={{ marginLeft: calcWidth(17) }}>

              <Text style={[global_styles.stationTexttitle, { color: this.props.filterReducer.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>
                Выбрать тему
            </Text>
              <Text style={[global_styles.stationComment]}>{this.state.theme}</Text>
            </View>
          </View>
          <ArrowLeft height={calcHeight(12)} width={calcWidth(6.84)} fill='#B3BACE' />
        </TouchableOpacity>


        <Modal
          isVisible={this.state.visibleModal === 1}
          animationIn={'slideInLeft'}
          animationOut={'slideOutRight'}
          backdropOpacity={0.2}
          onBackdropPress={() => { this.setState({ visibleModal: null }) }}
        >
          {this.onRenderModalTheme()}
        </Modal>
        <Modal
          isVisible={this.state.visibleModal === 2}
          animationIn={'slideInLeft'}
          animationOut={'slideOutRight'}
          backdropOpacity={0.2}
          onBackdropPress={() => { this.setState({ visibleModal: null }) }}
        >
          {this.onRenderModalBufferSize()}
        </Modal> 
        <Modal
          isVisible={this.state.visibleModal === 3}
          animationIn={'slideInLeft'}
          animationOut={'slideOutRight'}
          backdropOpacity={0.2}
          onBackdropPress={() => { this.setState({ visibleModal: null }) }}
        >
          {this.onRenderModalSleepTimer()}
        </Modal>
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
    onchangeBackgroundColor: (payload: any) => {
      dispatch(changeBackgroundColor(payload))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Settings);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  radiostation: {
    height: calcHeight(74),
    // marginTop: calcFontSize(21),
    backgroundColor: 'white',
    borderTopWidth: 1,

    borderColor: '#F3F4F5',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: calcWidth(24),
    paddingRight: calcWidth(26.58)

  },
  modalTheme: {
    height: calcHeight(150),
    width: calcWidth(300),
    backgroundColor: 'white',
    marginLeft: (deviceWidth - 300) / 4,


  },
  modalThemeBtn: {
    height: calcHeight(75),
    justifyContent: 'center',
    paddingLeft: calcWidth(10)
    //alignItems:'center'
  },
  themeTxt: {

    fontSize: calcFontSize(20),
    marginLeft: calcWidth(8)
  },
  bufferSizeModal:{ 
    height: calcHeight(300),
   
     backgroundColor: 'white',
     alignItems:'center' ,
    padding:calcWidth(10),
    justifyContent:'center'
  },
     bufferSizeModalText:{
       fontSize:calcFontSize(20),
   
     },
     modalSleepTimer:{
      backgroundColor:'white',
      height:calcHeight(300),
      width:calcWidth(80)
     }

})
