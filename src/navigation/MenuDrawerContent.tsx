import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity, SafeAreaView, StatusBar,
} from 'react-native'
import { connect, useDispatch, useSelector } from 'react-redux';
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
import { changeSearchData } from '../store/actions/menuActions';
import { changeFilterGanres } from '../store/actions/ganresAction';
import { changeFilterCities } from '../store/actions/citiesAction';
import { DrawerActions } from '@react-navigation/native';
import { isActiveSelector } from '../store/selector/filterSelector';
import { swiperShowRadiostationSelector } from '../store/selector/bottomSelector';
import { ganresSelector } from '../store/selector/ganreSelector';
import { menuDataSelector } from '../store/selector/menuSelector';
import { citiesSelector } from '../store/selector/citiesSelector';

interface Props {
    navigation: NavigationScreenProp<any, any>;

}
const CustomDrawerContentComponent: React.FunctionComponent<any> = (props) => {
const dispatch = useDispatch();
const isActive =useSelector(isActiveSelector)
const swiperShowRadiostation=useSelector(swiperShowRadiostationSelector)
const ganres=useSelector(ganresSelector)
const menuData=useSelector(menuDataSelector)
const cities=useSelector(citiesSelector)
const [loading,setLoading]=useState<boolean>(false)
useEffect(()=>{
    setTimeout(()=>{
        setLoading(true)
    },3000)
},[])
console.log('loadingloadingloading',loading);

    return (
        <SafeAreaView style={{flex: 1}}>
   {loading? <View style={{height:'100%', zIndex:999}}>
        <ScrollView style={{ backgroundColor: '#0F1E45', height:deviceHeight}}>
            <View style={styles.container} >

                <View style={styles.header}>
                    <Logo height={30} width={164} />
                </View>

                <View style={styles.items}>
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => {
                          dispatch(changeisActive('all'))
                          dispatch(changeActiveArrow(true))
                            props.navigation.navigate('Menu')  
                           swiperShowRadiostation&& player.close()              
                            dispatch(changeSearchData(menuData))
                        }}
                    >
                        <View style={styles.item}>
                            <RadioSvg height={22.02} width={30} fill={isActive=="all"?'#6C7BA4':"white"} />
                            <Text style={isActive=="all" ? styles.activeitemText : styles.itemText}>Все радиостанции</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => {
                            
                            props.navigation.navigate('Genres')
                            dispatch(changeisActive('genres'))
                            dispatch(changeActiveArrow(true))
                         dispatch(changeFilterGanres(ganres))
                        swiperShowRadiostation&& player.close()
                        }}
                    >
                        <View style={styles.item}>
                            {isActive=="genres"?
                            <GuitarDark height={29.95} width={30} />:<Guitar height={29.95} width={30}   />}
                            <Text style={isActive=="genres" ? styles.activeitemText : styles.itemText}>Жанры</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => {
                            props.navigation.navigate('Cities')
                            dispatch(changeisActive('cities'))
                            dispatch(changeActiveArrow(true))
                           dispatch(changeFilterCities(cities))
                            swiperShowRadiostation&& player.close()
                        }}
                    >
                        <View style={styles.item}>
                        {isActive=="cities"?
                          <LocationSvg height={30} width={30}/>:
                            <Location height={30} width={30}/>}
                            <Text style={isActive=="cities" ? styles.activeitemText : styles.itemText}>Города</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => {
                            dispatch(changeisActive('looking'))
                            props.navigation.navigate('LookingMenu')
                            dispatch(changeActiveArrow(false))
                            swiperShowRadiostation&& player.close()
                        }}
                    >
                        <View style={styles.item}>
                            <EyesSvg height={30} width={30} fill={isActive=="looking"?'#6C7BA4':"white"} />
                            <Text style={isActive=="looking" ? styles.activeitemText : styles.itemText}>Просмотренные</Text>
                        </View>
                    </TouchableOpacity>
                </View>
               
            </View>
            <View style={{position:'absolute', bottom:-10,left:-50}} >
                    <BackImage width={380} height={300} />
                </View>
        </ScrollView>

                
    </View>:null}
   </SafeAreaView>
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

export default CustomDrawerContentComponent
