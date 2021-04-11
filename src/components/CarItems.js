import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Button, Paragraph, Dialog, Portal } from "react-native-paper";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconEntypo from "react-native-vector-icons/Entypo";

import { COLORS, FONTS, SIZES } from "../../constants";
import { CARRITO } from "../auth/actions";
import AppContext from "../auth/AuthContext";

export const CarItems = ({
  item,
  setSelectedItem,
  setShowAddToBagModal,
  setSubTotal,
  carrito,
}) => {
  const { dispatch } = useContext(AppContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [idDeleteProducto, setIdDeleteProducto] = useState("");

  const handleChangeCantidad = (cantidad, value) => {
    let total = 0;

    const getCarrito = carrito.map((producto) => {
      let { id, cant, price } = producto;

      if (id === value.id) {
        cant += cantidad;
        if (cant < 1) {
          cant = 1;
        }
      }

      total += cant * price;

      return {
        ...producto,
        cant,
      };
    });

    setSubTotal(total);
    dispatch({ type: CARRITO, payload: getCarrito });
  };

  const handleDelete = () => {
    let total = 0;
    const getCarrito = carrito.filter(({ id, cant, price }) => {
      if (id !== idDeleteProducto) {
        total += cant * price;
      }
      return id !== idDeleteProducto;
    });

    setSubTotal(total);
    dispatch({ type: CARRITO, payload: getCarrito });
  };

  return (
    <View
      style={[
        {
          flex: 1,
          flexDirection: "row",
          marginTop: SIZES.padding,
          borderRadius: 30,
          backgroundColor: COLORS.white,
        },
        styles.recentContainerShadow,
      ]}
    >
      <TouchableOpacity
        style={{ flex: 1, flexDirection: "row" }}
        onPress={() => {
          setSelectedItem(item);
          setShowAddToBagModal(true);
        }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Image
            source={item.img}
            resizeMode="contain"
            style={{
              width: 130,
              height: 100,
            }}
          />
        </View>
        <View
          style={{
            flex: 1.5,
            marginLeft: SIZES.radius,
            justifyContent: "center",
          }}
        >
          <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
            {item.name}
          </Text>
          <Text style={{ ...FONTS.h3 }}>{item.price} $RD</Text>
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: COLORS.black, ...FONTS.body3 }}>
              Cantidad: {item.cant}{" "}
            </Text>
            <IconEntypo
              style={{
                marginRight: 20,
                marginLeft: 10,
              }}
              name="circle-with-plus"
              size={30}
              color="#8D8C8B"
              onPress={() => handleChangeCantidad(1, item)}
            />
            <IconEntypo
              name="circle-with-minus"
              size={30}
              color="#8D8C8B"
              onPress={() => handleChangeCantidad(-1, item)}
            />
          </View>
        </View>
        <View>
          <IconAntDesign
            style={{
              marginTop: 40,
              marginRight: 20,
            }}
            name="delete"
            size={30}
            color="#F73720"
            onPress={() => {
              setIdDeleteProducto(item.id);
              setOpenDialog(true);
            }}
          />
        </View>
      </TouchableOpacity>
      <Portal>
        <Dialog visible={openDialog} onDismiss={() => setOpenDialog(false)}>
          <Dialog.Title>Eliminar Producto</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              {" "}
              Esta seguro que desea eliminar este producto del carrito?
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
  container: {
    flex: 1,
    backgroundColor: "#DADCDF",
  },
  recentContainerShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
});
