import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Button } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import AppContext from "../../auth/AuthContext";
import { get, post } from "../../helpers/fetch";
import { formatDate } from "../../helpers/formatDate";
import { PagoStripe } from "../../components/PagosStripe";
import { ShowAlert } from "../../components/Alert";

const initialState = {
  statusSuscripcion: "Proceso",
  nombre: "",
  apellido: "",
  tipoPlan: "",
  identidades: { identidad: "", tipo: "" },
  fecha: "",
  cuotas: 0,
  idSuscripcion: "",
};

const initialCompra = {
  numFactura: "",
  total: "",
  status: false,
  createdAt: "",
  detalle: [],
};

export const Perfil = () => {
  const {
    state: {
      userData: { idEntidad },
    },
  } = useContext(AppContext);
  const navigation = useNavigation();
  const [showPago, setShowPago] = useState(false);
  const [suscripcion, setSuscripcion] = useState(initialState);
  const [isSuscrito, setIsSuscrito] = useState(false);
  const [meses, setMeses] = useState("1");
  const [compra, setCompra] = useState(initialCompra);

  const {
    statusSuscripcion,
    nombre,
    apellido,
    tipoPlan,
    identidades: { identidad },
    fecha,
    cuotas,
    idSuscripcion,
  } = suscripcion;

  const { detalle, total, createdAt } = compra;

  useEffect(() => {
    const fetchSuscripcion = async () => {
      await get(`suscripcion/entidad/${idEntidad}`)
        .then((res) => res.json())
        .then(({ data }) => {
          if (data) {
            setSuscripcion(data);
            setIsSuscrito(true);
          }
        })
        .catch(() => {});
    };
    const fetchCompra = async () => {
      await get(`venta/${idEntidad}`)
        .then((res) => res.json())
        .then(({ data }) => {
          if (data.length) {
            setCompra(data[0]);
          }
        })
        .catch(() => {});
    };
    fetchCompra();
    fetchSuscripcion();
  }, []);

  const handleSave = () => {
    const userData = {};
    Object.assign(
      userData,
      { idSuscripcion },
      { monto: parseFloat(parseInt(meses) * cuotas) },
      { meses }
    );

    return post("mensualidad", userData)
      .then(async (response) => {
        if (response.status === 201) {
          ShowAlert({
            title: "Correcto!",
            msj: "Su pago ha sudo procesado correctamente!",
          });
          setShowPago(false);
          navigation.navigate("ruta", { screen: "perfil" });
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
      {isSuscrito ? (
        <View>
          <View style={styles.containerStyle}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="person" size={30} color="#000" />
              <Text
                style={{
                  color: "#000",
                  fontSize: 20,
                  fontWeight: "bold",
                  marginLeft: 5,
                }}
              >
                Perfil
              </Text>
            </View>

            <View style={{ ...styles.rowStyle, marginTop: 20 }}>
              <View style={{ width: "40%" }}>
                <Text style={styles.textHead}>Cliente:</Text>
              </View>
              <View style={{ width: "60%" }}>
                <Text style={styles.textRes}>{`${nombre} ${apellido}`}</Text>
              </View>
            </View>
            <View style={styles.rowStyle}>
              <View style={{ width: "40%" }}>
                <Text style={styles.textHead}>Num. Documento:</Text>
              </View>
              <View style={{ width: "60%" }}>
                <Text style={styles.textRes}>{identidad}</Text>
              </View>
            </View>
            <View style={styles.rowStyle}>
              <View style={{ width: "40%" }}>
                <Text style={styles.textHead}>Estado Suscripcion:</Text>
              </View>
              <View style={{ width: "60%" }}>
                <Text style={styles.textRes}>{statusSuscripcion}</Text>
              </View>
            </View>
            <View style={styles.rowStyle}>
              <View style={{ width: "40%" }}>
                <Text style={styles.textHead}>Fecha Suscripcion:</Text>
              </View>
              <View style={{ width: "60%" }}>
                <Text style={styles.textRes}>{formatDate(fecha)}</Text>
              </View>
            </View>
            <View style={styles.rowStyle}>
              <View style={{ width: "40%" }}>
                <Text style={styles.textHead}>Plan Suscrito:</Text>
              </View>
              <View style={{ width: "60%" }}>
                <Text style={styles.textRes}>{tipoPlan}</Text>
              </View>
            </View>
            <View style={styles.rowStyle}>
              <View style={{ width: "40%" }}>
                <Text style={styles.textHead}>Cuotas Mensuales:</Text>
              </View>
              <View style={{ width: "60%" }}>
                <Text style={styles.textRes}>{cuotas}</Text>
              </View>
            </View>
          </View>
          {statusSuscripcion === "Aceptada" && (
            <View style={styles.containerStyle}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome name="cc-stripe" size={30} color="#000" />
                <Text
                  style={{
                    color: "#000",
                    fontSize: 20,
                    fontWeight: "bold",
                    marginLeft: 5,
                  }}
                >
                  Mensualidad
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                  alignItems: "center",
                }}
              >
                <View style={{ width: "30%" }}>
                  <TextInput
                    label="Meses"
                    mode={"outlined"}
                    value={meses}
                    onChangeText={(value) => setMeses(value)}
                  />
                </View>
                <View style={{ width: "60%" }}>
                  <Button
                    style={{ borderRadius: 12, marginRight: 15 }}
                    mode="contained"
                    color="#000"
                    onPress={() => setShowPago(true)}
                  >
                    Pagar Mensualidad
                  </Button>
                </View>
              </View>
            </View>
          )}

          {detalle.length ? (
            <View style={styles.containerStyle}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Feather name="shopping-cart" size={30} color="#000" />
                <Text
                  style={{
                    color: "#000",
                    fontSize: 20,
                    fontWeight: "bold",
                    marginLeft: 5,
                  }}
                >
                  Compra
                </Text>
              </View>
              <View style={{ ...styles.rowStyle, marginTop: 20 }}>
                <View style={{ width: "40%" }}>
                  <Text style={styles.textHead}>Total:</Text>
                </View>
                <View style={{ width: "60%" }}>
                  <Text style={styles.textRes}>{total} $RD</Text>
                </View>
              </View>
              <View style={{ ...styles.rowStyle }}>
                <View style={{ width: "40%" }}>
                  <Text style={styles.textHead}>Fecha:</Text>
                </View>
                <View style={{ width: "60%" }}>
                  <Text style={styles.textRes}>{formatDate(createdAt)}</Text>
                </View>
              </View>
              <View style={{ ...styles.rowStyle, marginTop: 20 }}>
                <View style={{ width: "60%" }}>
                  <Text style={styles.textHead}>Nombre:</Text>
                </View>
                <View style={{ width: "20%" }}>
                  <Text style={styles.textHead}>cantidad:</Text>
                </View>
                <View style={{ width: "20%" }}>
                  <Text style={styles.textHead}>Precio:</Text>
                </View>
              </View>
              {detalle.map(({ cantidad, precio, nombre }, i) => (
                <View style={{ ...styles.rowStyle }} key={i}>
                  <View style={{ width: "60%" }}>
                    <Text>{nombre}</Text>
                  </View>
                  <View style={{ width: "20%" }}>
                    <Text>{cantidad}</Text>
                  </View>
                  <View style={{ width: "20%" }}>
                    <Text>{precio}</Text>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <Text></Text>
          )}
        </View>
      ) : (
        <View style={styles.containerStyle}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="person" size={30} color="#000" />
            <Text
              style={{
                color: "#000",
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: 5,
              }}
            >
              Perfil
            </Text>
          </View>

          <View style={{ ...styles.rowStyle, marginTop: 20 }}>
            <View style={{ width: "100%" }}>
              <Text style={styles.textHead}>
                Este cliente aun no esta suscrito
              </Text>
            </View>
          </View>
        </View>
      )}
      {showPago && (
        <PagoStripe
          setDialog={setShowPago}
          visible={showPago}
          monto={parseFloat(parseInt(meses) * cuotas)}
          title="Pagar mensualidad"
          subTitulo={`Monto a Pagar: ${parseFloat(
            parseInt(meses) * cuotas
          )} $RD`}
          handleSave={handleSave}
          description={`Pago de mensualidad cliente ${nombre} ${apellido}`}
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
  textHead: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  textRes: {
    color: "#000",
    fontSize: 16,
  },
});
