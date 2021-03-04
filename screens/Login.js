import React from "react";
import { View, Button, Text } from "native-base";

export const Login = ({ navigation }) => {
  return (
    <View>
      <Text>Login</Text>
      <Button
        vertical
        onPress={() => navigation.navigate("ruta", { screen: "Home" })}
      >
        <Text>HOME</Text>
      </Button>
    </View>
  );
};
