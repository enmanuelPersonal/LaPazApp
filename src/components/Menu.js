import React, { useState } from "react";
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
      <FooterTab style={{ backgroundColor: "#1E5DE3" }}>
        <Button vertical onPress={() => Tap("inicio")}>
          <Icon name="shop" size={30} color={state.inicio ? "#000" : "#fff"} />
          <Text>inicio</Text>
        </Button>
        <Button vertical onPress={() => Tap("inscripcion")}>
          <IconAntDesign
            name="filetext1"
            size={30}
            color={state.inscripcion ? "#000" : "#fff"}
          />
          <Text>inscripcion</Text>
        </Button>
        <Button vertical onPress={() => Tap("cuotas")}>
          <IconStripe
            name="cc-stripe"
            size={30}
            color={state.cuotas ? "#000" : "#fff"}
          />
          <Text>cuotas</Text>
        </Button>
        <Button vertical onPress={() => Tap("carrito")}>
          <IconAntDesign
            name="shoppingcart"
            size={30}
            color={state.carrito ? "#000" : "#fff"}
          />
          <Text>carrito</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
};
