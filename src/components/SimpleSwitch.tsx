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
import Header from "./Header"
import Search from "./Search"
import { ISimpleSwitchProps } from "../Interface"
import { changeMenuType } from '../store/actions/menuActions'
import HeaderByBack from "./HeaderByBack"
import PlaySvG from "../assets/icons/play.svg"
import RadioMenuElement from "./RadioMenuElement"
import { storeData, getData } from "../utils/local_storage"
import SimpleImage from "./SimpleImage"
import { connect } from "react-redux"
import ConnectSvg from "../assets/icons/connect.svg"
import ArrowLeft from "../assets/icons/arrow_right.svg"
import AlarmClockSvg from "../assets/icons/alarmClock.svg"
import RepeatSvg from "../assets/icons/repeat.svg"
import { Switch } from 'react-native-switch';

interface IState {
  data: any,
  isEnabled: boolean
}

class SimpleSwitch extends React.Component<ISimpleSwitchProps, IState> {
  constructor(props: ISimpleSwitchProps) {

    super(props)
    this.state = {
      // radioList: [
      //   'Новое радио',
      //   'Радио Energy',
      //   'Русское радио',
      //   'Европа Плюс',
      //   'Новое радио',
      //   'Радио Energy',
      //   'Русское радио',
      //   'Европа Плюс',
      //   'Европа Плюс',
      //   'Европа Плюс',
      //   'Европа Плюс',
      //   'Радио Energy',
      //   'Русское радио',
      //   'Европа Плюс',
      //   'Радио Energy',
      //   'Русское радио',
      //   'Европа Плюс',

      // ],
      data: new Date(1598051730000),
      isEnabled: true

    }
    // const unsubscribe = props.navigation.addListener('focus', () => {
    //     this.setData()
    //   });

  }
  onChange() {
    return<View>

    </View>
   }

  render() {

    return (

          <View>
            <Switch
              value={this.state.isEnabled}
              onValueChange={(val) => this.setState({isEnabled:!this.state.isEnabled})}
            //  disabled={false}
              activeText={'ДА'}
              inActiveText={'НЕТ'}
              circleSize={calcWidth(24)}
              barHeight={calcHeight(30)}
             activeTextStyle={{fontSize:calcFontSize(10)}}
             inactiveTextStyle={{fontSize:calcFontSize(10)}}
            circleBorderWidth={0}
          // circleBorderActiveColor={'white'}
               backgroundActive={'#3CDC86'}
              backgroundInactive={'#B3BACE'}
              circleActiveColor={'white'}
              circleInActiveColor={'white'}
              changeValueImmediately={true}
              renderInsideCircle={() =>this.onChange} // custom component to render inside the Switch circle (Text, Image, etc.)
              innerCircleStyle={{  height:calcHeight(26) ,width:calcHeight(26) }} // style for inner animated circle for what you (may) be rendering inside the circle
              outerCircleStyle={{height:100}} // style for outer animated circle
              renderActiveText={true}
              renderInActiveText={true}
              
              switchLeftPx={6} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
              switchRightPx={5.5} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
             switchWidthMultiplier={2.1} // multipled by the `circleSize` prop to calculate total width of the Switch
              switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
            />
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
export default connect(mapStateToProps, mapDispatchToProps)(SimpleSwitch);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  radiostation: {
    height: calcHeight(74),
    marginTop: calcFontSize(21),
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F3F4F5',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: calcWidth(24),
    paddingRight: calcWidth(26.58)

  },

})
