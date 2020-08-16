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
  FlatList
} from 'react-native';
import global_styles from "../assets/styles/global_styles"
import { calcFontSize, calcHeight, calcWidth } from "../assets/styles/dimensions"
import Header from "../components/Header"
import Search from "../components/Search"
import { IMenuProps } from "../Interface"
import { changeMenuType } from '../store/actions/menuActions'
import HeaderByBack from "../components/HeaderByBack"
import PlaySvG from "../assets/icons/play.svg"
import RadioMenuElement from "../components/RadioMenuElement"
import { storeData, getData, _addInFavorite } from "../utils/local_storage"
import SimpleImage from "../components/SimpleImage"
import { connect } from "react-redux"
import ConnectSvg from "../assets/icons/connect.svg"
import ArrowLeft from "../assets/icons/arrow_right.svg"
import MyAlarmClockSvg from "../assets/icons/alarmClock.svg"
import DateTimePicker from '@react-native-community/datetimepicker';
import RepeatSvg from "../assets/icons/repeat.svg"
import { Switch } from 'react-native-switch';
import SimpleSwitch from '../components/SimpleSwitch';
import DatePicker from 'react-native-date-picker'
import SmoothPicker from 'react-native-smooth-picker';
import moment from 'moment';
import AntennaSvg from "../assets/icons/antena.svg"
import Modal from 'react-native-modal'; // 2.4.0
import { changeswipeablePanelActive, changeplayItem } from '../store/actions/filterAction'
import AlarmClock from "react-native-alarm-clock";
import PushNotification from "react-native-push-notification"
import ReactNativeAN from 'react-native-alarm-notification';
interface IState {
  date: any,
  isEnabled: boolean,
  hours: any,
  selectedHours: number,
  selectedMinut: number,
  selectedTimeSleepList: number,
  minutes: any,
  minutes2: any,
  timeSleepList: any,
  visibleModal: number | null,
  favoriteList: any,
  playItem: any,

}

