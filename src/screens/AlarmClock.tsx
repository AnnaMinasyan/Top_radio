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
import { calcFontSize, calcHeight, calcWidth } from "../assets/styles/dimensions"
import Header from "../components/Header"
import Search from "../components/Search"
import { IMenuProps } from "../Interface"
import { changeMenuType } from '../store/actions/menuActions'
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
import DatePicker from 'react-native-date-picker'
import SmoothPicker from 'react-native-smooth-picker';
import moment from 'moment';
import AntennaSvg from "../assets/icons/antena.svg"
interface IState {
  date: any,
  isEnabled: boolean,
  hours: any,
  selectedHours: number,
  selectedMinut:number,
  minutes: any
}

class AlarmClock extends React.Component<IMenuProps, IState> {
  constructor(props: IMenuProps) {

    super(props)
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
        '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48',
        '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'
      ],
      date: new Date(),
      isEnabled: true,
      selectedHours: 0,
      selectedMinut:0

    }
    // const unsubscribe = props.navigation.addListener('focus', () => {
    //     this.setData()
    //   });

  }
  componentDidMount(){
    console.log( moment().format('LT').split(':'));
    // for (let index = 0; index < this.state.hours.length; index++) {
    //   const element = this.state.hours[index];
      
    // }
    
  }
  onChange() {
    return <View>

    </View>
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
  render() {

    return (
      <View style={[styles.container,{backgroundColor:this.props.filterReducer.backgroundColor}]}>
        <HeaderByBack title='Будильник' onNavigate={() => { this.props.navigation.goBack() }} />
        <ScrollView>
        <View style={[styles.radiostation,{backgroundColor:this.props.filterReducer.backgroundColor, marginTop: calcFontSize(21),   borderTopWidth: 1,}]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <RepeatSvg height={calcHeight(21)} width={calcHeight(21)} fill='#B3BACE' />
            <View style={{ marginLeft: calcWidth(17) }}>

              <Text 
              style={[global_styles.stationTexttitle,{color:this.props.filterReducer.backgroundColor=="white"?"#1E2B4D":"white"}]}>
                Включить будельник 
                </Text>
            </View>
          </View>
          <View>
            <SimpleSwitch />
          </View>
        </View>
        <View style={[styles.radiostation,{backgroundColor:this.props.filterReducer.backgroundColor,
        
          borderTopWidth: 1,}]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <ConnectSvg height={calcHeight(20)} width={calcHeight(20)} fill='#B3BACE' />
            <View style={{ marginLeft: calcWidth(17) }}>

              <Text style={[global_styles.stationTexttitle,{color:this.props.filterReducer.backgroundColor=="white"?"#1E2B4D":"white"}]}>
                Радиостанция
            </Text>
              <Text style={global_styles.stationComment}>Новое радио</Text>
            </View>
          </View>
          <ArrowLeft height={calcHeight(12)} width={calcWidth(6.84)} fill='#B3BACE' />
        </View>
       <View style={{justifyContent:'center', alignItems:"center", }}>
       <Text style={[styles.timeText,{color:this.props.filterReducer.backgroundColor=="white"?"#1E2B4D":"white"}]}>Время</Text>
       </View>
        <View style={{ 
      justifyContent:'center',
         flexDirection: 'row',  
         alignItems:'center',
         marginLeft:calcWidth(115),
         marginRight:calcWidth(69)}}>
       
          <View style={styles.wrapperVertical}>
            <SmoothPicker
              magnet
              scrollAnimation
              selectOnPress
              showsVerticalScrollIndicator={false}
              
              data={this.state.hours}
              style={{ height: 240 }}
              onSelected={({ item, index }) => this.handleChangeHours(item)}
              renderItem={({ item, index }) => (
                <Text style={{ fontSize: calcFontSize(37), color: this.state.selectedHours == item ? 'red' : '#B3BACE' }} >
                  {item}</Text>
              )}
            />
            
          </View>
          <Text style={[styles.timeText,{marginRight:calcWidth(41),color:this.props.filterReducer.backgroundColor=="white"?"#1E2B4D":"white"}]}>ч.</Text>
          <View style={styles.wrapperVertical}>
            <SmoothPicker
              magnet
              scrollAnimation
              selectOnPress
              showsVerticalScrollIndicator={false}

              data={this.state.minutes}
              style={{ height: 240 }}
              onSelected={({ item, index }) => this.handleChangeMinut(item)}
              renderItem={({ item, index }) => (
                <Text style={{ fontSize: calcFontSize(37), color: this.state.selectedMinut == item ? 'red' : '#B3BACE' }} >{item}</Text>
              )}
            />
          </View>
          <Text style={[styles.timeText,{color:this.props.filterReducer.backgroundColor=="white"?"#1E2B4D":"white"}]}>мин.</Text>
        </View>


        <View style={[styles.radiostation,{backgroundColor:this.props.filterReducer.backgroundColor,   borderTopWidth: 1,}]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <RepeatSvg height={calcHeight(21)} width={calcHeight(21)} fill='#B3BACE' />
            <View style={{ marginLeft: calcWidth(17) }}>

              <Text 
              style={[global_styles.stationTexttitle,{color:this.props.filterReducer.backgroundColor=="white"?"#1E2B4D":"white"}]}>
                Повтор
                </Text>
            </View>
          </View>
          <View>
            <SimpleSwitch />
          </View>
        </View>

        <View style={[styles.radiostation,{backgroundColor:this.props.filterReducer.backgroundColor}]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <AlarmClockSvg height={calcHeight(26.88)} width={calcHeight(28)} fill='#B3BACE' />
            <View style={{ marginLeft: calcWidth(17) }}>

              <Text style={[global_styles.stationTexttitle,{color:this.props.filterReducer.backgroundColor=="white"?"#1E2B4D":"white"}]}>
                Частота повторений
            </Text>
              <Text style={global_styles.stationComment}>10 мин</Text>
            </View>
          </View>
          <ArrowLeft height={calcHeight(12)} width={calcWidth(6.84)} fill='#B3BACE' />
        </View>
        <View style={[styles.radiostation,{backgroundColor:this.props.filterReducer.backgroundColor}]}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <AntennaSvg height={calcHeight(32)} width={calcHeight(32)} fill='#B3BACE' />
            <View style={{ marginLeft: calcWidth(17) }}>

              <Text style={[global_styles.stationTexttitle,{color:this.props.filterReducer.backgroundColor=="white"?"#1E2B4D":"white"}]}>Плавное увеличение громкости</Text>
            </View>
          </View>
          <View>
            <SimpleSwitch />
          </View>
        </View>
        </ScrollView>
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
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AlarmClock);



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

  }, wrapperVertical: {

    
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
