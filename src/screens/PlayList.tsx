import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    Animated,
    ActivityIndicator
} from 'react-native';
import global_styles from "../assets/styles/global_styles"
import { calcFontSize, calcHeight, calcWidth } from "../assets/styles/dimensions"

import { IPlayListProps, ICitiesConnect } from "../Interface"
import { getPlayList } from '../store/actions/playlistAction'
import HeaderByBack from "../components/HeaderByBack"
import { connect } from "react-redux"
import Arrow from "../assets/icons/arrow_back.svg"
// import TrackPlayer from 'react-native-track-player';

interface IState {
    filterType: string
}
interface IPlayListState {
    title: string,
    count: number,
    auther: string,
    type: string
}
class PlayList extends React.Component<IPlayListProps, IState> {
    constructor(props: IPlayListProps) {
        super(props)
        this.state = {
            filterType: 'playList'
        }
    }
    render() {
        
    const list=this.props.playListReducer.playList && this.props.playListReducer.trackList? this.state.filterType=='playList'?this.props.playListReducer.playList:this.props.playListReducer.trackList:[]
    
       
    return (
        <ScrollView  style={{ backgroundColor: this.props.theme.backgroundColor}}  >
            <View style={{ backgroundColor: this.props.theme.backgroundColor}}>

                <HeaderByBack title={this.props.playListReducer.title} onNavigate={() => { this.props.navigation.navigate('Menu') }} />
                <View style={styles.tabFilter}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ filterType: 'playList' })
                        }}
                        style={this.state.filterType == 'playList' ? [styles.activeTouch, styles.touch] : styles.activeTouch}>
                        <Text style={this.state.filterType == 'playList' ? styles.touchText : styles.activeTouchText}>Kоличество</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ filterType: 'efir' })
                        }}
                        style={this.state.filterType == 'efir' ? [styles.activeTouch, styles.touch] : styles.activeTouch}>
                        <Text style={this.state.filterType == 'efir' ? styles.touchText : styles.activeTouchText}>Эфир</Text>
                    </TouchableOpacity>
                </View>
                { !this.props.playListReducer.playList && !this.props.playListReducer.trackList?
                 <View style={{ justifyContent:'center', alignItems:'center', marginTop:calcHeight(150)}}>
                 <ActivityIndicator size="large" color="#0F1E45" />
                </View>:
                
                    <View>
                        {list.map((data: any) => {
                            return (
                                <View style={[styles.elements,{backgroundColor:this.props.theme.backgroundColor, borderColor: this.props.theme.backgroundColor=="white"?'#F3F4F5':"#1E2B4D"}]}>
                                    <View style={styles.elementsRow}>
                                        <Text style={[styles.elementTitle, { color: this.props.theme.backgroundColor == "white" ? "#1E2B4D" : "white" }]}>{data.song}</Text>
                                        <Text style={styles.elementAuther}>{data.artist}</Text>
                                    </View>
                                    <View>
                                        {
                                            this.state.filterType == 'playList'? 
                                            <Text style={styles.elementCount}>{data.date.split(' ')[1]}</Text>:
                                            <Text style={styles.elementCount}>{data.count}</Text>
                                        }
                                       
                                    </View>

                                </View>
                 
                            )})}
                             
                    </View>}
            </View>
            </ScrollView>
        );
    }
};
const mapStateToProps = (state: any) => {
    return state
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        ongetPlayList: (payload: any) => {
            dispatch(getPlayList(payload))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PlayList);

const styles = StyleSheet.create({
    tabFilter: {
        flexDirection: 'row',
        paddingVertical: calcHeight(16),
        paddingHorizontal: calcWidth(25),
        justifyContent: 'space-between',
      
    },
    activeTouch: {
        height: calcHeight(28),
        width: calcWidth(158),
        backgroundColor: 'white',
        borderRadius: calcWidth(20),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    touch: {
        backgroundColor: '#101C3B'
    },
    activeTouchText: {
        color: '#8B95AF',
        fontSize: calcFontSize(14),
        fontWeight: 'bold'
    },
    touchText: {
        color: '#FFFFFF',
        fontSize: calcFontSize(14),
        fontWeight: '500'
    },
    elements: {
        height: calcHeight(74),
      
        borderBottomWidth: 1,
        borderColor: '#F3F4F5',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: calcWidth(24),
        alignItems: 'center'
    },
    elementsRow: {
        width:'80%'
    },
    elementTitle: {
        color: '#1E2B4D',
        fontSize: calcFontSize(17),
        fontWeight: '500'
    },
    elementAuther: {
        color: '#8B95AF',
        fontSize: calcFontSize(14),

    },
    elementCount: {
        color: '#8B95AF',
        fontSize: calcFontSize(15),
    }
});