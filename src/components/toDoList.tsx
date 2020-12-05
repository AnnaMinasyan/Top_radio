import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ScrollView } from 'react-native';
import Check from "../assets/icons/checked-radio.svg"
import {IData} from "../Interface"
import {calcFontSize,calcHeight,calcWidth} from "../assets/styles/dimensions" 
interface Props {
    data:IData
    valueChanged:any,
}
  interface IState {
   status:boolean,
  }
  class ToDo extends React.Component<Props, IState> {
    constructor(props: Props) {
        super(props)
        this.state = {
            status:false
        }
      }
   change(res:IData){
       this.props.valueChanged(res);
      this.setState({status:!this.state.status})
           
    }
      render(){
        return (
            <TouchableOpacity  
            style={{width:calcWidth(50), height:calcHeight(50),  justifyContent:'center', alignItems:'flex-end'}}  
                onPress={() => {
                this.change({title:this.props.data.title,check:!this.props.data.check})
                }} 
                >
                    {!this.props.data.check ?
                        <View 
                        style={[this.props.data.check?styles.unchecked:[styles.unchecked,
                            {backgroundColor:'#F7F8F9',borderColor:'#9DA5B7'}]]}
                        >
                            </View> :
                        <View style={styles.checked}>
                            <Check height={calcHeight(10)}/></View>}
                </TouchableOpacity> 
        );  }
    
}

export default ToDo;

const styles = StyleSheet.create({
    closed:{height:60, width:60, justifyContent:'center', alignItems:'center'},
    textTask: {
        fontSize: calcFontSize(14),
        color:'#50545D',
        width:calcWidth(280)
    },
    unchecked:{
        height:calcHeight(25),
            width:calcHeight(25),
            borderWidth:calcHeight(1),
         borderColor:'#62646D',
         borderRadius:calcHeight(20),
         marginRight:calcHeight(20),
         
        },
        
        checked:{
            height:calcHeight(25),
            width:calcHeight(25),
            borderWidth:calcWidth(1),
            borderColor:'#3F93D9',
            borderRadius:calcHeight(20),
            marginRight:calcWidth(14),
            backgroundColor:'#3F93D9',
            justifyContent:'center',
            alignItems:'center',
            // shadowOffset: {
            //     width: 0,
            //     height: calcHeight(4),
            // },
            // shadowOpacity: 0.18,
            // shadowRadius: calcHeight(8),
            // shadowColor:'rgba(70, 93, 239, 0.18)',
            // elevation: 10,
        },
        titletext:{
            fontSize:calcFontSize(26)
        },
        textComm:{
            fontSize:calcFontSize(18),
            color:'#8c8c8c'
        }
    },
   
);