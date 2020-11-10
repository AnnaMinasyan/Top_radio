import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    PanResponder,
    Dimensions,
    LayoutAnimation,
    TouchableOpacity
} from 'react-native';

import Arrow from "../assets/icons/arrow.svg"
import RedHeart from "../assets/icons/redHeart.svg"
import Heart from "../assets/icons/heart.svg"
import { calcFontSize, calcHeight, calcWidth, deviceHeight, deviceWidth } from "../assets/styles/dimensions"

const MARGIN_TOP = Platform.OS === 'ios' ? 20 : 0;
const DEVICE_HEIGHT = Dimensions.get('window').height - MARGIN_TOP;
type Props = {
    hasRef?: () => void,
    swipeHeight?: number,
    itemMini?: object,
    itemFull: object,
    disablePressToShow?: boolean,
    style?: object,
    onShowMini?: () => void,
    onShowFull?: () => void,
    toaddfavorite?: () => void,
    closed?: () => void,
    checkIsFovorite?: () => void,
    backgroundColor: String,
    bottomReducer: any,
    animation?: 'linear' | 'spring' | 'easeInEaseOut' | 'none'
};
export default class SwipeUpDown extends Component<Props> {
    static defautProps = {
        disablePressToShow: false
    };
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true
        };
        this.disablePressToShow = props.disablePressToShow;
        this.SWIPE_HEIGHT = props.swipeHeight || 60;
        this._panResponder = null;
        this.top = this.SWIPE_HEIGHT;
        this.height = this.SWIPE_HEIGHT;
        this.customStyle = {
            style: {
                bottom: 0,
                top: this.top,
                height: this.height
            }
        };
        this.checkCollapsed = true;
        this.showFull = this.showFull.bind(this);
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (event, gestureState) => true,
            onPanResponderMove: this._onPanResponderMove.bind(this),
            onPanResponderRelease: this._onPanResponderRelease.bind(this)
        });
    }

    componentDidMount() {
        this.props.hasRef && this.props.hasRef(this);
    }

    updateNativeProps() {
        switch (this.props.animation) {
            case 'linear':
                LayoutAnimation.linear();
                break;
            case 'spring':
                LayoutAnimation.spring();
                break;
            case 'easeInEaseOut':
                LayoutAnimation.easeInEaseOut();
                break;
            case 'none':
            default:
                break;
        }
        this.viewRef.setNativeProps(this.customStyle);
    }

    _onPanResponderMove(event, gestureState) {
        if (gestureState.dy > 50 && !this.checkCollapsed) {
            // SWIPE DOWN

            this.customStyle.style.top = this.top + gestureState.dy;
            this.customStyle.style.height = DEVICE_HEIGHT - gestureState.dy;
            this.swipeIconRef && this.swipeIconRef.setState({ icon: images.minus });
            !this.state.collapsed && this.setState({ collapsed: true });
            this.updateNativeProps();
        } else if (this.checkCollapsed && gestureState.dy < -60) {
            // SWIPE UP
            this.top = 0;
            this.customStyle.style.top = DEVICE_HEIGHT + gestureState.dy;
            this.customStyle.style.height = -gestureState.dy + this.SWIPE_HEIGHT;
            this.swipeIconRef &&
                this.swipeIconRef.setState({ icon: images.minus, showIcon: true });
            if (this.customStyle.style.top <= DEVICE_HEIGHT / 2) {
                this.swipeIconRef &&
                    this.swipeIconRef.setState({
                        icon: images.arrow_down,
                        showIcon: true
                    });
            }
            this.updateNativeProps();
            this.state.collapsed && this.setState({ collapsed: false });
        }
    }

    _onPanResponderRelease(event, gestureState) {
        if (gestureState.dy < -100 || gestureState.dy < 100) {
            this.showFull();
        } else {
            this.showMini();
        }
    }

    showFull() {
        const { onShowFull } = this.props;
        this.customStyle.style.top = 0;
        this.customStyle.style.height = DEVICE_HEIGHT;
        this.swipeIconRef &&
            this.swipeIconRef.setState({ icon: images.arrow_down, showIcon: true });
        this.updateNativeProps();
        this.state.collapsed && this.setState({ collapsed: false });
        this.checkCollapsed = false;
        onShowFull && onShowFull();
    }

    showMini() {
        const { onShowMini, itemMini } = this.props;
        this.customStyle.style.top = itemMini
            ? DEVICE_HEIGHT - this.SWIPE_HEIGHT
            : DEVICE_HEIGHT;
        this.customStyle.style.height = itemMini ? this.SWIPE_HEIGHT : 0;
        this.swipeIconRef && this.swipeIconRef.setState({ showIcon: false });
        this.updateNativeProps();
        !this.state.collapsed && this.setState({ collapsed: true });
        this.checkCollapsed = true;
        onShowMini && onShowMini();
    }

    render() {
        const { itemMini, itemFull, style } = this.props;
        const { collapsed } = this.state;
        return (
            <View
                ref={ref => (this.viewRef = ref)}
               
                style={[
                    styles.wrapSwipe,
                    {
                        height: this.SWIPE_HEIGHT,
                        marginTop: MARGIN_TOP
                    },
                    !itemMini && collapsed && { marginBottom: -200 },
                    style
                ]}
            >

                {collapsed ? (
                    itemMini ? (

                        itemMini

                    ) : null
                ) : (
                        null
                    )}
                {  <View
                    style={{
                        backgroundColor: this.props.backgroundColor,
                        height: deviceHeight + 10, width: deviceWidth + 10,
                        zIndex: 1,

                    }}>
                    <View style={{ flexDirection: 'row',width:'100%', justifyContent:'space-between' }}
                        onTouchEnd={() => {
                            console.log("sdpkawspfjep'''''''jjjjjjjjjjjjjjjjjjjjjjj");
                            this.props.closed()

                        }}>
                        <View
 {...this._panResponder.panHandlers}
                            style={[styles.bottomSheet, { height: calcHeight(50), }]}>
                            <TouchableOpacity

                                style={{
                                    paddingLeft: calcWidth(26),
                                    height: calcHeight(80),
                                    //  justifyContent: 'center',
                                    width: calcWidth(80),
                                    //   borderWidth:1

                                }}
                            >
                                <Arrow fill={this.props.backgroundColor == 'white' ? '#1E2B4D' : "white"} height={calcHeight(10.59)} width={calcWidth(19.8)} />
                            </TouchableOpacity>

                        </View>
                        <TouchableOpacity
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: calcHeight(70),
                                width: calcWidth(80),
                            }}
                            onPress={() => {
                                this.props.toaddfavorite()
                            }}>
                            {this.props.checkIsFovorite() ?
                                <RedHeart fill='#FF5050' height={calcHeight(19)} width={calcWidth(21)} /> :
                                <Heart fill={this.props.backgroundColor == 'white' ? '#1E2B4D' : 'white'} height={calcHeight(21.01)} width={calcWidth(23.61)} />}
                        </TouchableOpacity>
                    </View>
                    {itemFull}
                </View>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapSwipe: {

        backgroundColor: '#ccc',
        position: 'absolute',
        bottom: -20,
        left: 0,
        right: 0
    },
    bottomSheet: {
        height: calcHeight(30),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: calcHeight(20),
        width: '80%'
    },
});
