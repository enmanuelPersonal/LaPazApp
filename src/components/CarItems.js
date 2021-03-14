import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

import { COLORS, FONTS, SIZES } from "../../constants";

export const CarItems = ({
    item,
    setSelectedItem,
    setShowAddToBagModal,
  }) => {
  return (
    <View
      style={[
        {
          flex: 1,
          flexDirection: "row",
          marginTop: SIZES.padding,
          borderRadius: 30,
          backgroundColor: COLORS.white,
        },
        styles.recentContainerShadow,
      ]}
    >
      <TouchableOpacity
        style={{ flex: 1, flexDirection: "row" }}
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
          <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
            {item.name}
          </Text>
          <Text style={{ ...FONTS.h3 }}>{item.price}</Text>
        </View>
        <View></View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#DADCDF",
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