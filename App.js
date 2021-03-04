import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

// screens
import { Home } from "./screens/";

import { images, icons, COLORS, FONTS, SIZES } from "./constants";
import { Menu } from "./screens/Menu";
import { Carrito } from "./screens/Carrito";
import { RutaAdmin } from "./screens/RutaAdmin";
import { Login } from "./screens/Login";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent",
  },
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator 
       initialRouteName={"login"}
       >
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        {/* <Stack.Screen
          name="carrito"
          component={Carrito}
          options={{
            title: "Carrito",
            headerTintColor: COLORS.lightGray,
            headerTitleStyle: {
              ...FONTS.navTitle,
              textAlign: "center",
            },
          }}
        /> */}
         <Stack.Screen
          name="ruta"
          component={RutaAdmin}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
      {/* <Menu /> */}
    </NavigationContainer>
  );
};

export default () => {
  return <App />;
};
