import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { TextInput, Dialog, Portal, Button } from "react-native-paper";
import { Container, H1, Input, Form, Item, Toast } from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

import { COLORS, FONTS, SIZES, images } from "../../constants";
import globalStyles from "../styles/global";
import { post } from "../helpers/fetch";
import { ShowAlert } from "./Alert";

const initialState = {
  number: "",
  exp_month: "",
  exp_year: "",
  cvc: "",
};

export const PagoStripe = ({
  setDialog,
  monto = 0,
  visible,
  title,
  handleSave,
  description,
  subTitulo,
}) => {
  const [tarjeta, setTarjeta] = useState(initialState);
  const { number, exp_month, exp_year, cvc } = tarjeta;

  useEffect(() => {}, []);

  const handleChange = (value, name) => {
    setTarjeta({ ...tarjeta, [name]: value });
  };

  const handleSaveTarjeta = async () => {
    const userData = {};

    Object.assign(
      userData,
      { amount: parseFloat(monto) },
      { number },
      { exp_month: parseInt(exp_month) },
      { exp_year: parseInt(exp_year) },
      { cvc },
      { description }
    );

    const { data, mensaje } = await post("pagosApp/add", userData).then((res) =>
      res.json()
    );

    if (data) {
      handleSave();
    } else {
      ShowAlert({ title: "Error", msj: mensaje });
    }
  };

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={() => setDialog(false)}
        style={{ backgroundColor: "#DADCDF" }}
      >
        <Dialog.ScrollArea>
          <ScrollView contentContainerStyle={{ paddingHorizontal: 0 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome
                name="cc-stripe"
                size={30}
                color="#000"
                style={{ marginRight: 5 }}
                onPress={() => setDialog(false)}
              />
              <Text
                style={{ fontSize: 20, fontWeight: "bold", marginVertical: 5 }}
              >
                {title}
              </Text>
              <Feather
                name="delete"
                size={30}
                color="#E51717"
                style={{ marginLeft: "27%" }}
                onPress={() => setDialog(false)}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <Text style={{ fontSize: 16, textAlign: "center" }}>
                {subTitulo}
              </Text>
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
                      style={[styles.input, { width: "70%", marginRight: 20 }]}
                    >
                      <Input
                        placeholder="Numero Tarjeta"
                        value={number}
                        onChangeText={(value) => handleChange(value, "number")}
                      />
                    </Item>
                    <Item
                      inlineLabel
                      last
                      style={[styles.input, { width: "25%" }]}
                    >
                      <Input
                        // secureTextEntry={true}
                        placeholder="CVC"
                        value={cvc}
                        onChangeText={(value) => handleChange(value, "cvc")}
                      />
                    </Item>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Item
                      inlineLabel
                      last
                      style={[styles.input, { width: "30%", marginRight: 2 }]}
                    >
                      <Input
                        // secureTextEntry={true}
                        placeholder="Mes"
                        value={exp_month}
                        onChangeText={(value) =>
                          handleChange(value, "exp_month")
                        }
                      />
                    </Item>
                    <Item
                      inlineLabel
                      last
                      style={[styles.input, { width: "30%", marginRight: 20 }]}
                    >
                      <Input
                        // secureTextEntry={true}
                        placeholder="Año"
                        value={exp_year}
                        onChangeText={(value) =>
                          handleChange(value, "exp_year")
                        }
                      />
                    </Item>
                  </View>
                </Form>
              </View>
            </View>
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button
            style={{ borderRadius: 12, marginRight: 15, marginVertical: 6 }}
            mode="contained"
            color="#000"
            onPress={handleSaveTarjeta}
          >
            Completar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "#FAFBFD",
    flexDirection: "column",
    justifyContent: "center",
    padding: "2.5%",
    marginTop: 20,
    borderRadius: 10,
    flex: 1,
  },
  rowStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
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
