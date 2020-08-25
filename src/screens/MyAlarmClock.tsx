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
import Search from "../components/Search"
import { IMenuProps } from "../Interface"
import { changeMenuType } from '../store/actions/menuActions'
import HeaderByBack from "../components/HeaderByBack"
import RadioMenuElement from "../components/RadioMenuElement"
import { storeData, getData, _addInFavorite } from "../utils/local_storage"
import { connect } from "react-redux"
import ConnectSvg from "../assets/icons/connect.svg"
import ArrowLeft from "../assets/icons/arrow_right.svg"
import MyAlarmClockSvg from "../assets/icons/alarmClock.svg"
import RepeatSvg from "../assets/icons/repeat.svg"
import SimpleSwitch from '../components/SimpleSwitch';
import SmoothPicker from 'react-native-smooth-picker';
import Modal from 'react-native-modal'; // 2.4.0
import PowerOffSvg  from "../assets/icons/powerOff.svg"
import { changeswipeablePanelActive, changeplayItem, changeSearchData } from '../store/actions/filterAction'
import { createFilter } from 'react-native-search-filter';
const KEYS_TO_FILTERS = ['pa'];

interface IState {
  date: any,
  isEnabled: boolean,
  hours: any,
  selectedHours: number,
  selectedMinut: number,
  selectedTimeRepeat: number,
  minutes: any,
  timeSleepList: any,
  visibleModal: number | null,
  favoriteList: any,
  playItem: any,
  isOnAlarmclock: boolean,
  onRepeat: boolean
}

