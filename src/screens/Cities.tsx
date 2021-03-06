import React from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';
import Header from "../components/Header"
import { ICitiesProps } from "../Interface"
import { changeFilterData,
    changeHeaderText } from '../store/actions/menuActions'
import { getCitiesData } from '../store/actions/citiesAction'
import { changeSearchData } from '../store/actions/filterAction'
import CitiesMenuElement from "../components/CitiesMenuElement"
import { connect } from "react-redux"
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
    filterData(res:any){
        const array: any = []

        for (let index = 0; index < this.props.menuReducer.menuData.length; index++) {
            const element = this.props.menuReducer.menuData[index];
            if (element.ci && element.ci.length > 0) {
                element.ci.map((elem: any, key: any) => {
                    if (elem == res.id) {
                        array.push(element)
                    }
                })
            }
        }

        this.props.onchangeFilterData(array)

    }
    renderMenuItems(data: any) {

        return <TouchableHighlight
        onPress={()=>{
            this.filterData(data.item)
            this.props.navigation.navigate('FilterMenu')
            this.props.onchangeHeaderText(data.item.pa)
        }}
        >
            <CitiesMenuElement info={data.item} backColor={this.props.theme.backgroundColor} />
        </TouchableHighlight>
    }
  
    render() {
        const list=this.props.citiesReducer.cities!=null?this.props.citiesReducer.cities.filter(createFilter(this.props.filterReducer.searchData, KEYS_TO_FILTERS)):[]

        return (
                   
            <View style={{ backgroundColor: this.props.theme.backgroundColor }}>
                <Header  navigation={this.props.navigation}
                title={'Города'} 
                     onchnageSearchData={this.props.onchnageSearchData} />
              {
                 ! this.props.citiesReducer.cities?
                 <View style={{ justifyContent:'center', alignItems:'center', marginTop:150, height:'100%', backgroundColor:this.props.theme.backgroundColor}}>
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
        onchangeHeaderText: (payload: string) => {
            dispatch(changeHeaderText(payload))
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