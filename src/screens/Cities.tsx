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

import CitiesMenuElement from "../components/CitiesMenuElement"
import { storeData, getData } from "../utils/local_storage"
import SimpleImage from "../components/SimpleImage"
import { connect } from "react-redux"
import { TouchableOpacity } from 'react-native-gesture-handler';

interface IState {
    styleView: boolean
    colors: string[]
}

class Cities extends React.Component<ICitiesProps, IState> {
    constructor(props: ICitiesProps) {

        super(props)
        this.state = {
            colors: ['#4F67A6', '#41A1BF', '#42B39E', '#49BE7F', '#7C59C5'],
            // radioList: [
            //    { title:'Москва',
            //    count:26,
            //    color:'#4F67A6'
            // },
            //    { title: 'Санкт-Петербург',
            //    count:12,
            //    color:'#41A1BF'
            // },
            //    { title: 'Екатеринбург',
            //    count:10,
            // color:'#42B39E'},
            //    { title: 'Пермь',
            //    count:26,
            //    color:'#49BE7F'
            // },
            //    { title:'Липетск',
            //    count:5,
            // color:'#7C59C5'},
            //    { title: 'Владивосток',count:2, color:'#4F67A6'},
            //    { title:'Красноярск',count:26,  color:'#41A1BF'},

            //    { title:'Красноярск',count:26, color:'#42B39E'},

            //    { title:'Красноярск',count:26, color:'#42B39E'},

            //    { title:'Красноярск',count:26, color:'#42B39E'},



            // ],
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
            this.props.onchangeFilterData(data.item.id)
            this.props.navigation.navigate('FilterMenu')
        }}
        >
            <CitiesMenuElement info={data.item} backColor={this.props.filterReducer.backgroundColor} />
        </TouchableOpacity>
    }
    renderMenuItems2(data: any) {
        return <TouchableOpacity
        onPress={()=>{
            console.log(data.item.id);
            this.props.onchangeFilterData(data.item.id)
            this.props.navigation.navigate('FilterMenu')
        }}
        >
            <View style={{ padding: calcWidth(8), }}>
                <SimpleImage size={calcWidth(98)} title={data.item.pa} color={this.state.colors[data.item.id % 5]} />
            </View>
        </TouchableOpacity>
    }
    render() {
        console.log(this.props.citiesReducer.cities);

        return (


            <View style={{ backgroundColor: this.props.filterReducer.backgroundColor }}>
                <Header  navigation={this.props.navigation}/>
                <Search />
                <SafeAreaView style={{ height: '85%' }}>
                    {this.props.menuReducer.styleView ? <FlatList
                        data={this.props.citiesReducer.cities}
                        renderItem={(d) => this.renderMenuItems(d)}

                        //renderItem={this.renderMenuItems}
                        keyExtractor={item => item.id}
                        maxToRenderPerBatch={10}
                    /> :
                        <FlatList
                            data={this.props.citiesReducer.cities}
                            renderItem={(d) => this.renderMenuItems2(d)}
                            contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', paddingLeft: calcWidth(12), paddingRight: calcWidth(16), justifyContent: 'center' }}
                            //renderItem={this.renderMenuItems}
                            keyExtractor={item => item.id}
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
        }
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