class MyAlarmClock extends React.Component<IMenuProps, IState> {
  constructor(props: IMenuProps) {
    super(props)

    this.state = {
      hours: [
        0,
        1,
        2,
        3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
      ],
      minutes: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46,
        47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59
      ],
      date: new Date(),
      isEnabled: true,
      selectedHours: 0,
      selectedMinut: 0,
      visibleModal: null,
      timeSleepList: [
        0, 2, 5, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60
      ],
      selectedTimeRepeat: 0,
      favoriteList: [],
      playItem: [],
      isOnAlarmclock: false,
      onRepeat: false
    }

  }

  componentDidMount() {
    getData('alarmClock').then((time) => {
      if (time) {
        this.setState({
          isOnAlarmclock:true,
          playItem:time.playItem,
          selectedHours:time.hours,
          selectedMinut:time.minute,
          onRepeat:time.repeat>0,
          selectedTimeRepeat:time.repeat

        })
      }
    })
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
      selectedTimeRepeat: index
    });
  };
  renderMenuItems(data: any) {

    return <TouchableOpacity
      onPress={() => {
        this.setState({
          visibleModal: null,
          playItem: data.item,
        })
      }}
      style={{ width: '100%' }}
    >
      <RadioMenuElement title={data.item.pa} image={data.item.im}
        backColor={this.props.theme.backgroundColor}
        addInFavorite={() => this._changeInFavorite(data.item)}
        isFavorite={this.checkIsFovorite(data.item.id)} />
    </TouchableOpacity>
  }
  checkIsFovorite(num: number) {
    return this.props.favorites.includes(num)
  }
  _changeInFavorite(data: any) {
    _addInFavorite(data.item).then(() => {
      getData('favorites').then((favorite) => {
        this.setState({ favoriteList: favorite })
      })
    })
  }
  onRenderModalMenuRadio() {
    let list = this.props.menuReducer.menuData.filter(createFilter(this.props.filterReducer.searchData, KEYS_TO_FILTERS))
    return <ScrollView >
      <View style={[styles.modalMenuRadio, {}]}>
        <View style={{ width: '100%' }}><Search renderSearchData={this.props.onchnageSearchData}
        /></View>
        <View style={{ height: calcHeight(500) }}>
          <FlatList
            style={{ marginBottom: 10, }}
            data={list}
            renderItem={(d) => this.renderMenuItems(d)}
            keyExtractor={(item:any, index:number) => item.id.toString()}
            maxToRenderPerBatch={10}
          />
        </View>
      </View>
    </ScrollView>

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
              <View>
                <Text style={{
                  fontSize: calcFontSize(37),
                  color: this.state.selectedTimeRepeat == item ? 'red' : '#B3BACE'
                }}
                >{item}</Text>
              </View>
            )}
          />
        </View>
        <Text
          style={[styles.timeText, { color: this.props.theme.backgroundColor == "white" ? "#1E2B4D" : "white", }]}>
          мин.
          </Text>
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          this._changeAlarmClock()
          this.setState({ visibleModal: 0 })
        }}
      >
        <Text style={{ color: 'black' }}>Подтвердить число </Text>
      </TouchableOpacity>
    </View>
  }
  _changeIsOnAlarmClock() {
    const data = new Date()
    if (this.state.isOnAlarmclock) {
      storeData('alarmClock', null)
    } else {
      storeData('alarmClock',
        {
          hours: this.state.selectedHours,
          minute: this.state.selectedMinut,
          playItem: this.state.playItem,
          repeat: this.state.onRepeat ? this.state.selectedTimeRepeat : null
        })
    }
    this.setState({ isOnAlarmclock: !this.state.isOnAlarmclock })
  }
  _changeAlarmClock() {
    getData("alarmClock").then((alarmClock) => {
      if (alarmClock && this.state.onRepeat) {
        let arr = alarmClock
        arr.repeat = this.state.selectedTimeRepeat
        storeData('alarmClock', arr)
      }
    })
  }
  render() {

    return (
      <View style={[styles.container, { backgroundColor: this.props.theme.backgroundColor }]}>
        <HeaderByBack title='Будильник' onNavigate={() => { this.props.navigation.goBack() }} />
        <View style={[styles.radiostation, { backgroundColor: this.props.theme.backgroundColor, marginTop: calcFontSize(21), borderTopWidth: 1, }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <PowerOffSvg height={calcHeight(34)} width={calcHeight(20)} fill='#B3BACE' />
            <View style={{ marginLeft: calcWidth(17) }}>
              <Text
                style={[global_styles.stationTexttitle, { color: this.props.theme.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>
                Включить будельник
                </Text>
            </View>
          </View>
          <View>
            <SimpleSwitch isEnabled={this.state.isOnAlarmclock} onValueChange={() => this._changeIsOnAlarmClock()} />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.setState({ visibleModal: 2 })
          }}
          style={[styles.radiostation, {
            backgroundColor: this.props.theme.backgroundColor,
            borderTopWidth: 1,
          }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <ConnectSvg height={calcHeight(20)} width={calcHeight(20)} fill='#B3BACE' />
            <View style={{ marginLeft: calcWidth(17) }}>
              <Text style={[global_styles.stationTexttitle, { color: this.props.theme.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>
                Радиостанция
            </Text>
              <Text style={global_styles.stationComment}>{this.state.playItem.pa}</Text>
            </View>
          </View>
          <ArrowLeft height={calcHeight(12)} width={calcWidth(6.84)} fill='#B3BACE' />
        </TouchableOpacity>
        <View style={{ justifyContent: 'center', alignItems: "center", }}>
          <Text style={[styles.timeText, { color: this.props.theme.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>Время</Text>
        </View>
        <View style={styles.timer}>
          <View >
            <SmoothPicker
              magnet
              scrollAnimation
              selectOnPress
              showsVerticalScrollIndicator={false}
              offsetSelection={-15}
              initialScrollToIndex={this.state.hours[this.state.selectedHours]}
              data={this.state.hours}
              style={{ height: 240 }}
              onSelected={({ item, index }) => this.handleChangeHours(item)}
              renderItem={({ item, index }) => (<View>
                {item < 10 ? <Text style={{
                  fontSize: calcFontSize(37),
                  color: this.state.selectedHours == item ? 'red' : '#B3BACE'
                }}
                >0{item}</Text> : <Text style={{
                  fontSize: calcFontSize(37),
                  color: this.state.selectedHours == item ? 'red' : '#B3BACE'
                }}
                >{item}</Text>}</View>
              )}
            />
          </View>
          <Text style={[styles.timeText, { marginRight: calcWidth(41), color: this.props.theme.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>ч.</Text>
          <View >
            <SmoothPicker
              magnet
              scrollAnimation
              selectOnPress
              showsVerticalScrollIndicator={false}
              offsetSelection={-25}
              data={this.state.minutes}
              style={{ height: 240 }}
              initialScrollToIndex={this.state.minutes[this.state.selectedMinut]}
              onSelected={({ item, index }) => this.handleChangeMinut(item)}
              renderItem={({ item, index }) => (
                <View>
                  {item < 10 ? <Text style={{
                    fontSize: calcFontSize(37),
                    color: this.state.selectedMinut == item ? 'red' : '#B3BACE'
                  }}
                  >0{item}</Text> : <Text style={{
                    fontSize: calcFontSize(37),
                    color: this.state.selectedMinut == item ? 'red' : '#B3BACE'
                  }}
                  >{item}</Text>}
                </View>)}
            />
          </View>
          <Text style={[styles.timeText, { color: this.props.theme.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>мин.</Text>
        </View>
        <View style={[styles.radiostation, { backgroundColor: this.props.theme.backgroundColor, borderTopWidth: 1, }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <RepeatSvg height={calcHeight(21)} width={calcHeight(21)} fill='#B3BACE' />
            <View style={{ marginLeft: calcWidth(17) }}>
              <Text
                style={[global_styles.stationTexttitle, { color: this.props.theme.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>
                Повтор
                </Text>
            </View>
          </View>
          <View>
            <SimpleSwitch isEnabled={this.state.onRepeat}
              onValueChange={() => {
                this._changeAlarmClock()
                this.setState({ onRepeat: !this.state.onRepeat })
              }} />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.setState({ visibleModal: 1 })
          }}
          style={[styles.radiostation, { backgroundColor: this.props.theme.backgroundColor }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <MyAlarmClockSvg height={calcHeight(26.88)} width={calcHeight(28)} fill='#B3BACE' />
            <View style={{ marginLeft: calcWidth(17) }}>
              <Text style={[global_styles.stationTexttitle, { color: this.props.theme.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>
                Частота повторений
            </Text>
              <Text style={global_styles.stationComment}>{this.state.selectedTimeRepeat} мин</Text>
            </View>
          </View>
          <ArrowLeft height={calcHeight(12)} width={calcWidth(6.84)} fill='#B3BACE' />
        </TouchableOpacity>
        {/* <View style={[styles.radiostation, { backgroundColor: this.props.theme.backgroundColor }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <AntennaSvg height={calcHeight(32)} width={calcHeight(32)} fill='#B3BACE' />
            <View style={{ marginLeft: calcWidth(17) }}>
              <Text style={[global_styles.stationTexttitle, { color: this.props.theme.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>Плавное увеличение громкости</Text>
            </View>
          </View>
          <View>
            <SimpleSwitch />
          </View>
        </View> */}
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
    onchnageSearchData: (payload: any) => {
      dispatch(changeSearchData(payload))
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
