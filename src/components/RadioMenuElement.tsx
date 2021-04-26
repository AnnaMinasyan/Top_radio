import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Heart from "../assets/icons/heart.svg";
import SimpleImage from "./SimpleImage";
import RedHeart from "../assets/icons/redHeart.svg";
import global_styles from "../assets/styles/global_styles";
import { IRadioMenuElementProps } from "../Interface";
import { TouchableHighlight } from "react-native-gesture-handler";
import { connect } from "react-redux";

class RadioMenuElement extends React.Component<IRadioMenuElementProps, IState> {
  constructor(props: IRadioMenuElementProps) {
    super(props);
   
  }
  add() {
    this.props.addInFavorite();
  }
  checkIsFovorite(num: number) {
    
    return this.props.favorites.includes(num);
  }
  render() {
    return (
      <View
        style={[
          styles.body,
          {
            backgroundColor: this.props.backColor,
            borderBottomColor:
              this.props.backColor == "white" ? "#F3F4F5" : "#1E2B4D",
          },
        ]}
      >
        <TouchableHighlight
       
          style={{ height: "100%", justifyContent: "center", paddingLeft: 25,backgroundColor: this.props.backColor, }}
        >
          <View style={styles.row}>
            <SimpleImage size={54} image={this.props.image} />

            <Text
              numberOfLines={1}
              style={[
                global_styles.txtTitle,
                {
                  color: this.props.backColor == "white" ? "#1E2B4D" : "white",
                  marginRight: 20,
                  width:150,
                },
              ]}
            >
              {this.props.title}
            </Text>
          </View>
        </TouchableHighlight>
        {this.props.showFavoriteHeart && (
          <TouchableOpacity
            onPress={() => {
              this.add();
            }}
            style={{
              height: 50,
              width: 70,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {this.checkIsFovorite(this.props.id) ? (
              <RedHeart fill="#FF5050" height={19} width={21} />
            ) : (
              <Heart fill="#B3BACE" height={18.54} width={20.83} />
            )}
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
const mapStateToProps = ({
  
  favorites,

}: any) => {
  return {

    favorites,
  
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RadioMenuElement);


const styles = StyleSheet.create({
  body: {
    height: 74,

    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    //paddingLeft:25
  },

  row: {
    flexDirection: "row",
    // justifyContent:'space-between',
    width: "55%",
    alignItems: "center",
  },
});
