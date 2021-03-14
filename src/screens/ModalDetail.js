import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { BlurView } from "@react-native-community/blur";

import { COLORS, FONTS, SIZES } from "../../constants";

export const ModalDetail = ({
  showAddToBagModal,
  setSelectedItem,
  setShowAddToBagModal,
  selectedItem,
  bgColor,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showAddToBagModal}
      onRequestClose={() => {
        // Alert.alert("Modal has been closed.");
        console.log("cerrado");
      }}
    >
      <BlurView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        blurType="light"
        blurAmount={20}
        reducedTransparencyFallbackColor="white"
      >
        {/* Modal content */}
        <View
          style={{
            justifyContent: "center",
            width: "85%",
            backgroundColor: "#DADCDF",
            height: "100%",
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={selectedItem.img}
              resizeMode="contain"
              style={{
                width: "90%",
                height: 170,
              }}
            />
          </View>
          <Text
            style={{
              marginTop: SIZES.padding,
              marginHorizontal: SIZES.padding,
              color: COLORS.black,
              ...FONTS.body2,
            }}
          >
            {selectedItem.name}
          </Text>
          <Text
            style={{
              marginTop: SIZES.base / 2,
              marginHorizontal: SIZES.padding,
              color: COLORS.black,
              ...FONTS.body3,
            }}
          >
            {selectedItem.type}
          </Text>
          <Text
            style={{
              marginTop: SIZES.radius,
              marginHorizontal: SIZES.padding,
              color: COLORS.black,
              ...FONTS.h1,
            }}
          >
            {selectedItem.price}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                width: "40%",
                height: 50,
                marginTop: SIZES.base,
                marginLeft: "3%",
                borderRadius: 50,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
              onPress={() => {
                setSelectedItem(null);
                setShowAddToBagModal(false);
              }}
            >
              <Text style={{ color: COLORS.white, ...FONTS.largeTitleBold }}>
                Atras
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "60%",
                height: 50,
                marginTop: SIZES.base,
                marginLeft: "10%",
                borderRadius: 50,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#E29F34",
              }}
              onPress={() => {
                setSelectedItem(null);
                setShowAddToBagModal(false);
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  fontFamily: "CarmenSans-SemiBold",
                  fontSize: 20,
                }}
              >
                Agregar al carrito
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
