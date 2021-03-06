import React, { useState, useEffect } from "react";
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
  DatePicker,
  Content,
} from "native-base";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import globalStyles from "../styles/global";
import { isValidateForm } from "../helpers/isValidateForm";
import { ShowAlert } from "../components/Alert";

export const SignUp = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [date, setDate] = useState({ date: new Date() });

  // React navigation
  const navigation = useNavigation();

  useEffect(() => {
    register("nombre");
    register("usuario");
    register("password");
    register("CFpassword");
  }, [register]);

  const onDate = (date) => {
    setDate({ date });
  };

  // Cuando el usuario presiona en crear cuenta
  const onSubmit = async (data) => {
    const { nombre, usuario, password, CFoassword } = data;

    if (!isValidateForm(data)) {
      ShowAlert({ title: "Error", msj: "Todos los campos son obligatorios" });
    } else if (password !== CFoassword) {
      ShowAlert({ title: "Error", msj: "las contraseñas deben coincidir" });
    }
  };

  return (
    <Container style={styles.container}>
      <View style={globalStyles.contenido}>
        <H1 style={globalStyles.titulo}>LaPaz</H1>

        <Form>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              placeholder="Nombre"
              name="nombre"
              onChangeText={(text) => setValue("nombre", text)}
            />
          </Item>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              placeholder="Usuario"
              name="usuario"
              onChangeText={(text) => setValue("usuario", text)}
            />
          </Item>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={(text) => setValue("password", text)}
            />
          </Item>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              secureTextEntry={true}
              placeholder="Confirmar Password"
              onChangeText={(text) => setValue("CFpassword", text)}
            />
          </Item>
        </Form>

        <Button
          square
          block
          style={globalStyles.boton}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={globalStyles.botonTexto}>Crear Cuenta</Text>
        </Button>

        <Text
          onPress={() => navigation.navigate("login")}
          style={globalStyles.enlace}
        >
          Iniciar Sesion
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
