import { Alert } from "react-native";

export const ShowAlert = ({ title, msj }) => {
    console.log(title, msj)
  return Alert.alert(
    title,
    msj,
    [{ text: "OK", onPress: () => console.log("OK Pressed") }],
    { cancelable: false }
  );
};
