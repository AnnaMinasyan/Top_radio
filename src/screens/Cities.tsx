import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    SafeAreaView,
    FlatList,
    TouchableHighlight
} from 'react-native';
import global_styles from "../assets/styles/global_styles"
import { calcFontSize, calcHeight, calcWidth } from "../assets/styles/dimensions"
import Header from "../components/Header"
import Search from "../components/Search"
import { ICitiesProps, ICitiesConnect } from "../Interface"
import { changeFilterData } from '../store/actions/menuActions'
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
    colors: string[]
}

class Cities extends React.Component<ICitiesProps, IState> {
    constructor(props: ICitiesProps) {

        super(props)
        this.state = {
            colors: ['#4F67A6', '#41A1BF', '#42B39E', '#49BE7F', '#7C59C5'],
        }
        const unsubscribe = props.navigation.addListener('focus', () => {
        });

    }
    componentDidMount() {
        this.props.onGetCities()
    }

    changeViewStyle(res: boolean) {
    }
    renderMenuItems(data: any) {

        return <TouchableHighlight
        onPress={()=>{
            console.log(data.item.pa);
            this.props.onchangeFilterData(data.item.id)
            this.props.navigation.navigate('FilterMenu')
        }}
        >
            <CitiesMenuElement info={data.item} backColor={this.props.theme.backgroundColor} />
        </TouchableHighlight>
    }
  
    render() {
        const list=this.props.citiesReducer.cities.filter(createFilter(this.props.filterReducer.searchData, KEYS_TO_FILTERS))

        return (
            <SafeAreaView style={{ height: '100%' }}>
                   
            <View style={{ backgroundColor: this.props.theme.backgroundColor }}>
                <Header  navigation={this.props.navigation}
                     onchnageSearchData={this.props.onchnageSearchData} />
                
                     <FlatList
                     numColumns={1}
                        data={list}
                        renderItem={(d) => this.renderMenuItems(d)}
                        keyExtractor={(item: any, index: number) => item.id.toString()}
                        maxToRenderPerBatch={10}
                    /> 
             
            </View>
            </SafeAreaView>
        );
    }
};
const mapStateToProps = (state: any) => {
    return state
};
const mapDispatchToProps = (dispatch: any) => {
    return {
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