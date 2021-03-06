import React, { useEffect, useReducer, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
// import { useNavigation } from "@react-navigation/native";

import { RutaAdmin } from "./src/routes/RutaAdmin";
import { Login } from "./src/screens/Login";
import { SignUp } from "./src/screens/SignUp";
import AppContext from "./src/auth/AuthContext";
import reducer from "./src/auth/authReducer";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent",
  },
};

const initialState = {
  isUserLoggedIn: false,
  userData: undefined,
};

const Stack = createStackNavigator();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  // const navigation = useNavigation();

  useEffect(() => {
    const fetchAuthData = async () => {
      const getUser = await post("auth")
        .then((res) => res.json())
        .catch(() => {
          setLoading(false);
          setLoggedIn(false);
        });

      if (getUser) {
        const { data } = getUser;
        if (data && data.idEntidad) {
          dispatch({
            type: USER_LOGIN,
            payload: data,
          });
          setLoggedIn(true);
        }
      }
      setLoading(false);
    };

    fetchAuthData();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator initialRouteName={"login"}>
          <Stack.Screen
            name="login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="signUp"
            component={SignUp}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ruta"
            component={RutaAdmin}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
        {/* {loggedIn && navigation.navigate("inicio")} */}
      </NavigationContainer>
    </AppContext.Provider>
  );
};

export default () => {
  return <App />;
};
