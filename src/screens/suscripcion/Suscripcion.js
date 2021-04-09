import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import DropDown from "react-native-paper-dropdown";
import AppContext from "../../auth/AuthContext";
import { get } from "../../helpers/fetch";
import { Cliente } from "./cliente";

export const Suscripcion = () => {
  const {
    dispatch,
    state: { userData },
  } = useContext(AppContext);
  const [showDropDown, setShowDropDown] = useState(false);
  const [showDropDownEstado, setShowDropDownEstado] = useState(false);
  const [typePlanSelect, setTypePlanSelect] = useState([]);
  const [typePlan, setTypePlan] = useState([]);

  const [cliente, setCliente] = useState({});
  const [clientEntidadId, setClientEntidadId] = useState("");
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
          setCliente={setCliente}
          setClientEntidadId={setClientEntidadId}
          setDireccion={setDireccion}
          direccion={direccion}
        />
      </View>
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
