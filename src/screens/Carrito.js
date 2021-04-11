import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { COLORS, FONTS, SIZES } from "../../constants";
import AppContext from "../auth/AuthContext";
import { CarItems } from "../components/CarItems";
import { Stripe } from "../components/Stripe";
import { ModalDetail } from "./ModalDetail";

export const Carrito = () => {
  const {
    state: { carrito },
  } = useContext(AppContext);
  const [showAddToBagModal, setShowAddToBagModal] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    let total = 0;

    carrito.forEach((producto) => {
      let { cant, price } = producto;
      total += cant * price;
    });

    setSubTotal(total);
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator style={styles.container}>
      <View>
        <Text
          style={{
            marginTop: SIZES.radius,
            marginHorizontal: SIZES.padding,
            marginRight: 270,
            ...FONTS.largeTitleBold,
          }}
        >
          CARRITO
        </Text>
        <View style={{ flex: 1, paddingBottom: SIZES.padding }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={carrito}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CarItems
                item={item}
                setSelectedItem={setSelectedItem}
                setShowAddToBagModal={setShowAddToBagModal}
                setSubTotal={setSubTotal}
                carrito={carrito}
              />
            )}
          />
        </View>
        <View>
          <Text
            style={{
              marginTop: SIZES.radius,
              marginHorizontal: SIZES.padding,
              ...FONTS.largeTitleBold,
            }}
          >
            Sub Total: <Text style={{ fontSize: 25 }}> ${subTotal}</Text>
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={{
              width: "40%",
              height: 50,
              marginTop: SIZES.base,
              marginLeft: "3%",
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#2EB22A",
            }}
            onPress={() => {
              setShowPayment(true);
            }}
          >
            <Text style={{ color: COLORS.white, ...FONTS.largeTitleBold }}>
              Pagar
            </Text>
          </TouchableOpacity>
        </View>
        {selectedItem && (
          <ModalDetail
            showAddToBagModal={showAddToBagModal}
            setSelectedItem={setSelectedItem}
            bgColor={"#585757"}
            setShowAddToBagModal={setShowAddToBagModal}
            selectedItem={selectedItem}
          />
        )}
        {showPayment && (
          <Stripe
            showPayment={showPayment}
            setShowPayment={setShowPayment}
            monto={subTotal}
          />
        )}
      </View>
    </ScrollView>
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
