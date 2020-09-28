import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';
import global_styles from "../assets/styles/global_styles"
import { calcFontSize, calcHeight, calcWidth } from "../assets/styles/dimensions"
import Header from "../components/Header"
import Search from "../components/Search"
import { IGanresProps, ICitiesConnect } from "../Interface"
import { getGanresData } from '../store/actions/ganresAction'
import { changeFilterDataByGenre } from '../store/actions/menuActions'
import { changeSearchData } from '../store/actions/filterAction'

import CitiesMenuElement from "../components/CitiesMenuElement"
import { storeData, getData } from "../utils/local_storage"
import SimpleImage from "../components/SimpleImage"
import { connect } from "react-redux"
import { createFilter } from 'react-native-search-filter';
const KEYS_TO_FILTERS = ['pa'];
interface IState {

    colors:string[],
    searchData:any |null
}

class Genres extends React.Component<IGanresProps, IState> {
    constructor(props: IGanresProps) {

        super(props)
        this.state = {
            colors:['#4F67A6','#41A1BF','#42B39E','#49BE7F','#7C59C5'],
            searchData:null,
        }

    }
    componentDidMount() {
        this.props.ongetGanresData()
        getData('menuView').then((menuView) => {

        })
    }

    changeViewStyle(res: boolean) {

    }
    renderMenuItems(data: any) {
        return <TouchableHighlight 
        onPress={()=>{
         this.props.onchangeFilterDataByGenre(data.item)
            this.props.navigation.navigate('FilterMenu')
        }}
        >
            <CitiesMenuElement info={data.item} backColor={this.props.theme.backgroundColor} />
        </TouchableHighlight>
    }
    chouseList() {
        if(this.state.searchData){
            return this.state.searchData
        }else  {
            return this.props.ganresReducer.ganres
        } 
    }
    render() {
        const list=this.props.ganresReducer.ganres?this.props.ganresReducer.ganres.filter(createFilter(this.props.filterReducer.searchData, KEYS_TO_FILTERS)):[]      
       
        return (
            <SafeAreaView style={{ height: '100%' }}>

            <View style={{ backgroundColor: this.props.theme.backgroundColor }}>
                <Header  
                navigation={this.props.navigation}
                onchnageSearchData={this.props.onchnageSearchData}

                />
                {!this.props.ganresReducer.ganres?
                    <View style={{ justifyContent:'center', alignItems:'center', marginTop:calcHeight(150)}}>
                    <ActivityIndicator size="large" color="#0F1E45" />
                   </View>:
                
                     <FlatList
                     numColumns={1}
                       data={list}
                        renderItem={(d) => this.renderMenuItems(d)}
                        keyExtractor={(item: any, index: number) => item.id.toString()}
                        maxToRenderPerBatch={10}
                    /> 
                }
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
        ongetGanresData: () => {
            dispatch(getGanresData())
        },
        onchangeFilterDataByGenre:(payload: any)=>{
            dispatch(changeFilterDataByGenre(payload))
        },
        onchnageSearchData: (payload: any) => {
            dispatch(changeSearchData(payload))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Genres);

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