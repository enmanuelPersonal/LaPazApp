import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import DropDown from "react-native-paper-dropdown";
import { get } from "../../helpers/fetch";
import { FechaNacimiento } from "../../components/FechaNacimiento";
import { formatDatePariente } from "../../helpers/formatDate";

const initialStatePariente = {
  nombre: "",
  apellido: "",
  sexo: "",
  identidades: { identidad: "", idTipoIdentidad: "" },
  correos: "",
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

export const Parientes = ({ setParientes, parientes }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [showDropDownTele, setShowDropDownTele] = useState(false);
  const [showDropDownGenero, setShowDropDownGenero] = useState(false);
  const [showFechaCliente, setShowFechaCliente] = useState(false);

  const [typeIdentity, setTypeIdentity] = useState([]);
  const [getParientesData, setGetParientesData] = useState(
    initialStatePariente
  );

  const [getTelefono, setGetTelefono] = useState(initialStateTelefono);

  const {
    nombre,
    apellido,
    sexo,
    identidades: { identidad, idTipoIdentidad },
    correos,
    nacimiento,
  } = getParientesData;

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

  const handleChangeParientes = (value, name) => {
    setGetParientesData({ ...getParientesData, [name]: value });
  };

  const handleChangeTelefono = (value, name) => {
    setGetTelefono({ ...getTelefono, [name]: value });
  };

  const handleSave = () => {
    const userData = {};

    Object.assign(
      userData,
      { nombre },
      { apellido },
      { correos: correos ? [correos] : [] },
      {
        telefonos: telefono ? [{ telefono: telefono, tipo }] : [],
      },
      {
        identidades: identidad
          ? {
              identidad: identidad,
              idTipoIdentidad,
            }
          : "",
      },
      { nacimiento: formatDatePariente(nacimiento) },
      { sexo }
    );
    setParientes([...parientes, { ...userData }]);
    handleLimpiar();
  };

  const handleLimpiar = () => {
    setGetParientesData(initialStatePariente);
    setGetTelefono(initialStateTelefono);
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
          Pariente
        </Text>
      </View>
      <View style={styles.rowStyle}>
        <View style={{ width: "48%" }}>
          <TextInput
            label="Nombre"
            mode={"outlined"}
            value={nombre}
            onChangeText={(value) => handleChangeParientes(value, "nombre")}
          />
        </View>
        <View style={{ width: "48%" }}>
          <TextInput
            label="Apellidos"
            mode={"outlined"}
            value={apellido}
            onChangeText={(value) => handleChangeParientes(value, "apellido")}
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
              handleChangeParientes(
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
              handleChangeParientes(
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
          <Button
            color={nacimiento ? "#28AE26" : "#000"}
            style={{ borderRadius: 10 }}
            icon={() => <Fontisto name="date" size={25} color="#fff" />}
            mode="contained"
            onPress={() => setShowFechaCliente(true)}
          >
            Fecha
          </Button>
        </View>
        <View style={{ width: "48%" }}>
          <DropDown
            label="Genero"
            mode={"outlined"}
            value={sexo}
            setValue={(value) => handleChangeParientes(value, "sexo")}
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
          value={correos}
          onChangeText={(value) => handleChangeParientes(value, "correos")}
        />
      </View>
      <View style={styles.rowStyle}>
        <View style={{ width: "48%" }}>
          <Button
            style={{ borderRadius: 12, marginRight: 15 }}
            mode="contained"
            color="#000"
            onPress={handleSave}
          >
            Guardar
          </Button>
        </View>
        <View style={{ width: "48%" }}>
          <Button
            style={{ borderRadius: 12, marginRight: 15 }}
            mode="contained"
            color="#7C7E7C"
            onPress={handleLimpiar}
          >
            Limpiar
          </Button>
        </View>
      </View>
      {showFechaCliente && (
        <FechaNacimiento
          setDialog={setShowFechaCliente}
          visible={showFechaCliente}
          setFecha={setGetParientesData}
          getData={getParientesData}
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
    alignItems: "center",
    marginTop: 10,
  },
  container: {
    backgroundColor: "#DADCDF",
  },
});
