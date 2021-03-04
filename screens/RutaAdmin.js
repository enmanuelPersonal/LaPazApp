import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import { Carrito } from "./Carrito";
import { Menu } from "./Menu";

const Stack = createStackNavigator();

export const RutaAdmin = ({ navigation }) => {
  return (
    <>
      <Stack.Navigator
        initialRouteName={"Home"}
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
      </Stack.Navigator>
      <Menu navigation={navigation} />
    </>
  );
};
