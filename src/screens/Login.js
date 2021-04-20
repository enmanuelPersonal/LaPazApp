import React, { useContext, useState, useEffect } from "react";
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
import AppContext from "../auth/AuthContext";
import { post } from "../helpers/fetch";
import { cache } from "../utils/cache";
import { USER_LOGIN } from "../auth/actions";

export const Login = () => {
  const { dispatch, state:{
    isUserLoggedIn
  } } = useContext(AppContext);
  const [usuario, guardarUsuario] = useState("");
  const [password, guardarPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
   if(isUserLoggedIn){
    navigation.navigate("ruta", { screen: "Home" });
   }
  }, [isUserLoggedIn])

  const handleSubmit = async () => {
    const userData = {};
    Object.assign(userData, { usuario }, { password });
    if (usuario === "" || password === "") {
      ShowAlert({ title: "Error", msj: "Todos los campos son obligatorios" });
    } else {
      return post("auth/login", userData)
        .then((response) => {
          switch (response.status) {
            case 200:
              return response.json();
            case 401:
              throw Error("Credenciales inválidas");
            case 404:
              throw Error("Usuario invalido");
            default:
              throw Error("Error en el servidor");
          }
        })
        .then(async ({ login, token, ...payload }) => {
          const { tipoUsuario, idEntidad, nombre, permisos } = payload.data;
          await cache.set("LaPaz_auth_token", token);

          if (!login) {
            ShowAlert({ title: "Error", msj: "No puede iniciar sesion" });
            return;
          } else {
            dispatch({
              type: USER_LOGIN,
              payload: {
                tipoUsuario,
                idEntidad,
                nombre,
                permisos,
              },
            });
            navigation.navigate("ruta", { screen: "Home" });
          }
        })
        .catch((err) => {
          ShowAlert({ title: "Error", msj: err.message });
        });
    }
  };

  return (
    <Container style={styles.container}>
      <View style={globalStyles.contenido}>
        <H1 style={globalStyles.titulo}>LaPaz</H1>

        <Form>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              placeholder="Usuario"
              onChangeText={(texto) => guardarUsuario(texto)}
              value={usuario}
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
