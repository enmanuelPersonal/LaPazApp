import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import { COLORS, FONTS, SIZES } from "../../constants";

export const RecentlyViewed = ({
  item,
  setSelectedItem,
  setShowAddToBagModal,
}) => {
  return (
    <TouchableOpacity
      style={{ flex: 1, flexDirection: "row" }}
      onPress={() => {
        setSelectedItem(item);
        setShowAddToBagModal(true);
      }}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
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
        <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>{item.name}</Text>
        <Text style={{ ...FONTS.h3 }}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );
};
