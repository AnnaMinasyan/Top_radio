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
import { IGanresProps, ICitiesConnect } from "../Interface"
import { getGanresData } from '../store/actions/ganresAction'

import CitiesMenuElement from "../components/CitiesMenuElement"
import { storeData, getData } from "../utils/local_storage"
import SimpleImage from "../components/SimpleImage"
import { connect } from "react-redux"

interface IState {
    // radioList: ICitiesConnect[],
    styleView: boolean,
    colors:string[]
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
        return <CitiesMenuElement info={data.item} backColor={this.props.filterReducer.backgroundColor} />
    }
    renderMenuItems2(data: any) {
        return <View style={{ padding: calcWidth(8),backgroundColor:this.props.filterReducer.backgroundColor }}>
            <SimpleImage size={calcWidth(98)}  color={this.state.colors[data.item.id %5]} title={data.item.pa} />
        </View>
    }
    render() {
        return (
            <View style={{ backgroundColor: this.props.filterReducer.backgroundColor }}>
                <Header />
                <Search />
                <SafeAreaView style={{ height: '85%' }}>
                    {this.props.menuReducer.styleView ? <FlatList
                       data={this.props.ganresReducer.ganres}
                        renderItem={(d) => this.renderMenuItems(d)}
                        //renderItem={this.renderMenuItems}
                        keyExtractor={item => item.id}
                        maxToRenderPerBatch={10}
                    /> :
                        <FlatList
                            data={this.props.ganresReducer.ganres}
                            renderItem={(d) => this.renderMenuItems2(d)}
                            contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', paddingLeft: calcWidth(12), paddingRight: calcWidth(16), justifyContent: 'center' }}
                            keyExtractor={item => item.id}
                            maxToRenderPerBatch={10}
                        />}
                </SafeAreaView>
                {/* <ScrollView>
                    {!this.props.menuReducer.styleView? <View style={{ marginTop: calcHeight(8) }}>
                        {this.state.radioList.map((title) => {
                            return (
                                <CitiesMenuElement info={title} />
                            )
                        })}
                    </View> :
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingLeft: calcWidth(12), paddingRight: calcWidth(16), justifyContent: 'center' }}>
                            {this.state.radioList.map((key, value) => {
                                return <View style={{ padding: calcWidth(8), }}>
                                    <SimpleImage size={calcWidth(98)} />
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
        ongetGanresData: () => {
            dispatch(getGanresData())
        }
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