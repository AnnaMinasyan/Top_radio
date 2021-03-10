import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableHighlight
} from 'react-native';
import SimpleImage from "./SimpleImage"
import ConnectSvg from "../assets/icons/connect.svg"
import { ICitiesMenuElementProps, ICitiesConnect } from "../Interface"
interface IState {
    isFavorite: boolean,
    colors:string[],
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
            <TouchableHighlight
            onPressIn={()=>{                
                this.props.onSelect()
            }}
             style={[
            {backgroundColor:this.props.backColor,
                borderBottomWidth: 1,
                borderBottomColor:this.props.backColor=="white"?'#F3F4F5':'#1E2B4D',
            }]}>
               <View style={styles.body}>
               <View style={styles.row}>
                    <SimpleImage size={54} title={this.props.info.pa} 
                 color={this.state.colors[this.props.info.id %5]}
                    />
                    <Text style={[styles.txtTitle,{color:this.props.backColor=="white"?"#1E2B4D":'white'}]}>{this.props.info.pa}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <ConnectSvg height={20} width={20} fill='#B3BACE' />
                    <Text style={[styles.countTxt,{color:this.props.backColor=="white"?"#1E2B4D":'white'}]}>
                    {this.props.info.co}
                    </Text>
                </View>
               </View>
            </TouchableHighlight>
        );
    }
};

export default CitiesMenuElement;
const styles = StyleSheet.create({
    body: {
        backgroundColor: 'white',
        height: 74,
    
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 29,

    },
    txtTitle: {
        fontSize: 17,
        fontWeight: '500',
        fontFamily: 'Roboto',
        color: '#1E2B4D',
        marginLeft:34
    },
    row: {
        flexDirection: 'row',
        // justifyContent:'space-between',
        width: '55%',
        alignItems: 'center'
    },
    countTxt: {
        fontSize: 15,
        color: '#1E2B4D',
        marginLeft:14
    }

});