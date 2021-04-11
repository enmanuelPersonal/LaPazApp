import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Footer, FooterTab, Button, Text } from "native-base";

import Icon from "react-native-vector-icons/Entypo";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";

export const Menu = ({ navigation }) => {
  const initState = {
    inicio: false,
    suscripcion: false,
    perfil: false,
    carrito: false,
  };
  const [state, setstate] = useState({ ...initState, inicio: true });

  const Tap = (name) => {
    setstate({ ...initState, [name]: true });
    navigation.navigate(name);
  };

  return (
    <Footer>
      <FooterTab style={{ backgroundColor: "#FAFBFD" }}>
        <Button vertical onPress={() => Tap("inicio")}>
          <Icon
            name="shop"
            size={30}
            color={state.inicio ? "#000" : "#A1A2A3"}
          />
          <Text
            style={[
              styles.text,
              state.inicio ? { color: "#000" } : { color: "#A1A2A3" },
            ]}
          >
            inicio
          </Text>
        </Button>
        <Button vertical onPress={() => Tap("perfil")}>
          <Ionicons
            name="person"
            size={30}
            color={state.perfil ? "#000" : "#A1A2A3"}
          />
          <Text
            style={[
              styles.text,
              state.perfil ? { color: "#000" } : { color: "#A1A2A3" },
            ]}
          >
            perfil
          </Text>
        </Button>
        <Button vertical onPress={() => Tap("suscripcion")}>
          <IconAntDesign
            name="filetext1"
            size={30}
            color={state.suscripcion ? "#000" : "#A1A2A3"}
          />
          <Text
            style={[
              {
                fontWeight: "bold",
                fontSize: 11,
              },
              state.suscripcion ? { color: "#000" } : { color: "#A1A2A3" },
            ]}
          >
            Suscripcion
          </Text>
        </Button>
        <Button vertical onPress={() => Tap("carrito")}>
          <IconAntDesign
            name="shoppingcart"
            size={30}
            color={state.carrito ? "#000" : "#A1A2A3"}
          />
          <Text
            style={[
              styles.text,
              state.carrito ? { color: "#000" } : { color: "#A1A2A3" },
            ]}
          >
            carrito
          </Text>
        </Button>
      </FooterTab>
    </Footer>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    fontSize: 12,
  },
});
