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
import { getMenuType } from '../store/actions/filterAction'
import { changeBackgroundColor } from "../store/actions/themeAction"
import HeaderByBack from "../components/HeaderByBack"
import PlaySvG from "../assets/icons/play.svg"
import RadioMenuElement from "../components/RadioMenuElement"
import { storeData, getData } from "../utils/local_storage"
import SimpleImage from "../components/SimpleImage"
import { connect } from "react-redux"
import ConnectSvg from "../assets/icons/connect.svg"
import ArrowLeft from "../assets/icons/arrow_right.svg"
import MyAlarmClockSvg from "../assets/icons/alarmClock.svg"
import Menu2 from "../assets/icons/menu_2.svg"
import MenuSvg from "../assets/icons/menu_cob.svg"
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
import SmoothPicker from 'react-native-smooth-picker';
import {ISettings} from "../Interface"
interface IState {
  data: any,
  isEnabled: boolean,
  visibleModal: number | null,
  theme: string
  bufferSize: IData[],
  selectBufferSize: string,
  timeSleep:number,
  timeSleepList:string[]
}
 interface ITimeSleepList{
   time:number,
   select:boolean
 }

class Settings extends React.Component<ISettings, IState> {
  constructor(props: ISettings) {

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
      timeSleepList:[
       '00','10','20','30','40','50','60','70','80','90','100'
     
    ],
      timeSleep:10,
      selectBufferSize: '500 ms'
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
          this.props.onchangeBackgroundColor(true)
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
          this.props.onchangeBackgroundColor(false)
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
  onchangingMenuTypes() {
    return <View style={[styles.modalTheme,]}>
      <TouchableOpacity
        style={[styles.modalThemeBtn, { backgroundColor: this.props.theme.backgroundColor }]}
        onPress={() => {
          this.props.onChangeMenuType(0)
          this.setState({
            visibleModal: null,})
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}> 
        <Menu2 height={calcHeight(21)} width={calcHeight(21)}  fill='#B3BACE' />
     
          <Text style={[global_styles.stationTexttitle, styles.themeTxt, { color: "#1E2B4D", }]}>Сетка  </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => { 
           this.props.onChangeMenuType(1)
          this.setState({
            visibleModal: null,
          })
        }}
        style={[styles.modalThemeBtn, {backgroundColor: this.props.theme.backgroundColor }]}

      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <MenuSvg height={calcHeight(21)} width={calcHeight(21)} fill='#B3BACE'/>

          <Text style={[global_styles.stationTexttitle, styles.themeTxt, { color: "#1E2B4D", }]}>
           Список
        </Text>
        </View>
      </TouchableOpacity>
    </View>
  }
  _changeBufferSize(res: IData) {
    let newArr = this.state.bufferSize
    for (let index = 0; index < newArr.length; index++) {
      const element = newArr[index];
      if (element.title == res.title) {
        newArr[index].check = true
      } else {
        newArr[index].check = false
      }
    }
    this.setState({
      bufferSize: newArr,
      visibleModal: null,
      selectBufferSize: res.title
    })
  }
 
  onRenderModalBufferSize() {
    return <View
      style={styles.bufferSizeModal}>
      <Text style={[global_styles.stationTexttitle, { color: "#1E2B4D", fontSize: calcFontSize(18), marginBottom: calcHeight(20) }]}>
        Размер буфера
            </Text>
      {this.state.bufferSize.map((res:any) => {
        return <View style={{
          width: calcWidth(300),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: calcHeight(50)
        }}>
          <Text style={styles.bufferSizeModalText}>{res.title}</Text>
          <ToDo data={res} valueChanged={(f: any) => this._changeBufferSize(f)} />
        </View>
      })}
    </View>
  }
  onRenderModalSleepTimer() {
    return <View style={[styles.modalSleepTimer]}>
      <View style={styles.sleepTimerTop}>
        <View style={{justifyContent:'space-between', alignItems:'center', flexDirection:'row'}}>
          <MoonSvg height={calcHeight(23)} width={calcHeight(23)} fill='#B3BACE' />
          <View style={{ marginLeft: calcWidth(17) }}>
            <Text
              style={[global_styles.stationTexttitle,
              { color: this.props.theme.backgroundColor == "white" ? "#1E2B4D" : "white",
              width:calcWidth(80),}]}> Таймер сна </Text>
          </View>
        </View>
        <View>
          <SimpleSwitch />
        </View>
      </View>
      <View style={{justifyContent:'center',flexDirection: 'row',  alignItems:'center', }}>
          <View style={{justifyContent:'center',alignItems:'center', }} >
            <SmoothPicker
              magnet
              scrollAnimation
              selectOnPress
              initialScrollToIndex={this.state.timeSleep}
              showsVerticalScrollIndicator={false}
              data={this.state.timeSleepList}
              style={{ height: calcHeight(350), marginLeft:calcWidth(35)}}
             onSelected={({ item, index }) => this.changeTimeSleep(item)}
              renderItem={({ item, index }) => (
                <Text style={{ fontSize: calcFontSize(37), color: this.state.timeSleep == item ? 'red' : '#B3BACE' }} >
                  {item}</Text>)}/>
          </View>
          <Text 
          style={[styles.timeText,{marginRight:calcWidth(41),
          color:this.props.theme.backgroundColor=="white"?"#1E2B4D":"white"}]}>мин.</Text>
        </View>
        <TouchableOpacity
        style={{borderRadius:8,
           borderWidth:calcHeight(1.5),
           borderColor:'#B3BACE',
          marginTop:calcHeight(5),
        height:calcHeight(50),
      justifyContent:'center',
    alignItems:'center'}}
        >
          <Text style={{color:'black'}}>Подтвердить число </Text>
        </TouchableOpacity>
    </View>
  }
  changeTimeSleep = (index: number) => {
    this.setState({
      timeSleep: index
    });
  };
  render() {

    return (
      <View style={[styles.container, { backgroundColor: this.props.theme.backgroundColor }]}>
        <HeaderByBack title='Настройки' onNavigate={() => { this.props.navigation.goBack() }} />
        <View style={[styles.radiostation, { marginTop: calcFontSize(21), backgroundColor: this.props.theme.backgroundColor }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <AvtoPlaySvg height={calcHeight(23)} width={calcHeight(23)} fill='#B3BACE' />
            <View style={{ marginLeft: calcWidth(17) }}>
              <Text style={[global_styles.stationTexttitle, { color: this.props.theme.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>Автовоспроизведение</Text>
            </View>
          </View>
          <View>
            <SimpleSwitch />
          </View>
        </View>
        <View style={[styles.radiostation, { backgroundColor: this.props.theme.backgroundColor }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <HeadSetSvg height={calcHeight(23)} width={calcHeight(23)} fill='#B3BACE' />
            <View style={{ marginLeft: calcWidth(17) }}>
              <Text style={[global_styles.stationTexttitle, { color: this.props.theme.backgroundColor == "white" ? "#1E2B4D" : "white" }]} numberOfLines={2} >Пауза при отключении гарнитуры</Text>
            </View>
          </View>
          <View>
            <SimpleSwitch />
          </View>
        </View>
        <View style={[styles.radiostation, { backgroundColor: this.props.theme.backgroundColor }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <RefleshSvg height={calcHeight(20.4)} width={calcHeight(22)} fill='#B3BACE' />
            <View style={{ marginLeft: calcWidth(17) }}>
              <Text style={[global_styles.stationTexttitle, { color: this.props.theme.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>Переподключаться</Text>
            </View>
          </View>
          <View>
            <SimpleSwitch />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.setState({ visibleModal: 3,timeSleep:0 })
          }}
          style={[styles.radiostation, { backgroundColor: this.props.theme.backgroundColor }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <MyAlarmClockSvg height={calcHeight(26.88)} width={calcHeight(28)} fill='#B3BACE' />
            <View style={{ marginLeft: calcWidth(17) }}>

              <Text style={[global_styles.stationTexttitle, { color: this.props.theme.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>
                Таймер сна
            </Text>
              <Text style={global_styles.stationComment}>{this.state.timeSleep} мин</Text>
            </View>
          </View>
          <ArrowLeft height={calcHeight(12)} width={calcWidth(6.84)} fill='#B3BACE' />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.setState({ visibleModal: 2 })
          }}
          style={[styles.radiostation, { backgroundColor: this.props.theme.backgroundColor }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <CradSvg height={calcHeight(20)} width={calcHeight(20)} fill='#B3BACE' />
            <View style={{ marginLeft: calcWidth(17) }}>

              <Text style={[global_styles.stationTexttitle, { color: this.props.theme.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>
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
            //  this.props.onchangeBackgroundColor(this.props.theme.backgroundColor=="white")
          }}
          style={[styles.radiostation, {  backgroundColor: this.props.theme.backgroundColor }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <PhoneSvg height={calcHeight(24)} width={calcHeight(14.45)} fill='#B3BACE' />
            <View style={{ marginLeft: calcWidth(17) }}>

              <Text style={[global_styles.stationTexttitle, { color: this.props.theme.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>
                Выбрать тему
            </Text>
              <Text style={[global_styles.stationComment]}>{this.state.theme}</Text>
            </View>
          </View>
          <ArrowLeft height={calcHeight(12)} width={calcWidth(6.84)} fill='#B3BACE' />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.setState({ visibleModal: 4 })
          }}
          style={[styles.radiostation, { borderBottomWidth: 1, backgroundColor: this.props.theme.backgroundColor }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
           <View >
           {this.props.filterReducer.menuType==1?
           <MenuSvg height={calcHeight(21)} width={calcHeight(21)} fill='#B3BACE'/>:
            <Menu2 height={calcHeight(21)} width={calcHeight(21)}  fill='#B3BACE' />
          }
           </View>
            <View style={{ marginLeft: calcWidth(17) }}>

              <Text style={[global_styles.stationTexttitle, { color: this.props.theme.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>
              Тип отображения: {this.props.filterReducer.menuType==1?"cписок":"cетка"}
            </Text>
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
        <Modal
          isVisible={this.state.visibleModal === 4}
          animationIn={'slideInLeft'}
          animationOut={'slideOutRight'}
          backdropOpacity={0.2}
          onBackdropPress={() => { this.setState({ visibleModal: null }) }}
        >
          {this.onchangingMenuTypes()}
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
    onChangeMenuType: (payload: number) => {
      dispatch(getMenuType(payload))
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
  bufferSizeModal: {
    borderRadius:5,

    height: calcHeight(300),

    backgroundColor: 'white',
    alignItems: 'center',
    padding: calcWidth(10),
    justifyContent: 'center'
  },
  bufferSizeModalText: {
    fontSize: calcFontSize(20),

  },
  modalSleepTimer: {
    backgroundColor: 'white',
    marginHorizontal:calcWidth(65),
    padding:calcHeight(15),
    borderRadius:5
  // width: calcWidth(100)
  },
  sleepTimerTop:{
     alignItems: 'center',
      justifyContent: 'center',
       flexDirection: 'row',
       paddingVertical:calcHeight(20),
       borderColor:"#B3BACE",
       borderBottomWidth:1
      },
      timeText:{
        color:'#1E2B4D',
        fontWeight:'bold',
        marginBottom:calcHeight(6),
        fontSize:calcFontSize(17), 
                marginTop:calcHeight(25),
                 marginLeft:calcWidth(6)
      }

})
