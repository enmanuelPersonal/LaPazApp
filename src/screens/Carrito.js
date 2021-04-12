import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { COLORS, FONTS, SIZES } from "../../constants";
import AppContext from "../auth/AuthContext";
import { ShowAlert } from "../components/Alert";
import { CarItems } from "../components/CarItems";
import { ModalDetail } from "./ModalDetail";
import { PagoStripe } from "../components/PagosStripe";

export const Carrito = () => {
  const {
    state: {
      carrito,
      userData: { idEntidad },
    },
  } = useContext(AppContext);
  const navigation = useNavigation();
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

  const handleSave = () => {
    const userData = {};
    console.log("Entro");
    const parseDetalle = carrito.map(({ id, price, cant }) => ({
      idProducto: id,
      cantidad: cant,
      precio: price,
    }));

    Object.assign(
      userData,
      { detalle: parseDetalle },
      { idEntidad },
      { total: subTotal }
    );
    console.log(userData);
    // return post("venta", userData)
    //   .then(async (response) => {
    //     if (response.status === 201) {
    //       ShowAlert({
    //         title: "Correcto!",
    //         msj:
    //           "Compra realizada correctamente!",
    //       });

    //       navigation.navigate("ruta", { screen: "perfil" });
    //     } else {
    //       const res = await response.json();
    //       ShowAlert({ title: "Error", msj: res.message });
    //     }
    //   })
    //   .catch((err) => {
    //     ShowAlert({
    //       title: "Error",
    //       msj: "Verifique que todos este correcto",
    //     });
    //   });
  };

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
            onPress={() => setShowPayment(true)}
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
          <PagoStripe
            setDialog={setShowPayment}
            visible={showPayment}
            monto={subTotal}
            title="Pagar su compra"
            subTitulo={`Monto a Pagar: ${subTotal} $RD`}
            handleSave={handleSave}
            description={`Pago de compra de productos del cliente`}
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
