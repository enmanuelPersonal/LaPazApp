import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Svg, Polygon } from "react-native-svg";

import { COLORS, FONTS, SIZES } from "../constants";

export default function TrendingShoes({
  item,
  index,
  setSelectedItem,
  setShowAddToBagModal,
}) {
  let trendingStyle = {};

  if (index == 0) {
    trendingStyle = { marginLeft: SIZES.padding };
  }
  return (
    <TouchableOpacity
      style={{
        height: 240,
        width: 180,
        justifyContent: "center",
        marginHorizontal: SIZES.base,
        ...trendingStyle,
      }}
      onPress={() => {
        setSelectedItem(item);
        setShowAddToBagModal(true);
      }}
    >
      <Text style={{ color: COLORS.gray, ...FONTS.h5 }}>{item.type}</Text>

      <View
        style={[{
          flex: 1,
          justifyContent: "flex-end",
          marginTop: SIZES.base,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          marginRight: SIZES.padding,
          paddingLeft: SIZES.radius,
          paddingRight: SIZES.padding,
          paddingBottom: SIZES.radius,
          backgroundColor: item.bgColor,
        }, styles.trendingShadow]}
      >
        <View style={{ height: "35%", justifyContent: "space-between" }}>
          <Text style={{ color: COLORS.white, ...FONTS.body4 }}>
            {item.name}
          </Text>
          <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{item.price}</Text>
        </View>
      </View>

      <View
        style={{
          position: "absolute",
          top: 27,
          right: 0,
          width: "95%",
          height: "100%",
        }}
      >
        <Svg height="100%" width="100%">
          <Polygon points="0,0 160,0 160,80" fill="white" />
        </Svg>
      </View>

      <Image
        source={item.img}
        resizeMode="cover"
        style={{
          position: "absolute",
          top: 50,
          right: 0,
          width: "98%",
          height: 80,
          transform: [{ rotate: "-15deg" }],
        }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  trendingShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65
  },
});
