import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    Animated,
    Easing
} from 'react-native';
import global_styles from "../assets/styles/global_styles"
import { calcFontSize, calcHeight, calcWidth } from "../assets/styles/dimensions"

import { IMenuProps, ICitiesConnect } from "../Interface"
import { changeMenuType } from '../store/actions/menuActions'

import { connect } from "react-redux"
import Arrow from "../assets/icons/arrow_back.svg"
// import TrackPlayer from 'react-native-track-player';

interface IState {
   


}
interface IHeaderByBackProps{
title:string,
onNavigate :()=>void;

}
class HeaderByBack extends React.Component<IHeaderByBackProps, IState> {
    constructor(props: IHeaderByBackProps) {

        super(props)
        this.state = {
           

        }
    }
    render() {
        return (
            <View style={{ backgroundColor: 'white' }}>
                <View style={styles.header}>
                    <TouchableOpacity
                    onPress={()=>{
                        this.props.onNavigate()
                    }}
                    >
                    <Arrow height={calcHeight(23.49)} width={calcWidth(23.49)} />
                    </TouchableOpacity>
                    <Text style={styles.title}>{this.props.title}</Text>
                </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(HeaderByBack);

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#0F1E45',
        height: calcHeight(56),
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: calcWidth(13),
        paddingRight: calcWidth(22.73)
    },
    title:{
        color:'white',
        fontSize:calcFontSize(20),
        marginLeft:calcWidth(16),
        fontWeight:'500'
    }
});