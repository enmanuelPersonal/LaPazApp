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

import { COLORS, FONTS, SIZES } from "../constants";

export const ModalDetail = ({
  showAddToBagModal,
  setSelectedItem,
  setSelectedSize,
  setShowAddToBagModal,
  selectedItem,
  selectedSize,
}) => {
  function showSize() {
    console.log("Hola");
    return selectedItem.sizes.map((item, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={{
            width: 35,
            height: 25,
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 5,
            marginBottom: 10,
            backgroundColor:
              selectedItem.sizes[index] == selectedSize ? COLORS.white : null,
            borderWidth: 1,
            borderColor: COLORS.white,
            borderRadius: 5,
          }}
          onPress={() => {
            setSelectedSize(item);
          }}
        >
          <Text
            style={{
              color:
                selectedItem.sizes[index] == selectedSize
                  ? COLORS.black
                  : COLORS.white,
              ...FONTS.body4,
            }}
          >
            {item}
          </Text>
        </TouchableOpacity>
      );
    });
  }

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
        {/* Button to close modal */}
        <TouchableOpacity
          style={styles.absolute}
          onPress={() => {
            setSelectedItem(null);
            setSelectedSize("");
            setShowAddToBagModal(false);
          }}
        ></TouchableOpacity>

        {/* Modal content */}
        <View
          style={{
            justifyContent: "center",
            width: "85%",
            backgroundColor: selectedItem.bgColor,
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
                transform: [{ rotate: "-15deg" }],
              }}
            />
          </View>
          <Text
            style={{
              marginTop: SIZES.padding,
              marginHorizontal: SIZES.padding,
              color: COLORS.white,
              ...FONTS.body2,
            }}
          >
            {selectedItem.name}
          </Text>
          <Text
            style={{
              marginTop: SIZES.base / 2,
              marginHorizontal: SIZES.padding,
              color: COLORS.white,
              ...FONTS.body3,
            }}
          >
            {selectedItem.type}
          </Text>
          <Text
            style={{
              marginTop: SIZES.radius,
              marginHorizontal: SIZES.padding,
              color: COLORS.white,
              ...FONTS.h1,
            }}
          >
            {selectedItem.price}
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: SIZES.radius,
              marginHorizontal: SIZES.padding,
            }}
          >
            <View>
              <Text style={{ color: COLORS.white, ...FONTS.body3 }}>
                Select size
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexWrap: "wrap",
                flexDirection: "row",
                marginLeft: SIZES.radius,
              }}
            >
              {/* Mostrar los size */}
              {showSize()}
            </View>
          </View>

          <TouchableOpacity
            style={{
              width: "100%",
              height: 70,
              marginTop: SIZES.base,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
            onPress={() => {
              setSelectedItem(null);
              setSelectedSize("");
              setShowAddToBagModal(false);
            }}
          >
            <Text style={{ color: COLORS.white, ...FONTS.largeTitleBold }}>
              Add to Bag
            </Text>
          </TouchableOpacity>
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
