import React from 'react'
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    Animated,
    TouchableOpacity,
    Image
} from 'react-native'
import { SafeAreaView } from 'react-navigation';
import { bindActionCreators } from "redux"
import { connect } from 'react-redux';
import Logo from "../assets/icons/logo.svg"
import Guitar from "../assets/icons/guitar.svg"
import GuitarDark from "../assets/icons/guitarDark.svg"
import RadioSvg from "../assets/icons/radio.svg"
import Location from "../assets/icons/location.svg"
import LocationSvg from "../assets/icons/locationDark.svg"
import EyesSvg from "../assets/icons/eyes.svg"
import BackImage from "../assets/icons/loading_top.svg"
import { calcFontSize, calcHeight, calcWidth ,deviceHeight} from "../assets/styles/dimensions"
import { NavigationScreenProp } from 'react-navigation';
import { changeisActive } from "../store/actions/filterAction"
import player from "../services/player/PlayerServices"
import {changeActiveArrow} from '../store/actions/bottomAction'
interface Props {
    navigation: NavigationScreenProp<any, any>;
    onchangeisActive(type:string): void;
    onchangeActiveArrow(type:boolean): void;
    filterReducer: any
}
const CustomDrawerContentComponent: React.FunctionComponent<Props> = (props) => {
    
    
    return (<View style={{height:'100%'}}>
        <ScrollView style={{ backgroundColor: '#0F1E45', height:deviceHeight}}>
            <View style={styles.container} >

                <View style={styles.header}>
                    <Logo height={30} width={164} />
                </View>

                <View style={styles.items}>
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => {
                            props.onchangeisActive('all')
                            props.onchangeActiveArrow(true)
                            props.navigation.navigate('Menu')
                        }}
                    >
                        <View style={styles.item}>
                            <RadioSvg height={22.02} width={30} fill={props.filterReducer.isActive=="all"?'#6C7BA4':"white"} />
                            <Text style={props.filterReducer.isActive=="all" ? styles.activeitemText : styles.itemText}>Все радиостанции</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => {
                            
                            props.navigation.navigate('Genres')
                             props.onchangeisActive('genres')
                             props.onchangeActiveArrow(false)

                             player.close()
                        }}
                    >
                        <View style={styles.item}>
                            {props.filterReducer.isActive=="genres"?
                            <GuitarDark height={29.95} width={30} />:<Guitar height={29.95} width={30}   />}
                            <Text style={props.filterReducer.isActive=="genres" ? styles.activeitemText : styles.itemText}>Жанры</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => {
                            props.navigation.navigate('Cities')
                            props.onchangeisActive('cities')
                            props.onchangeActiveArrow(false)

                        }}
                    >
                        <View style={styles.item}>
                        {props.filterReducer.isActive=="cities"?
                          <LocationSvg height={30} width={30}/>:
                            <Location height={30} width={30}/>}
                            <Text style={props.filterReducer.isActive=="cities" ? styles.activeitemText : styles.itemText}>Города</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => {
                            props.onchangeisActive('looking')
                            props.navigation.navigate('Menu')
                            props.onchangeActiveArrow(false)

                        }}
                    >
                        <View style={styles.item}>
                            <EyesSvg height={30} width={30} fill={props.filterReducer.isActive=="looking"?'#6C7BA4':"white"} />
                            <Text style={props.filterReducer.isActive=="looking" ? styles.activeitemText : styles.itemText}>Просмотренные</Text>
                        </View>
                    </TouchableOpacity>
                </View>
               
            </View>
            <View style={{position:'absolute', bottom:0,left:-50}} >
                    <BackImage width={380} height={300} />
                </View>
        </ScrollView>
      
    </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

marginBottom:300
    },
    item: {

        width: '100%',
        alignItems: 'center',
        height:60,
        flexDirection: 'row'
    },
    itemText: {
        fontSize: 18,
        fontWeight: '500',
        color: 'white',
        marginLeft: 22
    },
    activeitemText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#6C7BA4',
        marginLeft: 22
    },

    iconContainer: {
        marginLeft: 16
    },
    items: {
        paddingHorizontal: 24,
        height: 254,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30
    },
    arrowContainer: {
        position: 'absolute',
        right: 18
    },
    transportItem: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 35
    },
    header: {
       
        paddingTop: 49,
        alignItems: 'center',
        marginBottom:25
    }
});
const mapStateToProps = (state: any) => {
    return state
};
// const mapStateToProps = (state: any) => ({

//     reducer:state


// });
const mapDispatchToProps = (dispatch: any) => {
    return {
        onchangeisActive: (payload: string) => {
            dispatch(changeisActive(payload))
        },
        onchangeActiveArrow: (payload: string) => {
            dispatch(changeActiveArrow(payload))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawerContentComponent);
