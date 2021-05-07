import React from 'react'

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  BackHandler
} from 'react-native';
import global_styles from "../assets/styles/global_styles"
import { calcFontSize, calcHeight, calcWidth, deviceWidth } from "../assets/styles/dimensions"
import { getMenuType } from '../store/actions/filterAction'
import { changeBackgroundColor } from "../store/actions/themeAction"
import HeaderByBack from "../components/HeaderByBack"
import { storeData, getData } from "../utils/local_storage"
import { connect } from "react-redux"
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
import Modal from 'react-native-modal'; // 2.4.0S
import MoonSvg from "../assets/icons/sleep.svg"
import SunSvg from "../assets/icons/sun.svg"
import ToDo from "../components/toDoList"
import { IData } from "../Interface"
import { ISettings } from "../Interface"
import { changeSelectedRadioStationPlaying } from "../store/actions/bottomAction"
import {
  changeAutoPlay,
  changeBufferSize,
  changeIsOnheadsets,
  changeReconnenct
} from "../store/actions/settingsAcrion"
import player from "../services/player/PlayerServices"
import DatePicker from "react-native-date-picker";
import { initTimerSleep } from "../utils/timer_sleep"
interface IState {
  data: any,
  isEnabled: boolean,
  visibleModal: number | null,
  theme: string
  bufferSize: IData[],
  timeSleep: any,
  timeSleepList: number[],
  autoPlay: boolean,
  ontimerSleep: boolean,
  activeIndex: number,
  carouselItems: any,
  timerSlipeTime: any
}
const wheelPickerData = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday"
];
class Settings extends React.Component<ISettings, IState> {
  carousel: any
  timeSleep: any
  timerSlipeTime: any = {

    hours: "",
    minute: ''

  }
  constructor(props: ISettings) {

    super(props)
    this.state = {
      data: new Date(1598051730000),
      isEnabled: true,
      visibleModal: null,

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
      timeSleepList: [
        0, 2, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100

      ],
      // timeSleep: null,
      autoPlay: false,
      ontimerSleep: true,
      activeIndex: 0,



    }
  }

  componentDidMount() {

  }

