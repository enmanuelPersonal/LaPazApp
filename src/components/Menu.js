import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Footer, FooterTab, Button, Text } from "native-base";

import Icon from "react-native-vector-icons/Entypo";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconStripe from "react-native-vector-icons/FontAwesome";

export const Menu = ({ navigation }) => {
  const initState = {
    inicio: false,
    inscripcion: false,
    cuotas: false,
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
        <Button vertical onPress={() => Tap("inscripcion")}>
          <IconAntDesign
            name="filetext1"
            size={30}
            color={state.inscripcion ? "#000" : "#A1A2A3"}
          />
          <Text
            style={[
              styles.text,
              state.inscripcion ? { color: "#000" } : { color: "#A1A2A3" },
            ]}
          >
            inscripcion
          </Text>
        </Button>
        <Button vertical onPress={() => Tap("cuotas")}>
          <IconStripe
            name="cc-stripe"
            size={30}
            color={state.cuotas ? "#000" : "#A1A2A3"}
          />
          <Text
            style={[
              styles.text,
              state.cuotas ? { color: "#000" } : { color: "#A1A2A3" },
            ]}
          >
            cuotas
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
