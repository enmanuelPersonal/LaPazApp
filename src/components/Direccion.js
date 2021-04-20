import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { TextInput, Dialog, Portal, Button } from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";
import DropDown from "react-native-paper-dropdown";

const initialStateDireccion = {
  pais: "",
  region: "",
  ciudad: "",
  municipio: "",
  sector: "",
  calle: "",
  casa: "",
  referencia: "",
};

const paisItems = [
  { value: "República Dominicana", label: "República Dominicana" },
];

const regionItems = [
  { value: "Norte", label: "Norte" },
  { value: "Sur", label: "Sur" },
  { value: "Este", label: "Este" },
];

const ciudadItems = [{ value: "Santiago", label: "Santiago" }];

const municipioItems = [{ value: "Punal", label: "Punal" }];
const sectorItems = [{ value: "Laguna Prieta", label: "Laguna Prieta" }];
const calleItems = [
  { value: "Los estrellas", label: "Los estrellas" },
  { value: "Los filpos", label: "Los filpos" },
];

export const Direccion = ({
  setDialog,
  setDireccion,
  visible,
  direccion = [],
}) => {
  const [getDireccion, setGetDireccion] = useState(initialStateDireccion);
  const [showDropDownPais, setShowDropDownPais] = useState(false);
  const [showDropDownRegion, setShowDropDownRegion] = useState(false);
  const [showDropDownCiudad, setShowDropDownCiudad] = useState(false);
  const [showDropDownMunicipio, setShowDropDownMunicipio] = useState(false);
  const [showDropDownSector, setShowDropDownSector] = useState(false);
  const [showDropDownCalle, setShowDropDownCalle] = useState(false);

  const {
    pais,
    region,
    ciudad,
    municipio,
    sector,
    calle,
    casa,
    referencia,
  } = getDireccion;

  useEffect(() => {
    if (direccion.length) {
      setGetDireccion(direccion[0]);
    }
  }, []);

  const handleChange = (value, name) => {
    setGetDireccion({ ...getDireccion, [name]: value });
  };

  const handleSave = () => {
    setDireccion([getDireccion]);
    setDialog(false);
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={() => setDialog(false)}>
        <Dialog.ScrollArea>
          <ScrollView contentContainerStyle={{ paddingHorizontal: 0 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", marginVertical: 5 }}
              >
                Registrar Direccion
              </Text>
              <Feather
                name="delete"
                size={30}
                color="#E51717"
                style={{ marginLeft: "39%" }}
                onPress={() => setDialog(false)}
              />
            </View>
            <View style={styles.rowStyle}>
              <View style={{ width: "48%" }}>
                <DropDown
                  label="Pais"
                  mode={"outlined"}
                  value={pais}
                  setValue={(value) => handleChange(value, "pais")}
                  list={paisItems}
                  visible={showDropDownPais}
                  showDropDown={() => setShowDropDownPais(true)}
                  onDismiss={() => setShowDropDownPais(false)}
                  inputProps={{
                    right: <TextInput.Icon name={"menu-down"} />,
                  }}
                />
              </View>
              <View style={{ width: "48%" }}>
                <DropDown
                  label="Region"
                  mode={"outlined"}
                  value={region}
                  setValue={(value) => handleChange(value, "region")}
                  list={regionItems}
                  visible={showDropDownRegion}
                  showDropDown={() => setShowDropDownRegion(true)}
                  onDismiss={() => setShowDropDownRegion(false)}
                  inputProps={{
                    right: <TextInput.Icon name={"menu-down"} />,
                  }}
                />
              </View>
            </View>
            <View style={styles.rowStyle}>
              <View style={{ width: "48%" }}>
                <DropDown
                  label="Ciudad"
                  mode={"outlined"}
                  value={ciudad}
                  setValue={(value) => handleChange(value, "ciudad")}
                  list={ciudadItems}
                  visible={showDropDownCiudad}
                  showDropDown={() => setShowDropDownCiudad(true)}
                  onDismiss={() => setShowDropDownCiudad(false)}
                  inputProps={{
                    right: <TextInput.Icon name={"menu-down"} />,
                  }}
                />
              </View>
              <View style={{ width: "48%" }}>
                <DropDown
                  label="Municipio"
                  mode={"outlined"}
                  value={municipio}
                  setValue={(value) => handleChange(value, "municipio")}
                  list={municipioItems}
                  visible={showDropDownMunicipio}
                  showDropDown={() => setShowDropDownMunicipio(true)}
                  onDismiss={() => setShowDropDownMunicipio(false)}
                  inputProps={{
                    right: <TextInput.Icon name={"menu-down"} />,
                  }}
                />
              </View>
            </View>
            <View style={styles.rowStyle}>
              <View style={{ width: "48%" }}>
                <DropDown
                  label="Sector"
                  mode={"outlined"}
                  value={sector}
                  setValue={(value) => handleChange(value, "sector")}
                  list={sectorItems}
                  visible={showDropDownSector}
                  showDropDown={() => setShowDropDownSector(true)}
                  onDismiss={() => setShowDropDownSector(false)}
                  inputProps={{
                    right: <TextInput.Icon name={"menu-down"} />,
                  }}
                />
              </View>
              <View style={{ width: "48%" }}>
                <DropDown
                  label="Calle"
                  mode={"outlined"}
                  value={calle}
                  setValue={(value) => handleChange(value, "calle")}
                  list={calleItems}
                  visible={showDropDownCalle}
                  showDropDown={() => setShowDropDownCalle(true)}
                  onDismiss={() => setShowDropDownCalle(false)}
                  inputProps={{
                    right: <TextInput.Icon name={"menu-down"} />,
                  }}
                />
              </View>
            </View>
            <View style={styles.rowStyle}>
              <View style={{ width: "48%" }}>
                <TextInput
                  label="Num. casa"
                  mode={"outlined"}
                  value={casa}
                  onChangeText={(value) => handleChange(value, "casa")}
                />
              </View>
              <View style={{ width: "48%" }}>
                <TextInput
                  label="referencia"
                  mode={"outlined"}
                  value={referencia}
                  onChangeText={(value) => handleChange(value, "referencia")}
                />
              </View>
            </View>
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button
            style={{ borderRadius: 12, marginRight: 15 }}
            mode="contained"
            color="#000"
            onPress={handleSave}
          >
            Guardar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "#FAFBFD",
    flexDirection: "column",
    justifyContent: "center",
    padding: "2.5%",
    marginTop: 20,
    borderRadius: 10,
    flex: 1,
  },
  rowStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  container: {
    backgroundColor: "#DADCDF",
  },
});
