import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

import SimpleImage from "./SimpleImage"
import ConnectSvg from "../assets/icons/connect.svg"
//import MenuSvg from "../assets/icons/menu_icon.svg"
import global_styles from "../assets/styles/global_styles"
import { calcFontSize, calcHeight, calcWidth } from "../assets/styles/dimensions"
import { ICitiesMenuElementProps, ICitiesConnect } from "../Interface"
interface IState {
    isFavorite: boolean,
    colors:string[]
}
class CitiesMenuElement extends React.Component<ICitiesMenuElementProps, IState> {
    constructor(props: ICitiesMenuElementProps) {
        super(props)
        this.state = {
            isFavorite: false,
            colors:['#4F67A6','#41A1BF','#42B39E','#49BE7F','#7C59C5']
        }

    }

    render() {
        
        return (


            <View style={[styles.body,{backgroundColor:this.props.backColor}]}>
                <View style={styles.row}>
                    <SimpleImage size={calcHeight(54)} title={this.props.info.pa} 
                 color={this.state.colors[this.props.info.id %5]}  
               //   color={'yellow'}
                    />

                    <Text style={[styles.txtTitle,{color:this.props.backColor=="white"?"#1E2B4D":'white'}]}>{this.props.info.pa}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <ConnectSvg height={calcHeight(20)} width={calcHeight(20)} fill='#B3BACE' />
                    <Text style={[styles.countTxt,{color:this.props.backColor=="white"?"#1E2B4D":'white'}]}>
                        0
                    </Text>
                </View>


            </View>
        );
    }
};

export default CitiesMenuElement;
const styles = StyleSheet.create({
    body: {
        backgroundColor: 'white',
        height: calcHeight(74),
        borderBottomColor: '#F3F4F5',
        borderBottomWidth: calcHeight(1),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: calcWidth(29),

    },
    txtTitle: {
        fontSize: calcFontSize(17),
        fontWeight: '500',
        fontFamily: 'Roboto',
        color: '#1E2B4D',
        marginLeft: calcWidth(34)
    },
    row: {
        flexDirection: 'row',
        // justifyContent:'space-between',
        width: '55%',
        alignItems: 'center'
    },
    countTxt: {
        fontSize: calcFontSize(15),
        color: '#1E2B4D',
        marginLeft: calcWidth(14)
    }

});