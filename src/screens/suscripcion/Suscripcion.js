import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import DropDown from "react-native-paper-dropdown";
import AppContext from "../../auth/AuthContext";
import { get, post } from "../../helpers/fetch";
import { Cliente } from "./cliente";
import { Parientes } from "./Parientes";
import { TableParientes } from "./TableParientes";
import { formatDate } from "../../helpers/formatDate";
import { PagoStripe } from "../../components/PagosStripe";
import { ShowAlert } from "../../components/Alert";

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

export const Suscripcion = () => {
  const {
    state: {
      userData: { idEntidad, idUsuario },
    },
  } = useContext(AppContext);
  const [showPago, setShowPago] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [showDropDownEstado, setShowDropDownEstado] = useState(false);
  const [typePlanSelect, setTypePlanSelect] = useState([]);
  const [typePlan, setTypePlan] = useState([]);
  const [getClienteData, setGetClienteData] = useState(initialStateCliente);

  const [getTelefono, setGetTelefono] = useState(initialStateTelefono);

  const [parientes, setParientes] = useState([]);
  const [direccion, setDireccion] = useState([]);
  const [getTypePlan, setGetTypePlan] = useState("");
  const [getStado, setGetStado] = useState("Proceso");
  const [getMonto, setGetMonto] = useState("");
  const [getCuotas, setGetCuotas] = useState("");

  const stados = [
    { label: "Proceso", value: "Proceso" },
    { label: "Aceptada", value: "Aceptada" },
    { label: "Cancelada", value: "Cancelada" },
  ];

  useEffect(() => {
    const fetchTypePlan = async () => {
      await get("typePlan")
        .then((res) => res.json())
        .then(({ data }) => {
          setTypePlan(data);
          const getData = data.map(({ idTipoPlan, tipo }) => ({
            label: tipo,
            value: idTipoPlan,
          }));
          setTypePlanSelect(getData);
        })
        .catch(() => {});
    };
    if (typePlan && !typePlan.length) fetchTypePlan();
  }, []);

  const handleChangeTypePlan = (value) => {
    typePlan.forEach(({ idTipoPlan, monto }) => {
      if (idTipoPlan === value) {
        setGetCuotas(monto.toString());
        setGetMonto((monto * 3).toString());
        return;
      }
    });
    setGetTypePlan(value);
  };

  const handleSave = () => {
    const userData = {};

    Object.assign(
      userData,
      {
        client: {
          ...getClienteData,
          nacimiento: formatDate(getClienteData.nacimiento),
        },
      },
      {
        telefonos: [getTelefono],
      },
      {
        direcciones: direccion,
      },
      {
        parientes: parientes,
      },
      {
        idTipoPlan: getTypePlan,
      },
      {
        monto: parseFloat(getMonto),
      },
      {
        idUsuario,
      },
      {
        getIdEntidad: idEntidad,
      }
    );

    return post("suscripcion/add", userData)
      .then(async (response) => {
        if (response.status === 201) {
          Alert.alert(
            "Correcto!",
            "Se ha suscripto correctamente, su suscripcion quedara en proceso",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
        } else {
          const res = await response.json();
          ShowAlert({ title: "Error", msj: res.message });
        }
      })
      .catch((err) => {
        ShowAlert({
          title: "Error",
          msj: "Verifique que todos los campos esten correctos",
        });
      });
  };

  return (
    <ScrollView showsVerticalScrollIndicator style={styles.container}>
      <View style={styles.containerStyle}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="ios-add-circle" size={30} color="#000" />
          <Text
            style={{
              color: "#000",
              fontSize: 20,
              fontWeight: "bold",
              marginLeft: 5,
            }}
          >
            Suscripcion
          </Text>
        </View>
        <View style={styles.rowStyle}>
          <View style={{ width: "60%" }}>
            <DropDown
              label={"Seleccione su tipo de Plan"}
              mode={"outlined"}
              value={getTypePlan}
              setValue={handleChangeTypePlan}
              list={typePlanSelect}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              inputProps={{
                right: <TextInput.Icon name={"menu-down"} />,
              }}
            />
          </View>
          <View style={{ width: "35%" }}>
            <TextInput
              label="Monto"
              mode={"outlined"}
              value={getMonto}
              disabled={true}
            />
          </View>
        </View>

        <View style={styles.rowStyle}>
          <View style={{ width: "35%" }}>
            <TextInput
              label="Cuotas Mensuales"
              mode={"outlined"}
              value={getCuotas}
              disabled={true}
            />
          </View>
          <View style={{ width: "60%" }}>
            <DropDown
              label={"Seleccione su estado de suscripcion"}
              mode={"outlined"}
              value={getStado}
              setValue={(value) => setGetStado(value)}
              list={stados}
              visible={showDropDownEstado}
              showDropDown={() => setShowDropDownEstado(true)}
              onDismiss={() => setShowDropDownEstado(false)}
              inputProps={{
                right: <TextInput.Icon name={"menu-down"} />,
              }}
            />
          </View>
        </View>
      </View>
      <View style={styles.containerStyle}>
        <Cliente
          getClienteData={getClienteData}
          setGetClienteData={setGetClienteData}
          getTelefono={getTelefono}
          setGetTelefono={setGetTelefono}
          setDireccion={setDireccion}
          direccion={direccion}
        />
      </View>
      <View style={styles.containerStyle}>
        <Parientes setParientes={setParientes} parientes={parientes} />
      </View>
      <View style={styles.containerStyle}>
        <View style={{ width: "100%" }}>
          <TableParientes setParientes={setParientes} parientes={parientes} />
        </View>
      </View>
      <View
        style={{ ...styles.containerStyle, backgroundColor: "transparent" }}
      >
        <View style={{ width: "48%" }}>
          <Button
            style={{ borderRadius: 12, marginRight: 15 }}
            mode="contained"
            color="#000"
            onPress={() => setShowPago(true)}
          >
            Enviar
          </Button>
        </View>
      </View>
      {showPago && (
        <PagoStripe
          setDialog={setShowPago}
          visible={showPago}
          monto={getMonto}
          title="Pagar suscripcion"
          handleSave={handleSave}
          description={`Pago de sucripcion cliente ${getClienteData.nombre} ${getClienteData.apellido}`}
        />
      )}
    </ScrollView>
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
    marginBottom: 20,
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
