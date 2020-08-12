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
import RadioSvg from "../assets/icons/radio.svg"
import Location from "../assets/icons/location.svg"
import EyesSvg from "../assets/icons/eyes.svg"
import BackImage from "../assets/icons/loading_top.svg"
import { calcFontSize, calcHeight, calcWidth } from "../assets/styles/dimensions"
import { NavigationScreenProp } from 'react-navigation';
import { changeisLooking } from "../store/actions/filterAction"
import { changeMenuType } from "../store/actions/menuActions"
interface Props {
    navigation: NavigationScreenProp<any, any>;
    onchangeisLooking(): void;
    onChangeMenuType(type: boolean): void;
    filterReducer: any
}
const CustomDrawerContentComponent: React.FunctionComponent<Props> = (props) => {
    return (<ScrollView style={{ backgroundColor: '#0F1E45', }}>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>

            <View style={styles.header}>
                <Logo height={calcHeight(30)} width={calcWidth(164)} />
            </View>

            <View style={styles.items}>
                <TouchableOpacity
                    style={styles.item}
                    onPress={() => {
                        props.onChangeMenuType(true)
                        props.navigation.navigate('Menu')
                    }}
                >
                    <View style={styles.item}>
                        <RadioSvg height={calcHeight(22.02)} width={calcWidth(30)} fill='white' />
                        <Text style={styles.itemText}>Все радиостанции</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.item}
                    onPress={() => {
                        console.log(";;;;;;;;;;;;;;;;;;",);
                        props.navigation.navigate('Genres')
                        props.onChangeMenuType(true)
                    }}
                >
                    <View style={styles.item}>
                        <Guitar height={calcHeight(29.95)} width={calcWidth(30)} fill='white' />
                        <Text style={styles.itemText}>Жанры</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.item}
                    onPress={() => {
                        console.log(";;;;;;;;;;;;;;;;;;",);
                        props.navigation.navigate('Cities')
                        props.onChangeMenuType(true)
                    }}
                >
                    <View style={styles.item}>
                        <Location height={calcHeight(30)} width={calcWidth(30)} fill='white' />
                        <Text style={styles.itemText}>Города</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.item}
                    onPress={() => {
                        props.onChangeMenuType(true)
                        props.onchangeisLooking()
                    }}
                >
                    <View style={styles.item}>
                        <EyesSvg height={calcHeight(30)} width={calcWidth(30)} fill={props.filterReducer.isLooking ? '#6C7BA4' : 'white'} />
                        <Text style={props.filterReducer.isLooking ? styles.activeitemText : styles.itemText}>Просмотренные</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View>
                <BackImage />
            </View>
        </SafeAreaView>
    </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    item: {

        width: '100%',
        alignItems: 'center',

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
        onchangeisLooking: () => {
            dispatch(changeisLooking())
        },
        onChangeMenuType: (payload: any) => {
            dispatch(changeMenuType(payload))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawerContentComponent);
