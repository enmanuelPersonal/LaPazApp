import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AppContext from "../auth/AuthContext";

import { images, COLORS, FONTS, SIZES } from "../../constants";
import ShowProductos from "./ShowProductos";
import { RecentlyViewed } from "./RecentlyViewed";
import { ModalDetail } from "./ModalDetail";
import { get, post } from "../helpers/fetch";
import { cache } from "../utils/cache";
import { RESET_STATES, USER_LOGOUT } from "../auth/actions";

const Home = () => {
  const navigation = useNavigation();
  const { dispatch } = useContext(AppContext);
  const [showAddToBagModal, setShowAddToBagModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const colors = ["#F7BE5D", "#F75D5D", "#F49A5C", "#804C28", "#F85342"];
  const [ataudes, setAtaudes] = useState([]);
  const [flores, setFlores] = useState([]);
  const [lapidas, setLapidas] = useState([]);

  useEffect(() => {
    const fetchAtaudes = async () => {
      await get(`producto/categoria`)
        .then((res) => res.json())
        .then(({ data }) => {
          const parseData = data.map(
            ({
              idProducto,
              descripcion,
              nombre,
              log: { precio },
              imagenes,
            }) => ({
              id: idProducto,
              name: nombre,
              descripcion,
              img: imagenes[0].url,
              price: precio,
            })
          );
          setAtaudes(parseData);
        })
        .catch(() => {});
    };

    const fetchArreglos = async () => {
      await get(`producto/categoria?categoria=arreglos`)
        .then((res) => res.json())
        .then(({ data }) => {
          const parseData = data.map(
            ({
              idProducto,
              descripcion,
              nombre,
              log: { precio },
              imagenes,
            }) => ({
              id: idProducto,
              name: nombre,
              descripcion,
              img: imagenes[0].url,
              price: precio,
            })
          );
          setFlores(parseData);
        })
        .catch(() => {});
    };

    const fetchLapidas = async () => {
      await get(`producto/categoria?categoria=lapidas`)
        .then((res) => res.json())
        .then(({ data }) => {
          const parseData = data.map(
            ({
              idProducto,
              descripcion,
              nombre,
              log: { precio },
              imagenes,
            }) => ({
              id: idProducto,
              name: nombre,
              descripcion,
              img: imagenes[0].url,
              price: precio,
            })
          );
          setLapidas(parseData);
        })
        .catch(() => {});
    };

    fetchAtaudes();
    fetchLapidas();
    fetchArreglos();
  }, []);

  const handleLogout = async () => {
    post("auth/logout").then(async () => {
      dispatch({ type: USER_LOGOUT });
      dispatch({ type: RESET_STATES });
      await cache.remove("LaPaz_auth_token");
      navigation.navigate("login");
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator style={styles.container}>
      <View>
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <Text
            style={{
              marginTop: SIZES.radius,
              marginHorizontal: SIZES.padding,
              marginRight: 270,
              ...FONTS.largeTitleBold,
            }}
          >
            TIENDA
          </Text>
          <Ionicons name="exit" size={30} color="#000" onPress={handleLogout} />
        </View>

        <View style={{ height: 260, marginTop: SIZES.radius }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={ataudes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <ShowProductos
                item={item}
                index={index}
                bgColor={"#585757"}
                setSelectedItem={setSelectedItem}
                setShowAddToBagModal={setShowAddToBagModal}
              />
            )}
          />
        </View>

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
          <View style={{ flex: 1, paddingBottom: SIZES.padding }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={lapidas}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <RecentlyViewed
                  item={item}
                  setSelectedItem={setSelectedItem}
                  setShowAddToBagModal={setShowAddToBagModal}
                />
              )}
            />
          </View>
        </View>
        <View style={{ height: 260, marginTop: SIZES.radius }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={flores}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <ShowProductos
                item={item}
                index={index}
                bgColor={"#585757"}
                setSelectedItem={setSelectedItem}
                setShowAddToBagModal={setShowAddToBagModal}
              />
            )}
          />
        </View>
        {selectedItem && (
          <ModalDetail
            showAddToBagModal={showAddToBagModal}
            setSelectedItem={setSelectedItem}
            bgColor={"#585757"}
            setShowAddToBagModal={setShowAddToBagModal}
            selectedItem={selectedItem}
          />
        )}
      </View>
    </ScrollView>
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

export default Home;
