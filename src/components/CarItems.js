import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconEntypo from "react-native-vector-icons/Entypo";

import { COLORS, FONTS, SIZES } from "../../constants";

export const CarItems = ({ item, setSelectedItem, setShowAddToBagModal }) => {
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
          <View style={{flexDirection: "row", alignContent: "center", alignItems: "center"}} >
            <Text style={{ color: COLORS.black, ...FONTS.body3 }}>Cantidad: {item.cant} </Text>
            <IconEntypo
            style={{
              // marginTop: 40,
              marginRight: 20,
              marginLeft: 10,
            }}
            name="circle-with-plus"
            size={30}
            color="#8D8C8B"
            onPress={()=> console.log("object")}
          /> 
          <IconEntypo
          style={{
            // marginTop: 40,
            // marginRight: 20,
          }}
          name="circle-with-minus"
          size={30}
          color="#8D8C8B"
          onPress={()=> console.log("object")}
        />
          </View>
        </View>
        <View>
        <IconAntDesign
            style={{
              marginTop: 40,
              marginRight: 20,
            }}
            name="delete"
            size={30}
            color="#F73720"
            onPress={()=> console.log("object")}
          />
          {/* <TouchableOpacity
            style={{
              width: 50,
              height: 20,
              marginTop: 40,
              marginRight: 20,
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#F73720",
            }}
            onPress={() => {
              // setSelectedItem(null);
              // setShowAddToBagModal(false);
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontFamily: "CarmenSans-SemiBold",
                fontSize: 10,
              }}
            >
              Eliminar
            </Text>
          </TouchableOpacity> */}
        </View>
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
