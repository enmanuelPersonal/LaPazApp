import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../../src/screens/Home";
import { Carrito } from "../../src/screens/Carrito";
import { Menu } from "../components/Menu";
import { Suscripcion } from "../screens/suscripcion/Suscripcion";
import { Perfil } from "../screens/Perfil/Perfil";

const Stack = createStackNavigator();

export const RutaAdmin = ({ navigation }) => {
  return (
    <>
      <Stack.Navigator
        initialRouteName={"inicio"}
        screenOptions={{
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
            textTransform: "uppercase",
          },
        }}
      >
        <Stack.Screen
          name="inicio"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="carrito"
          component={Carrito}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="suscripcion"
          component={Suscripcion}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="perfil"
          component={Perfil}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
      <Menu navigation={navigation} />
    </>
  );
};
