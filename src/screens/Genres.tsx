import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    SafeAreaView,
    FlatList,
    TouchableOpacity
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
    // radioList: ICitiesConnect[],
    styleView: boolean,
    colors:string[],
    searchData:any |null
}

class Genres extends React.Component<IGanresProps, IState> {
    constructor(props: IGanresProps) {
        console.log("LLLLLLLLLLLLLLLLLLLLLL", props);

        super(props)
        this.state = {
            colors:['#4F67A6','#41A1BF','#42B39E','#49BE7F','#7C59C5'],
            //     radioList: [
            //        { title:'Alternative',
            //        count:32,

            //     },
            //        { title: 'Rock',
            //        count:12,

            //     },
            //        { title: 'Rap',
            //        count:54,
            //     },
            //        { title: 'Rap',
            //        count:26,

            //     },
            //        { title:'Rap',
            //        count:5,
            //   },
            //        { title: 'DnB',count:2,},
            //        { title:'Hip Hop',count:352, },

            //        { title:'Alternative',count:910, },

            //        { title:'Alternative',count:21, },

            //        { title:'Rap',count:26, },



            //     ],
            searchData:null,
            styleView: this.props.menuReducer.styleView
        }
        // const unsubscribe = props.navigation.addListener('focus', () => {
        //     this.setData()
        //   });

    }
    componentDidMount() {
        this.props.ongetGanresData()
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
         this.props.onchangeFilterDataByGenre(data.item.id)
            this.props.navigation.navigate('FilterMenu')
        }}
        >
            <CitiesMenuElement info={data.item} backColor={this.props.filterReducer.backgroundColor} />
        </TouchableOpacity>
    }
    renderMenuItems2(data: any) {
        return <TouchableOpacity
        onPress={()=>{
            this.props.onchangeFilterDataByGenre(data.item.id)
            this.props.navigation.navigate('FilterMenu')
        }}
         style={{ padding: calcWidth(8),backgroundColor:this.props.filterReducer.backgroundColor }}>
            <SimpleImage size={calcWidth(98)}  color={this.state.colors[data.item.id %5]} title={data.item.pa} />
        </TouchableOpacity>
    }
    chouseList() {
        if(this.state.searchData){
            return this.state.searchData
        }else  {
            return this.props.ganresReducer.ganres
        } 
    }
    render() {
        const list=this.props.ganresReducer.ganres.filter(createFilter(this.props.filterReducer.searchData, KEYS_TO_FILTERS))
        console.log(":::::::::::::::",list);
        
        return (
            <SafeAreaView style={{ height: '100%' }}>

            <View style={{ backgroundColor: this.props.filterReducer.backgroundColor }}>
                <Header  
                navigation={this.props.navigation}
                onchnageSearchData={this.props.onchnageSearchData}

                />
                    {this.props.menuReducer.styleView ? <FlatList
                       data={list}
                        renderItem={(d) => this.renderMenuItems(d)}
                        //renderItem={this.renderMenuItems}
                        keyExtractor={item => item.id}
                        maxToRenderPerBatch={10}
                    /> :
                        <FlatList
                            data={list}
                            renderItem={(d) => this.renderMenuItems2(d)}
                            contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', paddingLeft: calcWidth(12), paddingRight: calcWidth(16), justifyContent: 'center' }}
                            keyExtractor={item => item.id}
                            maxToRenderPerBatch={10}
                        />}
                         {/* <View style={{ position: 'absolute',
                     height: calcHeight(86),
                      width: '100%',
                       bottom: 0 , 
                   }}>
                    <Bottom
                        navigation={this.props.navigation}
                        onCloseStart={() => this.props.onchangeswipeablePanelActive(false)}
                        isFavorite={this.checkIsFovorite(this.props.filterReducer.playItem.id)}
                        playUrl={this.state.playUrl}
                        chnageplayUrl={(data:any)=>{
                            this.setState({playUrl:data})
                        }}
                    />
                     </View>  */}
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