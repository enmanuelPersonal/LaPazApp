import React, { useContext } from "react";
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
import globalStyles from "../styles/global";
import AppContext from "../auth/AuthContext";
import { CARRITO } from "../auth/actions";

export const ModalDetail = ({
  showAddToBagModal,
  setSelectedItem,
  setShowAddToBagModal,
  selectedItem,
  bgColor,
}) => {
  const {
    dispatch,
    state: { carrito },
  } = useContext(AppContext);

  const handleAddCar = (value) => {
    dispatch({
      type: CARRITO,
      payload: [
        ...carrito,
        {
          ...value,
          cant: 1,
        },
      ],
    });
    setSelectedItem(null);
    setShowAddToBagModal(false);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showAddToBagModal}
      onRequestClose={() => {
        console.log("cerrado");
      }}
    >
      <BlurView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        blurType="light"
        blurAmount={20}
        reducedTransparencyFallbackColor="white"
      >
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
            {selectedItem.price} $RD
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
                ...globalStyles.boton,
              }}
              onPress={() => {
                setSelectedItem(null);
                setShowAddToBagModal(false);
              }}
            >
              <Text style={globalStyles.botonTexto}>Atras</Text>
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
                backgroundColor: "#E1971E",
              }}
              onPress={() => handleAddCar(selectedItem)}
            >
              <Text style={globalStyles.botonTexto}>Agregar al carrito</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};
