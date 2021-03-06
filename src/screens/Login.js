import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Container,
  Button,
  Text,
  H1,
  Input,
  Form,
  Item,
  Toast,
} from "native-base";
import { useNavigation } from "@react-navigation/native";

import globalStyles from "../styles/global";
import { ShowAlert } from "../components/Alert";

export const Login = () => {
  const [email, guardarEmail] = useState("");
  const [password, guardarPassword] = useState("");

  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (email === "" || password === "") {
      ShowAlert({ title: "Error", msj: "Todos los campos son obligatorios" });
    }
  };

  return (
    <Container style={styles.container}>
      <View style={globalStyles.contenido}>
        <H1 style={globalStyles.titulo}>LaPaz</H1>

        <Form>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              autoCompleteType="email"
              placeholder="Email"
              onChangeText={(texto) => guardarEmail(texto)}
              value={email}
            />
          </Item>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={(texto) => guardarPassword(texto)}
            />
          </Item>
        </Form>

        <Button
          square
          block
          style={globalStyles.boton}
          onPress={() => handleSubmit()}
        >
          <Text style={globalStyles.botonTexto}>Iniciar Sesión</Text>
        </Button>

        <Text
          onPress={() => navigation.navigate("signUp")}
          style={globalStyles.enlace}
        >
          Crear Cuenta
        </Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E5DE3",
  },
});
