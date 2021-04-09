import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  Button,
  DataTable,
  Paragraph,
  Dialog,
  Portal,
} from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";

export const TableParientes = ({ setParientes, parientes }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [idDeletePariente, setIdDeletePariente] = useState("");

  const handleDelete = () => {
    const getParientes = parientes.filter((v, i) => i !== idDeletePariente);
    setParientes(getParientes);
    setOpenDialog(false);
  };

  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <FontAwesome name="list-ul" size={30} color="#000" />
        <Text
          style={{
            color: "#000",
            fontSize: 20,
            fontWeight: "bold",
            marginLeft: 5,
          }}
        >
          Tabla de Parientes
        </Text>
      </View>
      {/* <ScrollView horizontal> */}
      <View style={styles.container}>
        <DataTable style={{ marginTop: 10 }}>
          <DataTable.Header style={{ backgroundColor: "#4D4E4D" }}>
            <DataTable.Title>
              <Text style={styles.title}>Nombre</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.title}>Identidad</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.title}>Nacimiento</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.title}>Acciones</Text>
            </DataTable.Title>
          </DataTable.Header>

          {parientes.length ? (
            parientes.map((pariente, index) => {
              const { nombre, apellido, nacimiento, identidades } = pariente;

              return (
                <DataTable.Row
                  key={index}
                  style={
                    index % 2 === 0
                      ? { backgroundColor: "#fff" }
                      : { backgroundColor: "#BCBFBC" }
                  }
                >
                  <DataTable.Cell>{`${nombre} ${apellido}`}</DataTable.Cell>
                  <DataTable.Cell>
                    {console.log(identidades)}
                    {identidades.identidad ? identidades.identidad : ""}
                  </DataTable.Cell>
                  <DataTable.Cell>{nacimiento}</DataTable.Cell>
                  <DataTable.Cell style={{ justifyContent: "center" }}>
                    <AntDesign
                      name="delete"
                      size={20}
                      color="#D3120E"
                      onPress={() => {
                        setIdDeletePariente(index);
                        setOpenDialog(true);
                      }}
                    />
                  </DataTable.Cell>
                </DataTable.Row>
              );
            })
          ) : (
            <DataTable.Row>
              <DataTable.Cell>
                <Text
                  style={{
                    color: "#4D4E4D",
                    fontSize: 16,
                    fontFamily: "Montserrat",
                    fontWeight: "bold",
                  }}
                >
                  No hay Parientes registrados
                </Text>
              </DataTable.Cell>
            </DataTable.Row>
          )}
        </DataTable>
      </View>

      <Portal>
        <Dialog visible={openDialog} onDismiss={() => setOpenDialog(false)}>
          <Dialog.Title>Eliminar Registro</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              {" "}
              Esta seguro que desea eliminar este registro?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleDelete}>Aceptar</Button>
            <Button onPress={() => setOpenDialog(false)}>Cancelar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  title: { color: "#fff", fontWeight: "bold", fontSize: 15 },
});
