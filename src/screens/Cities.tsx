import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    SafeAreaView,
    FlatList
} from 'react-native';
import global_styles from "../assets/styles/global_styles"
import { calcFontSize, calcHeight, calcWidth } from "../assets/styles/dimensions"
import Header from "../components/Header"
import Search from "../components/Search"
import { ICitiesProps, ICitiesConnect } from "../Interface"
import { changeMenuType, changeFilterData } from '../store/actions/menuActions'
import { getCitiesData } from '../store/actions/citiesAction'
import { changeSearchData } from '../store/actions/filterAction'
import CitiesMenuElement from "../components/CitiesMenuElement"
import { storeData, getData } from "../utils/local_storage"
import SimpleImage from "../components/SimpleImage"
import { connect } from "react-redux"
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createFilter } from 'react-native-search-filter';
const KEYS_TO_FILTERS = ['pa'];
interface IState {
    styleView: boolean
    colors: string[]
}

class Cities extends React.Component<ICitiesProps, IState> {
    constructor(props: ICitiesProps) {

        super(props)
        this.state = {
            colors: ['#4F67A6', '#41A1BF', '#42B39E', '#49BE7F', '#7C59C5'],
           
            styleView: this.props.menuReducer.styleView
        }
        const unsubscribe = props.navigation.addListener('focus', () => {
        });

    }
    componentDidMount() {
        this.props.onGetCities()
        getData('menuView').then((menuView) => {


            //   this.props.onChangeMenuType(false)
            this.setState({ styleView: menuView })
        })
    }

    changeViewStyle(res: boolean) {
    }
    renderMenuItems(data: any) {

        return <TouchableOpacity
        onPress={()=>{
            console.log(data.item.id);
            this.props.onchangeFilterData(data.item.pa)
            this.props.navigation.navigate('FilterMenu')
        }}
        >
            <CitiesMenuElement info={data.item} backColor={this.props.theme.backgroundColor} />
        </TouchableOpacity>
    }
    renderMenuItems2(data: any) {
        return <TouchableOpacity
        onPress={()=>{
            console.log(data.item.id);
            this.props.onchangeFilterData(data.item.pa)
            this.props.navigation.navigate('FilterMenu')
        }}
        >
            <View style={{ padding: calcWidth(8), }}>
                <SimpleImage size={calcWidth(98)} title={data.item.pa} color={this.state.colors[data.item.id % 5]} />
            </View>
        </TouchableOpacity>
    }
    render() {
        const list=this.props.citiesReducer.cities.filter(createFilter(this.props.filterReducer.searchData, KEYS_TO_FILTERS))
        return (
            <View style={{ backgroundColor: this.props.theme.backgroundColor }}>
                <Header  navigation={this.props.navigation}
                     onchnageSearchData={this.props.onchnageSearchData} />
                <SafeAreaView style={{ height: '100%' }}>
                    {this.props.menuReducer.styleView ? <FlatList
                        data={list}
                        renderItem={(d) => this.renderMenuItems(d)}
                        keyExtractor={(item: any, index: number) => item.id.toString()}
                        maxToRenderPerBatch={10}
                    /> :
                        <FlatList
                            data={list}
                            renderItem={(d) => this.renderMenuItems2(d)}
                            contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', paddingLeft: calcWidth(12), paddingRight: calcWidth(16), justifyContent: 'center' }}
                            keyExtractor={(item: any, index: number) => item.id.toString()}
                            maxToRenderPerBatch={10}
                        />}
                </SafeAreaView>
                {/* <ScrollView>
                    {this.props.menuReducer.styleView? <View style={{ marginTop: calcHeight(8) }}>
                        {this.props.citiesReducer.cities.map((title:any) => {
                            return (
                                <CitiesMenuElement info={title.pa} />
                            )
                        })}
                    </View> :
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingLeft: calcWidth(12), paddingRight: calcWidth(16), justifyContent: 'center' }}>
                            {this.state.radioList.map((key) => {
                                return <View style={{ padding: calcWidth(8), }}>
                                    <SimpleImage size={calcWidth(98)} title={key.title} color={key.color} />
                                </View>
                            })}

                        </View>}
                </ScrollView> */}
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
        },
        onGetCities: () => {
            dispatch(getCitiesData())
        },
        onchangeFilterData:(payload: any)=>{
             dispatch(changeFilterData(payload))
        },
        onchnageSearchData: (payload: any) => {
            dispatch(changeSearchData(payload))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cities);

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#0F1E45',
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    }
});