  onPress = () => {
    this.setState({ activeIndex: 3 });
  };
  onRenderModalTheme() {
    return <View style={[styles.modalTheme,]}>
      <TouchableHighlight
        underlayColor={'rgba(30, 41, 69,5)'}
        style={[styles.modalThemeBtn, { backgroundColor: '#1E2B4D' }]}
        onPress={() => {
          this.props.onchangeBackgroundColor(true)
          storeData('theme', true)
          this.setState({
            visibleModal: null,

          })
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MoonSvg width={calcWidth(20)} height={calcWidth(20)} fill='white' />
          <Text style={[global_styles.stationTexttitle, styles.themeTxt, { color: "white", }]}>Тёмная </Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor={'rgba(235, 235, 237,5)'}
        onPress={() => {
          this.props.onchangeBackgroundColor(false)
          storeData('theme', false)

          this.setState({
            visibleModal: null,

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
      </TouchableHighlight>
    </View>
  }
  onchangingMenuTypes() {
    return <View style={[styles.modalTheme,]}>
      <TouchableHighlight
        underlayColor={this.props.theme.backgroundColor == "white" ? 'rgba(235, 235, 237,5)' : 'rgba(30, 41, 69,5)'}
        style={[styles.modalThemeBtn, {
          backgroundColor: this.props.theme.backgroundColor,
          borderBottomWidth: 1,
          borderColor: this.props.theme.backgroundColor == "white" ? '#F3F4F5' : "#1E2B4D"
        }]}
        onPress={() => {
          this.props.onChangeMenuType(0)
          this.setState({
            visibleModal: null,
          })
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Menu2 height={calcHeight(21)} width={calcHeight(21)} fill='#B3BACE' />

          <Text style={[global_styles.stationTexttitle, styles.themeTxt, { color: this.props.theme.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>Сетка  </Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight

        underlayColor={this.props.theme.backgroundColor == "white" ? 'rgba(235, 235, 237,5)' : 'rgba(30, 41, 69,5)'}
        onPress={() => {
          this.props.onChangeMenuType(1)
          this.setState({
            visibleModal: null,
          })
        }}
        style={[styles.modalThemeBtn, { backgroundColor: this.props.theme.backgroundColor }]}

      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MenuSvg height={calcHeight(21)} width={calcHeight(21)} fill='#B3BACE' />

          <Text style={[global_styles.stationTexttitle, styles.themeTxt, { color: this.props.theme.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>
            Список
        </Text>
        </View>
      </TouchableHighlight>
    </View>
  }
  _changeBufferSize(res: IData) {
    this.props.onchangeBufferSize(res.title)
    this.setState({
      visibleModal: null,
    })
  }

  onRenderModalBufferSize() {
    return <View
      style={styles.bufferSizeModal}>
      <Text style={[global_styles.stationTexttitle, { color: "#1E2B4D", fontSize: calcFontSize(18), marginBottom: calcHeight(20) }]}>
        Размер буфера
            </Text>
      {this.props.settingsReducer.bufferSize.map((res: any, index: number) => {
        return <View
          key={index}
          style={{
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
  _renderItem({ item, index }) {
    return (
      <View style={{
        backgroundColor: 'white',
        borderRadius: 5,
        height: 80,
      }}>
        <Text style={{ fontSize: 37, color: '#B3BACE' }}>{item.text}</Text>
      </View>

    )
  }

  onRenderModalSleepTimer() {
    // console.log("PPPPPPPPP",this.carousel)
    return <View style={[styles.modalSleepTimer]}>
      <View style={styles.sleepTimerTop}>
        <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
          <MoonSvg height={calcHeight(23)} width={calcHeight(23)} fill='#B3BACE' />
          <View style={{ marginLeft: calcWidth(17) }}>
            <Text
              style={[global_styles.stationTexttitle,
              {
                color: this.props.theme.backgroundColor == "white" ? "#1E2B4D" : "white",
                width: calcWidth(80),
              }]}> Таймер сна </Text>
          </View>
        </View>
        <View>
          <SimpleSwitch
            theme={this.props.theme}
            isEnabled={this.state.ontimerSleep}
            onValueChange={() => {
              // this.createTimerSleep()
            }} />
        </View>
      </View>
      <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', height: 200 }} >
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <DatePicker
              mode="time"
              textColor={'black'}
              // dividerHeight={0}
              //date={this.timeSleep}
              date={this.timeSleep ? this.timeSleep : new Date(Date.now())}
              onDateChange={(data) => {
                const alarm = {
                  hours: data.getHours(),
                  minute: data.getMinutes()
                }
                this.timeSleep = `${data.getHours()}:${data.getMinutes()}`
                this.timerSlipeTime = alarm
              }}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{
          borderRadius: 8,
          borderWidth: calcHeight(1.5),
          borderColor: '#B3BACE',
          marginTop: calcHeight(5),
          height: calcHeight(50),
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={() => {
          initTimerSleep(this.timerSleep, this.timerSlipeTime)
          storeData("timerSleepTime", this.timerSlipeTime)
          this.setState({ visibleModal: null })
        }}
      >
        <Text style={{ color: 'black' }}>Подтвердить</Text>
      </TouchableOpacity>
    </View>
  }
  timerSleep = () => {
    player.stopPlayer()
    this.props.onchangeSelectedRadioStationPlaying(false)

    // BackHandler.exitApp()
  }
  changeTimeSleep = (index: number) => {
    this.timeSleep = index
    if (this.state.ontimerSleep) {
      let time = new Date(Date.now() + this.timeSleep * 60000)
      storeData("timerSleep", time)
    }
  };
  createTimerSleep() {
    if (!this.state.ontimerSleep) {
      let time = new Date(Date.now() + this.timeSleep * 60000)

    }

    this.setState({ ontimerSleep: !this.state.ontimerSleep })
  }
  changeAutoPlay() {
    this.props.onchangeAutoPlay(!this.props.settingsReducer.autoPlay)
    storeData("autoPlay", !this.props.settingsReducer.autoPlay)
  }
  render() {

    return (
      <View style={[styles.container, { backgroundColor: this.props.theme.backgroundColor }]}>
        <HeaderByBack title='Настройки' onNavigate={() => { this.props.navigation.goBack() }} />
        <View style={[styles.radiostation,
        {
          marginTop: calcFontSize(21), backgroundColor: this.props.theme.backgroundColor,
          borderColor: this.props.theme.backgroundColor == "white" ? '#F3F4F5' : "#1E2B4D"
        }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <View style={{ width: calcWidth(38) }}>

              <AvtoPlaySvg height={calcHeight(23)} width={calcHeight(23)} fill='#B3BACE' />
            </View>
            <View >
              <Text style={[global_styles.stationTexttitle,
              { color: this.props.theme.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>Автовоспроизведение</Text>
            </View>
          </View>
          <View>
            <SimpleSwitch
              theme={this.props.theme}
              isEnabled={this.props.settingsReducer.autoPlay}
              onValueChange={() => {
                this.changeAutoPlay()
              }} />
          </View>
        </View>
        <View style={[styles.radiostation,
        {
          backgroundColor: this.props.theme.backgroundColor,
          borderColor: this.props.theme.backgroundColor == "white" ? '#F3F4F5' : "#1E2B4D"
        }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <View style={{ width: calcWidth(38) }}>

              <HeadSetSvg height={calcHeight(23)} width={calcHeight(23)} fill='#B3BACE' />
            </View>
            <View>
              <Text style={[global_styles.stationTexttitle, { color: this.props.theme.backgroundColor == "white" ? "#1E2B4D" : "white" }]} numberOfLines={2} >Пауза при отключении гарнитуры</Text>
            </View>
          </View>
          <View>
            <SimpleSwitch
              theme={this.props.theme}
              isEnabled={this.props.settingsReducer.isOnheadsets}
              onValueChange={() => {
                this.props.onchangeIsOnheadsets(!this.props.settingsReducer.isOnheadsets)
              }} />
          </View>
        </View>
        <View style={[styles.radiostation,
        {
          backgroundColor: this.props.theme.backgroundColor,
          borderColor: this.props.theme.backgroundColor == "white" ? '#F3F4F5' : "#1E2B4D"
        }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <View style={{ width: calcWidth(38) }}>
              <RefleshSvg height={calcHeight(20.4)} width={calcHeight(22)} fill='#B3BACE' />
            </View>
            <View >
              <Text style={[global_styles.stationTexttitle, { color: this.props.theme.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>Переподключаться</Text>
            </View>
          </View>
          <View>
            <SimpleSwitch
              theme={this.props.theme}

              isEnabled={this.props.settingsReducer.reconnect}
              onValueChange={() => {
                if(this.props.settingsReducer.reconnect){
                  storeData('activeRadioStation',null)
                }
                storeData('reconnect',!this.props.settingsReducer.reconnect)
                this.props.onchangeReconnenct(!this.props.settingsReducer.reconnect)
              }} />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.timeSleep = 0
            this.setState({ visibleModal: 3, timeSleep: 0 })
          }}
          style={[styles.radiostation,
          {
            backgroundColor: this.props.theme.backgroundColor,
            borderColor: this.props.theme.backgroundColor == "white" ? '#F3F4F5' : "#1E2B4D"
          }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <View style={{ width: calcWidth(38) }}>
              <MyAlarmClockSvg height={calcHeight(26.88)} width={calcHeight(28)} fill='#B3BACE' />
            </View>
            <View>

              <Text style={[global_styles.stationTexttitle, { color: this.props.theme.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>Таймер сна
            </Text>
              <Text style={global_styles.stationComment}>{this.timeSleep}</Text>
            </View>
          </View>
          <ArrowLeft height={calcHeight(12)} width={calcWidth(6.84)} fill='#B3BACE' />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.setState({ visibleModal: 2 })
          }}
          style={[styles.radiostation,
          {
            backgroundColor: this.props.theme.backgroundColor,
            borderColor: this.props.theme.backgroundColor == "white" ? '#F3F4F5' : "#1E2B4D"
          }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <View style={{ width: calcWidth(38) }}>
              <CradSvg height={calcHeight(20)} width={calcHeight(20)} fill='#B3BACE' />
            </View>
            <View >

              <Text style={[global_styles.stationTexttitle, { color: this.props.theme.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>
                Размер буфера
            </Text>
              <Text style={global_styles.stationComment}>{this.props.settingsReducer.bufferSize.filter((item: IData) => item.check == true)[0].title}</Text>
            </View>
          </View>
          <ArrowLeft height={calcHeight(12)} width={calcWidth(6.84)} fill='#B3BACE' />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.setState({ visibleModal: 1 })

            //  this.props.onchangeBackgroundColor(this.props.theme.backgroundColor=="white")
          }}
          style={[styles.radiostation,
          {
            backgroundColor: this.props.theme.backgroundColor,
            borderColor: this.props.theme.backgroundColor == "white" ? '#F3F4F5' : "#1E2B4D"
          }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <View style={{ width: calcWidth(38) }}>

              <PhoneSvg height={calcHeight(24)} width={calcHeight(14.45)} fill='#B3BACE' />
            </View>
            <View >

              <Text style={[global_styles.stationTexttitle, { color: this.props.theme.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>
                Выбрать тему
            </Text>
              <Text style={[global_styles.stationComment]}>{this.props.theme.backgroundColor == 'white' ? 'Светлая' : 'Тёмная'}</Text>
            </View>
          </View>
          <ArrowLeft height={calcHeight(12)} width={calcWidth(6.84)} fill='#B3BACE' />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.setState({ visibleModal: 4 })
          }}
          style={[styles.radiostation,
          {
            borderBottomWidth: 1, backgroundColor: this.props.theme.backgroundColor,
            borderColor: this.props.theme.backgroundColor == "white" ? '#F3F4F5' : "#1E2B4D"
          }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <View style={{ width: calcWidth(38) }}>
              {this.props.filterReducer.menuType == 1 ?
                <MenuSvg height={calcHeight(21)} width={calcHeight(21)} fill='#B3BACE' /> :
                <Menu2 height={calcHeight(21)} width={calcHeight(21)} fill='#B3BACE' />
              }
            </View>
            <View >

              <Text style={[global_styles.stationTexttitle, { color: this.props.theme.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>
                Тип отображения: {this.props.filterReducer.menuType == 1 ? "cписок" : "cетка"}
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
    onchangeBufferSize: (payload: string) => {
      dispatch(changeBufferSize(payload))
    },
    onchangeBackgroundColor: (payload: any) => {
      dispatch(changeBackgroundColor(payload))
    },
    onchangeAutoPlay: (payload: boolean) => {
      dispatch(changeAutoPlay(payload))
    },
    onchangeIsOnheadsets: (payload: boolean) => {
      dispatch(changeIsOnheadsets(payload))
    },
    onchangeSelectedRadioStationPlaying: (payload: boolean) => {
      dispatch(changeSelectedRadioStationPlaying(payload))
    },
    onchangeReconnenct: (payload: boolean) => {
      dispatch(changeReconnenct(payload))
    },
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
    backgroundColor: 'white',
    borderTopWidth: 1,
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

    fontSize: calcFontSize(15),
    marginLeft: calcWidth(8)
  },
  bufferSizeModal: {
    borderRadius: 5,

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
    // marginHorizontal: calcWidth(5),
    padding: calcHeight(15),
    borderRadius: 5
    // width: calcWidth(100)
  },
  sleepTimerTop: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: calcHeight(20),
    borderColor: "#B3BACE",
    borderBottomWidth: 1
  },
  timeText: {
    color: '#1E2B4D',
    fontWeight: 'bold',
    marginBottom: calcHeight(6),
    fontSize: calcFontSize(17),
    marginTop: calcHeight(25),
    marginLeft: calcWidth(6)
  }

})
