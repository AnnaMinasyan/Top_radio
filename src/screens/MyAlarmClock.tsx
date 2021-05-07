import React from 'react'

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList, TouchableHighlight
} from 'react-native';
import global_styles from "../assets/styles/global_styles"
import { calcFontSize, calcHeight, calcWidth } from "../assets/styles/dimensions"
import Search from "../components/Search"
import { IMenuProps } from "../Interface"
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
import PowerOffSvg from "../assets/icons/powerOff.svg"
import SearchSvg from "../assets/icons/search.svg"
import { changeSearchData } from '../store/actions/filterAction'
import { createFilter } from 'react-native-search-filter';
import RedHeart from "../assets/icons/redHeart.svg";
import Heart from "../assets/icons/heart.svg";
import player from "../services/player/PlayerServices";
const KEYS_TO_FILTERS = ['pa'];
import DatePicker from 'react-native-date-picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import { initAlarmClock } from "../utils/createAlarmClock"
import {

  changeMiniScreenData,

  changeSelectedRadioStation,

} from "../store/actions/bottomAction";
interface IState {
  date: any,
  isEnabled: boolean,
  visibleModal: number | null,
  favoriteList: any,
  playItem: any,
  isFavorite: boolean,
  timeSleepList: any,
  alarmClock: any,
  isOnAlarmclock: any
  onRepeat:boolean,
  selectedTimeRepeat:any
}

class MyAlarmClock extends React.Component<IMenuProps, IState> {

  alarmClockTime: any = null

  constructor(props: IMenuProps) {

    super(props)

    this.state = {
      date: new Date(),
      isEnabled: true,
      visibleModal: null,
      timeSleepList: [
        0, 2, 5, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60
      ],
      favoriteList: [],
      playItem: null,
      isFavorite: false,
      alarmClock: [],
      isOnAlarmclock: false,
      onRepeat:false,
      selectedTimeRepeat:0
    }
  }

  componentDidMount() {
    getData('alarmClock').then((time) => {

      if (time) {
        this.setState({
          playItem: time.radioStation,
          alarmClock: time.datePickerData,
          isOnAlarmclock: true,
          selectedTimeRepeat:time.alarmClockTime.repeatTime,
          onRepeat:time.alarmClockTime.repeatTime>0
        })

      }
    })
  }

