import React, { useEffect, useReducer, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";

import { RutaAdmin } from "./src/routes/RutaAdmin";
import { Login } from "./src/screens/Login";
import { SignUp } from "./src/screens/SignUp";
import AppContext from "./src/auth/AuthContext";
import reducer from "./src/auth/authReducer";
import { post } from "./src/helpers/fetch";
import { USER_LOGIN } from "./src/auth/actions";
// import { version } from "./src/helpers/version";
import { ShowAlert } from "./src/components/Alert";
import { formatDate } from "./src/helpers/formatDate";

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
  carrito: [],
};

const Stack = createStackNavigator();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchAuthData = async () => {
      const getUser = await post("auth")
        .then((res) => res.json())
        .catch(() => {
          setLoading(false);
        });

      if (getUser) {
        const { data } = getUser;
        if (data && data.idEntidad) {
          dispatch({
            type: USER_LOGIN,
            payload: data,
          });
        }
      }
      setLoading(false);
    };

    // const fetchVersion = async () => {
    //   const { value, fecha } = await version();

    //   if (!value) {
    //     ShowAlert({
    //       title: "Nueva version",
    //       msj: `Se ha detectado una nueva version de la app el ${formatDate(
    //         fecha
    //       )}, favor actualizar!`,
    //     });
    //   }
    // };

    // fetchVersion();
    fetchAuthData();
  }, []);

  return (
    <PaperProvider>
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
        </NavigationContainer>
      </AppContext.Provider>
    </PaperProvider>
  );
};

export default () => {
  return <App />;
};
