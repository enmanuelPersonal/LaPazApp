import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import DropDown from "react-native-paper-dropdown";
import { get } from "../../helpers/fetch";
import { Direccion } from "../../components/Direccion";

const initialStateCliente = {
  nombre: "",
  apellido: "",
  sexo: "",
  identidades: { identidad: "", idTipoIdentidad: "" },
  correos: [],
  nacimiento: Date.now(),
};

const initialStateTelefono = {
  telefono: "",
  tipo: "",
};

const genderItems = [
  { value: "M", label: "M" },
  { value: "F", label: "F" },
  { value: "Otro", label: "Otro" },
];

const phoneItems = [
  { value: "casa", label: "Casa" },
  { value: "celular", label: "Celular" },
];

export const Cliente = ({
  setCliente,
  setClientEntidadId,
  setDireccion,
  direccion,
}) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [showDropDownTele, setShowDropDownTele] = useState(false);
  const [showDropDownGenero, setShowDropDownGenero] = useState(false);
  const [showDireccion, setShowDireccion] = useState(false);

  const [typeIdentity, setTypeIdentity] = useState([]);
  const [getClienteData, setGetClienteData] = useState(initialStateCliente);

  const [getTelefono, setGetTelefono] = useState(initialStateTelefono);

  const {
    nombre,
    apellido,
    sexo,
    identidades: { identidad, idTipoIdentidad },
    correos,
    nacimiento,
  } = getClienteData;

  const { telefono, tipo } = getTelefono;

  useEffect(() => {
    const fetchTypeIdentity = async () => {
      await get("typeIdentity")
        .then((res) => res.json())
        .then(({ data }) => {
          const getData = data.map(({ idTipoIdentidad, tipo }) => ({
            label: tipo,
            value: idTipoIdentidad,
          }));

          setTypeIdentity(getData);
        })
        .catch(() => {});
    };
    if (typeIdentity && !typeIdentity.length) fetchTypeIdentity();
  }, []);

  const handleChangeCliente = (value, name) => {
    setGetClienteData({ ...getClienteData, [name]: value });
  };

  const handleChangeTelefono = (value, name) => {
    setGetTelefono({ ...getTelefono, [name]: value });
  };

  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name="person-add" size={30} color="#000" />
        <Text
          style={{
            color: "#000",
            fontSize: 20,
            fontWeight: "bold",
            marginLeft: 5,
          }}
        >
          Cliente
        </Text>
      </View>
      <View style={styles.rowStyle}>
        <View style={{ width: "48%" }}>
          <TextInput
            label="Nombre"
            mode={"outlined"}
            value={nombre}
            onChangeText={(value) => handleChangeCliente(value, "nombre")}
          />
        </View>
        <View style={{ width: "48%" }}>
          <TextInput
            label="Apellidos"
            mode={"outlined"}
            value={apellido}
            onChangeText={(value) => handleChangeCliente(value, "apellido")}
          />
        </View>
      </View>

      <View style={styles.rowStyle}>
        <View style={{ width: "48%" }}>
          <TextInput
            label="Num. Documento"
            mode={"outlined"}
            value={identidad}
            onChangeText={(value) =>
              handleChangeCliente(
                { identidad: value, idTipoIdentidad },
                "identidades"
              )
            }
          />
        </View>
        <View style={{ width: "48%" }}>
          <DropDown
            label="Tipo de Documento"
            mode={"outlined"}
            value={idTipoIdentidad}
            setValue={(value) =>
              handleChangeCliente(
                { identidad, idTipoIdentidad: value },
                "identidades"
              )
            }
            list={typeIdentity}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            inputProps={{
              right: <TextInput.Icon name={"menu-down"} />,
            }}
          />
        </View>
      </View>
      <View style={styles.rowStyle}>
        <View style={{ width: "48%" }}>
          <TextInput
            label="Num. Telefono"
            mode={"outlined"}
            value={telefono}
            onChangeText={(value) => handleChangeTelefono(value, "telefono")}
          />
        </View>
        <View style={{ width: "48%" }}>
          <DropDown
            label="Tipo de Telefono"
            mode={"outlined"}
            value={tipo}
            setValue={(value) => handleChangeTelefono(value, "tipo")}
            list={phoneItems}
            visible={showDropDownTele}
            showDropDown={() => setShowDropDownTele(true)}
            onDismiss={() => setShowDropDownTele(false)}
            inputProps={{
              right: <TextInput.Icon name={"menu-down"} />,
            }}
          />
        </View>
      </View>
      <View style={styles.rowStyle}>
        <View style={{ width: "48%" }}>
          <Text>Aqui va la fecha</Text>
        </View>
        <View style={{ width: "48%" }}>
          <DropDown
            label="Genero"
            mode={"outlined"}
            value={sexo}
            setValue={(value) => handleChangeCliente(value, "sexo")}
            list={genderItems}
            visible={showDropDownGenero}
            showDropDown={() => setShowDropDownGenero(true)}
            onDismiss={() => setShowDropDownGenero(false)}
            inputProps={{
              right: <TextInput.Icon name={"menu-down"} />,
            }}
          />
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        <TextInput
          label="Correo"
          mode={"outlined"}
          value={correos[0]}
          onChangeText={(value) => handleChangeCliente(value, "correos")}
        />
      </View>
      <View style={styles.rowStyle}>
        <View style={{ width: "35%" }}>
          <Button
            color={direccion.length ? "#28AE26" : "#000"}
            style={{ borderRadius: 10 }}
            icon={() => (
              <Ionicons
                name="add-sharp"
                size={30}
                color="#fff"
                style={{ marginLeft: -10, marginRight: -10 }}
              />
            )}
            mode="contained"
            onPress={() => setShowDireccion(true)}
          >
            Direccion
          </Button>
        </View>
      </View>
      {showDireccion && (
        <Direccion
          setDialog={setShowDireccion}
          visible={showDireccion}
          setDireccion={setDireccion}
          direccion={direccion}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "#FAFBFD",
    flexDirection: "column",
    justifyContent: "center",
    padding: "2.5%",
    marginTop: 20,
    marginHorizontal: 2,
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