  renderMenuItems(data: any) {
    if (this.checkIsFovorite(data.item.id) && this.state.isFavorite) {
      return <TouchableHighlight
        onPress={() => {
          let radioStation = {
            data: data.item,
            isPlayingMusic: true,
            activeBi: data.item.st[0],
            id: data.item.id,
            index:data.index,
          };
          let info={
            radioStation:radioStation,
            index:data.index,
            isPlayingMusic:true,
            search:null
          }
          this.setState({
            visibleModal: null,
            playItem: info,
          })

          this._changeIsOnAlarmClock(this.state.alarmClock)
        }}
      >
        <RadioMenuElement
          showFavoriteHeart={false}
          title={data.item.pa}
          image={data.item.im}
          backColor={'#0F1E45'}
          addInFavorite={() => this.props.toaddfavorite(data.item)}
          id={data.item.id} />
      </TouchableHighlight>
    }
    else if (this.state.isFavorite == false) {
      return <TouchableOpacity
        onPress={() => {
          let radioStation = {
            data: data.item,
            isPlayingMusic: true,
            activeBi: data.item.st[0],
            id: data.item.id,
            index:data.index,
          };
          let info={
            radioStation:radioStation,
            index:data.index,
            isPlayingMusic:true,
            search:null
          }
          this.setState({
            visibleModal: null,
            playItem: info,
          })
          this._changeIsOnAlarmClock(this.state.alarmClock)
        }}
        style={{ width: '100%' }}
      >
        <RadioMenuElement

          showFavoriteHeart={false}
          title={data.item.pa} image={data.item.im}
          backColor={'#0F1E45'}
          addInFavorite={() => this._changeInFavorite(data.item)}
          id={data.item.id} />
      </TouchableOpacity>
    } else { return null }
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
    return <View style={[styles.modalMenuRadio, { backgroundColor: "#0F1E45" }]}>
      <View style={{
        width: '100%', backgroundColor: '#0a1d4f',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingLeft: calcWidth(10),
        paddingBottom: calcHeight(5)
      }}>
        <View style={{
          borderBottomWidth: calcHeight(2), width: '10%', alignItems: 'center', justifyContent: 'center',
          borderColor: '#57678F', paddingLeft: 5
        }}>
          <SearchSvg width={calcWidth(14.48)} height={calcHeight(15)} />

        </View>
        <View style={{ width: '70%' }}>
          <Search renderSearchData={this.props.onchnageSearchData} />
        </View>
        <TouchableOpacity
          onPress={() => {
            this.setState({ isFavorite: !this.state.isFavorite })
          }}
          style={{ height: 50, width: 80, justifyContent: 'center', alignItems: 'center' }}
        >
          {this.state.isFavorite ?

            <RedHeart fill='#FF5050' height={19} width={21} /> : <Heart fill='#B3BACE' height={18.54} width={20.83} />}
        </TouchableOpacity>
      </View>

      <View style={{ height: calcHeight(400), width: '100%' }}>
        <FlatList
          style={{ marginBottom: 10, }}
          data={list}
          renderItem={(d) => this.renderMenuItems(d)}
          keyExtractor={(item: any, index: number) => item.id.toString()}
          maxToRenderPerBatch={10}
        />
      </View>
    </View>


  }
  onRenderModalSleepTimer() {
    return <View style={[styles.modalTimer, { backgroundColor: this.props.theme.backgroundColor, }]}>
      <View style={styles.modalSleepTimer
      }>
        <View style={{}}>
          <SmoothPicker
            magnet
            scrollAnimation
            // selectOnPress
            showsVerticalScrollIndicator={false}
            offsetSelection={-20}
            data={this.state.timeSleepList}
            style={{ height: calcHeight(370), marginTop: calcHeight(10) }}
            onSelected={({ item, index }) => {this.setState({selectedTimeRepeat:item})}}
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
        style={[styles.btn, { borderColor: this.props.theme.backgroundColor == "white" ? '#F3F4F5' : "#1E2B4D" }]}
        onPress={() => {
          if(this.alarmClockTime)
           {this.alarmClockTime.repeatTime=this.state.selectedTimeRepeat}
          this._changeIsOnAlarmClock(this.state.alarmClock)
          this.setState({ visibleModal: 0,onRepeat:true })
        }}
      >
        <Text style={[styles.timeText,
        { color: this.props.theme.backgroundColor == "white" ? "#1E2B4D" : "white", marginTop: 0 }]}>Подтвердить</Text>
      </TouchableOpacity>
    </View>
  }
  _changeIsOnAlarmClock(datePickerData: any) {
    let data: any = {}
    if (this.state.playItem && this.alarmClockTime) {
      this.setState({
        isOnAlarmclock: true
      })
      if(!this.state.onRepeat){
        this.alarmClockTime.repeatTime=0
      }
      data.radioStation = this.state.playItem
      data.alarmClockTime = this.alarmClockTime
      data.datePickerData = datePickerData
      
      storeData("alarmClock", data)
      initAlarmClock(this.alarmClockTodo, data)
    }

  }
  alarmClockTodo = (data: any) => {
    console.log(data,"----------------------------------");


    this.props.onchangeSelectedRadioStation(data.radioStation)
    this.props.onchangeMiniScreenData(data.radioStation)
   player.open(data)
    player._startPlayMusic(data.radioStation.data,
    data.radioStation?.data.st[0])
  }
  changeIsOnAlarmclock() {

    this.setState({ isOnAlarmclock: !this.state.isOnAlarmclock })
    if(this.state.isOnAlarmclock){
      initAlarmClock(this.alarmClockTodo, null)
     
    }else if (this.state.playItem && this.alarmClockTime) {
      this._changeIsOnAlarmClock(this.state.alarmClock)
    }
  }
  render() {

    return (
      <View style={[styles.container, { backgroundColor: this.props.theme.backgroundColor }]}>
        <HeaderByBack title='Будильник' onNavigate={() => { this.props.navigation.goBack() }} />
        <View style={[styles.radiostation,
        {
          backgroundColor: this.props.theme.backgroundColor, marginTop: calcFontSize(21), borderTopWidth: 1,
          borderColor: this.props.theme.backgroundColor == "white" ? '#F3F4F5' : "#1E2B4D"
        }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <View style={global_styles.menu_icon}>

              <PowerOffSvg height={calcHeight(34)} width={calcHeight(20)} fill='#B3BACE' />
            </View>
            <View style={{ width: calcWidth(220), }}>
              <Text
                style={[global_styles.stationTexttitle,
                {
                  color: this.props.theme.backgroundColor == "white" ? "#1E2B4D" : "white",
                }]}>
                Включить будельник
                </Text>
            </View>
          </View>
          <View >
            <SimpleSwitch isEnabled={this.state.isOnAlarmclock} onValueChange={() => this.changeIsOnAlarmclock()} />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.setState({ visibleModal: 2 })
          }}
          style={[styles.radiostation, {
            backgroundColor: this.props.theme.backgroundColor,
            borderColor: this.props.theme.backgroundColor == "white" ? '#F3F4F5' : "#1E2B4D"
          }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <View style={global_styles.menu_icon}>

              <ConnectSvg height={calcHeight(20)} width={calcHeight(20)} fill='#B3BACE' />
            </View>
            <View >
              <Text style={[global_styles.stationTexttitle, { color: this.props.theme.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>
                Радиостанция
            </Text>
              <Text style={global_styles.stationComment}>{this.state.playItem ? this.state.playItem.radioStation.data.pa : 'Выберите радио'}</Text>
            </View>
          </View>
          <ArrowLeft height={calcHeight(12)} width={calcWidth(6.84)} fill='#B3BACE' />
        </TouchableOpacity>
        <View style={{ justifyContent: 'center', alignItems: "center", }}>
          <Text style={[styles.timeText, { color: this.props.theme.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>Время</Text>
        </View>

        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
  
          <DatePicker
            mode="time"
           // showTime = {{ user12hours: true }} 
            textColor={ this.props.theme.backgroundColor == "white" ? "#1E2B4D" : "white"}
            // dividerHeight={0}
            //date={this.timeSleep}
            fadeToColor ={this.props.theme.backgroundColor}
            style={{width:100, height:200}}
            date={this.state.alarmClock ? this.state.alarmClock : new Date(Date.now())}
            onDateChange={(data) => {
              const alarm = {
                hours: data.getHours(),
                minute: data.getMinutes(),
                repeatTime:this.state.selectedTimeRepeat
              }
              this.setState({ alarmClock: data })
              this.alarmClockTime = alarm

              this._changeIsOnAlarmClock(data)
            }}
          />
        </View>

        <View style={[styles.radiostation, {
          backgroundColor: this.props.theme.backgroundColor,
          borderTopWidth: 1,
          borderColor: this.props.theme.backgroundColor == "white" ? '#F3F4F5' : "#1E2B4D"
        }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <View style={global_styles.menu_icon}>

              <RepeatSvg height={calcHeight(21)} width={calcHeight(21)} fill='#B3BACE' />
            </View>
            <View >
              <Text
                style={[global_styles.stationTexttitle, { color: this.props.theme.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>
                Повтор
                </Text>
            </View>
          </View>
          <View>
            <SimpleSwitch
              isEnabled={this.state.onRepeat}
              onValueChange={() => {
                if(this.state.onRepeat){
                  this.setState({onRepeat:!this.state.onRepeat,selectedTimeRepeat:0})
                }else{
                  this.setState({onRepeat:!this.state.onRepeat})
                }
               
              }} />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.setState({ visibleModal: 1 })
          }}
          style={[styles.radiostation, { backgroundColor: this.props.theme.backgroundColor, borderColor: this.props.theme.backgroundColor == "white" ? '#F3F4F5' : "#1E2B4D" }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <View style={global_styles.menu_icon}>
              <MyAlarmClockSvg height={calcHeight(26.88)} width={calcHeight(28)} fill='#B3BACE' />

            </View>
            <View >
              <Text style={[global_styles.stationTexttitle, { color: this.props.theme.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>
                Частота повторений
            </Text>
          { this.state.selectedTimeRepeat>0&&   <Text style={global_styles.stationComment}>{this.state.selectedTimeRepeat} мин</Text>}
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

    onchnageSearchData: (payload: any) => {
      dispatch(changeSearchData(payload))
    },
    onchangeSelectedRadioStation: (payload: any) => {
      dispatch(changeSelectedRadioStation(payload))
    },
    onchangeMiniScreenData: (payload: any) => {
      dispatch(changeMiniScreenData(payload))
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
    marginTop: calcHeight(50),
    paddingBottom: calcHeight(8),
    height: calcHeight(450),
    // marginHorizontal: calcWidth(45),

    justifyContent: 'center',
    alignItems: 'center'
  },
  modalTimer: {
    backgroundColor: 'white',
    height: calcHeight(500),
    marginHorizontal: calcWidth(65),
    paddingHorizontal: calcWidth(20),
    borderRadius: calcWidth(5),
    justifyContent: 'space-between'
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
    marginVertical: calcHeight(15),
    height: calcHeight(50),
    justifyContent: 'center',
    alignItems: 'center'
  }
})
