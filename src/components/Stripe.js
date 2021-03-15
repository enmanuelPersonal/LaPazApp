import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Container, Button, H1, Input, Form, Item, Toast } from "native-base";
import { BlurView } from "@react-native-community/blur";
import IconAntDesign from "react-native-vector-icons/AntDesign";

import { COLORS, FONTS, SIZES, images } from "../../constants";
import globalStyles from "../styles/global";

export const Stripe = ({ showPayment, setShowPayment, monto }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showPayment}
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
          <View style={{ alignItems: "center" }}>
            <Image
              source={images.pago}
              resizeMode="contain"
              style={{
                width: "70%",
                height: 130,
              }}
            />
          </View>

          <View style={styles.contenido}>
            <Form>
              <View style={{ flexDirection: "row" }}>
                <Item
                  inlineLabel
                  last
                  style={[styles.input, { width: "90%", marginRight: 20 }]}
                >
                  <Input
                    placeholder="Numero Tarjeta"
                    // onChangeText={(texto) => guardarUsuario(texto)}
                    // value={usuario}
                  />
                </Item>
                <Item inlineLabel last style={[styles.input, { width: "22%" }]}>
                  <Input
                    secureTextEntry={true}
                    placeholder="CVC"
                    // onChangeText={(texto) => guardarPassword(texto)}
                  />
                </Item>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Item
                  inlineLabel
                  last
                  style={[styles.input, { width: "56%", marginRight: 20 }]}
                >
                  <Input
                    secureTextEntry={true}
                    placeholder="Fecha"
                    // onChangeText={(texto) => guardarPassword(texto)}
                  />
                </Item>
                <Item
                  inlineLabel
                  last
                  style={[styles.input, { width: "56%", marginRight: 10 }]}
                >
                  <Input
                    secureTextEntry={true}
                    placeholder="Codigo Postal"
                    // onChangeText={(texto) => guardarPassword(texto)}
                  />
                </Item>
              </View>
            </Form>

            {/* <Text
                onPress={() => navigation.navigate("signUp")}
                style={styles.enlace}
              >
                Crear Cuenta
              </Text> */}
          </View>
          {/* </Container> */}
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
                setShowPayment(false);
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
                backgroundColor: "#2EB22A",
              }}
              onPress={() => {
                setShowPayment(false);
              }}
            >
              <Text style={globalStyles.botonTexto}>Realizar pago</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E5DE3",
  },
  contenido: {
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: "2.5%",
    // flex: 1
  },
  input: {
    backgroundColor: "#FFF",
    marginBottom: 20,
    borderRadius: 10,
  },
  boton: {
    backgroundColor: "#28303B",
    borderRadius: 50,
  },
  botonTexto: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#FFF",
  },
});
