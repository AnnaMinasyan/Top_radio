import React from 'react'

import {
  View,
  StyleSheet,
} from 'react-native';
import { calcFontSize, calcHeight, calcWidth } from "../assets/styles/dimensions"

import { connect } from "react-redux"
import { Switch } from 'react-native-switch';

interface IState {

}
interface Props{
  isEnabled: boolean
  onValueChange():void; 
  theme?:any
}
class SimpleSwitch extends React.Component<Props, IState> {
  constructor(props: Props) {

    super(props)
    this.state = {
    }

  }

  render() {

    return (

          <View>
            <Switch
              value={this.props.isEnabled}
              onValueChange={() => this.props.onValueChange()}
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
              backgroundInactive={this.props.theme.backgroundColor=="white"?'#B3BACE':'#192E66'}
              circleActiveColor={'white'}
              circleInActiveColor={'white'}
              changeValueImmediately={true}
            //  renderInsideCircle={() =>this.onChange} // custom component to render inside the Switch circle (Text, Image, etc.)
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