class MyAlarmClock extends React.Component<IMenuProps, IState> {
  constructor(props: IMenuProps) {
    super(props)
    //this.initStorData(),
    // PushNotification.configure({
    //   onRegister: function (token) {
    //     console.log("TOKEN:", token);
    //   },
    //   onNotification: function (notification) {
    //     console.log("NOTIFICATION:", notification);
    //   },
    //   permissions: {
    //     alert: true,
    //     badge: true,
    //     sound: true,
    //   },
    //   popInitialNotification: true,
    //   requestPermissions: true,
    // });

    this.state = {
      hours: [
        '00',
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12',
        '13', '14', '15', '16', '17',
        '18', '19', '20', '21', '22', '23',
      ],
      minutes: [
        '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17',
        '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37',
      ],
      minutes2: [
        '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17',
        '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37',
      ],
      date: new Date(),
      isEnabled: true,
      selectedHours: 0,
      selectedMinut: 0,
      visibleModal: null,
      timeSleepList: [
        '00', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60', '65', '70', '75', '80', '85', '90', '95', '100', '105',
        '110', '115', '120', '125', '130', '135', '140', '145', '150', '155', '160', '165', '170', '180', '185', '190', '195', '200', '205',
        '210', '215', '220', '225', '230', '235', '240', '245', '250', '255', '260', '265', '270', '275', '280', '285', '290', '300', '310', '320', '330'
      ],
      selectedTimeSleepList: 0,
      favoriteList: [],
      playItem: [],

    }
    // const unsubscribe = props.navigation.addListener('focus', () => {
    //     this.setData()
    //   });

  }
  testPush() {
    PushNotification.localNotification({
      title: "My Notification Title", // (optional)
      message: "My Notification Message", // (required)
      color: 'red',

      playSound: true,
      //soundName:'android.resource:'+this.props.menuReducer.menuData[0].st[0].ur
    });
  }
  componentDidMount() {
    console.log(moment().format('LT').split(':'));
    // this.testPush()
    // PushNotification.localNotificationSchedule({

    //   //... You can use all the options from localNotifications
    //   message: "My Notification Message", // (required)
    //   date: new Date(Date.now() + 10 * 1000), // in 60 secs

    // //  allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
    // });
    const details = {

      data: { content: 'my notification id is 45' },
    };
    console.log(details);
    ReactNativeAN.sendNotification(details);
  }
  handleChangeHours = (index: number) => {
    this.setState({
      selectedHours: index
    });
  };
  handleChangeMinut = (index: number) => {
    this.setState({
      selectedMinut: index
    });
  };
  handleChangeTimeSleepList = (index: number) => {
    this.setState({
      selectedTimeSleepList: index
    });
  };
  renderMenuItems(data: any) {

    return <TouchableOpacity
      onPress={() => {
        this.props.onchangeplayItem(data.item)
        this.setState({
          visibleModal: null,
          playItem: data.item,
        })
      }}
      style={{ width: '100%' }}
    >
      <RadioMenuElement title={data.item.pa} image={data.item.im}
        backColor={this.props.filterReducer.backgroundColor}
        addInFavorite={() => this._changeInFavorite(data.item)}
        isFavorite={this.state.favoriteList ? this.checkIsFovorite(data.item.id) : false} />
    </TouchableOpacity>
  }
  checkIsFovorite(id: number) {
    // if( this.state.favoriteList){
    for (let index = 0; index < this.state.favoriteList.length; index++) {
      const element = this.state.favoriteList[index];
      if (element.id == id) {
        // console.log(element.id);

        return true

      }
    }
    return false
  }
  _changeInFavorite(data: any) {
    _addInFavorite(data.item).then(() => {
      getData('favorites').then((favorite) => {
        this.setState({ favoriteList: favorite })
      })

    })
  }
  onRenderModalMenuRadio() {
    return <View style={[styles.modalMenuRadio, {}]}>
      <View style={{ width: '100%' }}><Search /></View>
      <View style={{ height: calcHeight(500) }}>
        <FlatList
          style={{ marginBottom: 10, }}
          data={this.props.menuReducer.menuData}
          renderItem={(d) => this.renderMenuItems(d)}
          keyExtractor={item => item.id}
          maxToRenderPerBatch={10}
        />
      </View>
    </View>
  }
  onRenderModalSleepTimer() {
    return <View style={styles.modalTimer}>
      <View style={styles.modalSleepTimer
      }>
        <View style={{}}>
          <SmoothPicker
            magnet
            scrollAnimation
            selectOnPress
            showsVerticalScrollIndicator={false}
            offsetSelection={-20}
            data={this.state.timeSleepList}
            style={{ height: calcHeight(240), marginTop: calcHeight(10) }}
            onSelected={({ item, index }) => this.handleChangeTimeSleepList(item)}
            renderItem={({ item, index }) => (
              <Text style={{ fontSize: calcFontSize(37), color: this.state.selectedTimeSleepList == item ? 'red' : '#B3BACE' }} >{item}</Text>
            )}
          />
        </View>
        <Text
          style={[styles.timeText, { color: this.props.filterReducer.backgroundColor == "white" ? "#1E2B4D" : "white", }]}>
          мин.
          </Text>
      </View>
      <TouchableOpacity
        style={styles.btn}
      >
        <Text style={{ color: 'black' }}>Подтвердить число </Text>
      </TouchableOpacity>
    </View>

  }
  render() {

    return (
      <View style={[styles.container, { backgroundColor: this.props.filterReducer.backgroundColor }]}>
        <HeaderByBack title='Будильник' onNavigate={() => { this.props.navigation.goBack() }} />
        <View style={[styles.radiostation, { backgroundColor: this.props.filterReducer.backgroundColor, marginTop: calcFontSize(21), borderTopWidth: 1, }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <RepeatSvg height={calcHeight(21)} width={calcHeight(21)} fill='#B3BACE' />
            <View style={{ marginLeft: calcWidth(17) }}>
              <Text
                style={[global_styles.stationTexttitle, { color: this.props.filterReducer.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>
                Включить будельник
                </Text>
            </View>
          </View>
          <View>
            <SimpleSwitch />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.setState({ visibleModal: 2 })
          }}
          style={[styles.radiostation, {
            backgroundColor: this.props.filterReducer.backgroundColor,
            borderTopWidth: 1,
          }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <ConnectSvg height={calcHeight(20)} width={calcHeight(20)} fill='#B3BACE' />
            <View style={{ marginLeft: calcWidth(17) }}>
              <Text style={[global_styles.stationTexttitle, { color: this.props.filterReducer.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>
                Радиостанция
            </Text>
              <Text style={global_styles.stationComment}>{this.props.filterReducer.playItem.pa}</Text>
            </View>
          </View>
          <ArrowLeft height={calcHeight(12)} width={calcWidth(6.84)} fill='#B3BACE' />
        </TouchableOpacity>
        <View style={{ justifyContent: 'center', alignItems: "center", }}>
          <Text style={[styles.timeText, { color: this.props.filterReducer.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>Время</Text>
        </View>
        <View style={styles.timer}>
          <View >
            <SmoothPicker
              magnet
              scrollAnimation
              selectOnPress
              showsVerticalScrollIndicator={false}
              offsetSelection={-20}
              data={this.state.hours}
              style={{ height: 240 }}
              onSelected={({ item, index }) => this.handleChangeHours(item)}
              renderItem={({ item, index }) => (
                <Text style={{ fontSize: calcFontSize(37), color: this.state.selectedHours == item ? 'red' : '#B3BACE' }} >
                  {item}</Text>
              )}
            />
          </View>
          <Text style={[styles.timeText, { marginRight: calcWidth(41), color: this.props.filterReducer.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>ч.</Text>
          <View >
            <SmoothPicker
              magnet
              scrollAnimation
              selectOnPress
              showsVerticalScrollIndicator={false}
              offsetSelection={-20}
              data={this.state.minutes}
              style={{ height: 240 }}
              onSelected={({ item, index }) => this.handleChangeMinut(item)}
              renderItem={({ item, index }) => (
                <Text style={{ fontSize: calcFontSize(37), color: this.state.selectedMinut == item ? 'red' : '#B3BACE' }} >{item}</Text>
              )}
            />
          </View>
          <Text style={[styles.timeText, { color: this.props.filterReducer.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>мин.</Text>
        </View>
        <View style={[styles.radiostation, { backgroundColor: this.props.filterReducer.backgroundColor, borderTopWidth: 1, }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <RepeatSvg height={calcHeight(21)} width={calcHeight(21)} fill='#B3BACE' />
            <View style={{ marginLeft: calcWidth(17) }}>
              <Text
                style={[global_styles.stationTexttitle, { color: this.props.filterReducer.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>
                Повтор
                </Text>
            </View>
          </View>
          <View>
            <SimpleSwitch />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.setState({ visibleModal: 1 })
          }}
          style={[styles.radiostation, { backgroundColor: this.props.filterReducer.backgroundColor }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <MyAlarmClockSvg height={calcHeight(26.88)} width={calcHeight(28)} fill='#B3BACE' />
            <View style={{ marginLeft: calcWidth(17) }}>
              <Text style={[global_styles.stationTexttitle, { color: this.props.filterReducer.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>
                Частота повторений
            </Text>
              <Text style={global_styles.stationComment}>{this.state.selectedTimeSleepList} мин</Text>
            </View>
          </View>
          <ArrowLeft height={calcHeight(12)} width={calcWidth(6.84)} fill='#B3BACE' />
        </TouchableOpacity>
        <View style={[styles.radiostation, { backgroundColor: this.props.filterReducer.backgroundColor }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <AntennaSvg height={calcHeight(32)} width={calcHeight(32)} fill='#B3BACE' />
            <View style={{ marginLeft: calcWidth(17) }}>
              <Text style={[global_styles.stationTexttitle, { color: this.props.filterReducer.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>Плавное увеличение громкости</Text>
            </View>
          </View>
          <View>
            <SimpleSwitch />
          </View>
        </View>
        <Modal
          isVisible={this.state.visibleModal === 1}
          animationIn={'slideInLeft'}
          animationOut={'slideOutRight'}
          backdropOpacity={0.2}
          onBackdropPress={() => { this.setState({ visibleModal: null }) }}>
          {this.onRenderModalSleepTimer()}
        </Modal>
        <Modal
          isVisible={this.state.visibleModal === 2}
          animationIn={'slideInLeft'}
          animationOut={'slideOutRight'}
          backdropOpacity={0.2}
          onBackdropPress={() => { this.setState({ visibleModal: null }) }}>
          {this.onRenderModalMenuRadio()}
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
    onchangeplayItem: (payload: boolean) => {
      dispatch(changeplayItem(payload))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyAlarmClock);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  radiostation: {
    height: calcHeight(74),
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#F3F4F5',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: calcWidth(24),
    paddingRight: calcWidth(26.58)
  }, 
  timeText: {
    color: '#1E2B4D',
    fontWeight: 'bold',
    marginBottom: calcHeight(6),
    fontSize: calcFontSize(17),
    marginTop: calcHeight(25),
    marginLeft: calcWidth(6)
  },
  modalSleepTimer: {

    padding: calcHeight(15),
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
    // width: calcWidth(100)
  },
  modalMenuRadio: {
    backgroundColor: 'white',
    height: calcHeight(560),
    marginHorizontal: calcWidth(45),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalTimer: {
    backgroundColor: 'white',
    height: calcHeight(380),
    marginHorizontal: calcWidth(65),
    paddingHorizontal: calcWidth(20),
    borderRadius: calcWidth(5)
  },
  timer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: calcWidth(115),
    marginRight: calcWidth(69)
  },
  btn: {
    borderRadius: 8,
    borderWidth: calcHeight(1.5),
    borderColor: '#B3BACE',
    marginTop: calcHeight(5),
    height: calcHeight(50),
    justifyContent: 'center',
    alignItems: 'center'
  }
})
