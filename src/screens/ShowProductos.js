import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

import { COLORS, FONTS, SIZES } from "../../constants";

export default function ShowProductos({
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
    <View
      style={[
        {
          flex: 1,
          flexDirection: "column",
          marginTop: 5,
          borderRadius: 30,
          backgroundColor: "#FAFBFD",
          height: 240,
          justifyContent: "center",
          marginHorizontal: SIZES.base,
        },
        styles.recentContainerShadow,
      ]}
    >
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
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Image
            source={item.img}
            resizeMode="contain"
            style={{
              width: 130,
              height: 100,
            }}
          />
        </View>
        <View
          style={{
            flex: 1.5,
            marginLeft: SIZES.radius,
            justifyContent: "center",
          }}
        >
          <Text style={{ color: COLORS.black, ...FONTS.body3 }}>
            {item.name}
          </Text>
          <Text style={{ ...FONTS.h3 }}>{item.price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  trendingShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
  },
  recentContainerShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
});
