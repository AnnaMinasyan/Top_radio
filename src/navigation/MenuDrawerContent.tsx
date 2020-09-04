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
interface Props {
    navigation: NavigationScreenProp<any, any>;
    onchangeisActive(type:string): void;
    filterReducer: any
}
const CustomDrawerContentComponent: React.FunctionComponent<Props> = (props) => {
    
    
    return (<View>
        <ScrollView style={{ backgroundColor: '#0F1E45', }}>
            <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>

                <View style={styles.header}>
                    <Logo height={calcHeight(30)} width={calcWidth(164)} />
                </View>

                <View style={styles.items}>
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => {
                            props.onchangeisActive('all')
                            props.navigation.navigate('Menu')
                        }}
                    >
                        <View style={styles.item}>
                            <RadioSvg height={calcHeight(22.02)} width={calcWidth(30)} fill={props.filterReducer.isActive=="all"?'#6C7BA4':"white"} />
                            <Text style={props.filterReducer.isActive=="all" ? styles.activeitemText : styles.itemText}>Все радиостанции</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => {
                            props.navigation.navigate('Genres')
                            props.onchangeisActive('genres')

                        }}
                    >
                        <View style={styles.item}>
                            {props.filterReducer.isActive=="genres"?
                            <GuitarDark height={calcHeight(29.95)} width={calcWidth(30)} />:<Guitar height={calcHeight(29.95)} width={calcWidth(30)}   />}
                            <Text style={props.filterReducer.isActive=="genres" ? styles.activeitemText : styles.itemText}>Жанры</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => {
                            props.navigation.navigate('Cities')
                            props.onchangeisActive('cities')

                        }}
                    >
                        <View style={styles.item}>
                        {props.filterReducer.isActive=="cities"?
                          <LocationSvg height={calcHeight(30)} width={calcWidth(30)}/>:
                            <Location height={calcHeight(30)} width={calcWidth(30)}/>}
                            <Text style={props.filterReducer.isActive=="cities" ? styles.activeitemText : styles.itemText}>Города</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => {
                            props.onchangeisActive('looking')
                            props.navigation.navigate('Menu')
                        }}
                    >
                        <View style={styles.item}>
                            <EyesSvg height={calcHeight(30)} width={calcWidth(30)} fill={props.filterReducer.isActive=="looking"?'#6C7BA4':"white"} />
                            <Text style={props.filterReducer.isActive=="looking" ? styles.activeitemText : styles.itemText}>Просмотренные</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{position:'absolute', bottom:0}} >
                    <BackImage />
                </View>
            </SafeAreaView>
        </ScrollView>
      
    </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
height:deviceHeight
    },
    item: {

        width: '100%',
        alignItems: 'center',
        height:calcHeight(60),
        flexDirection: 'row'
    },
    itemText: {
        fontSize: calcFontSize(18),
        fontWeight: '500',
        color: 'white',
        marginLeft: calcWidth(22)
    },
    activeitemText: {
        fontSize: calcFontSize(18),
        fontWeight: '500',
        color: '#6C7BA4',
        marginLeft: calcWidth(22)
    },

    iconContainer: {
        marginLeft: 16
    },
    items: {
        paddingHorizontal: calcWidth(24),
        height: calcHeight(254),
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: calcHeight(30)
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
        height: calcHeight(167),
        paddingTop: calcHeight(49),
        alignItems: 'center'
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
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawerContentComponent);
