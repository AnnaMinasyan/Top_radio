import {
   
    StyleSheet,

  } from 'react-native';
  import {calcFontSize,calcHeight,calcWidth} from "./dimensions"
  export default  StyleSheet.create({
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

    },
    txtTitle:{
        fontSize:calcFontSize(17),
        fontWeight:'500',
        fontFamily:'Roboto',
        color:'#1E2B4D',
        marginLeft:calcWidth(34)
    },
    stationTexttitle: {
        fontSize:calcFontSize(15),
        color:'#1E2B4D',
        fontWeight:'bold',
        marginBottom:calcHeight(6),
        width:calcWidth(158)
      },
      stationComment:{
    fontSize:calcFontSize(14),
    color:'#B3BACE'
    }
});