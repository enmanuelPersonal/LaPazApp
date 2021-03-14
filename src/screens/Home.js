import React, { useState, useContext } from "react";
import { StyleSheet, View, Text, FlatList, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AppContext from "../auth/AuthContext";

import { images, COLORS, FONTS, SIZES } from "../../constants";
import TrendingShoes from "./TrendingShoes";
import { RecentlyViewed } from "./RecentlyViewed";
import { ModalDetail } from "./ModalDetail";
import { post } from "../helpers/fetch";
import { cache } from "../utils/cache";
import { RESET_STATES, USER_LOGOUT } from "../auth/actions";

const Home = () => {
  const navigation = useNavigation();
  const { dispatch } = useContext(AppContext);
  const [showAddToBagModal, setShowAddToBagModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const colors = ["#F7BE5D", "#F75D5D", "#F49A5C", "#804C28", "#F85342"];
  const [trending, setTrending] = useState([
    {
      id: 0,
      name: "Nike Air Zoom Pegasus 36",
      img: images.nikePegasus36,
      bgColor: "#A7ADB1",
      type: "RUNNING",
      price: "$186",
    },
    {
      id: 1,
      name: "Nike Metcon 5",
      img: images.nikeMetcon5Black,
      bgColor: "#A7ADB1",
      type: "TRAINING",
      price: "$135",
    },
    {
      id: 2,
      name: "Nike Air Zoom Kobe 1 Proto",
      img: images.nikeZoomKobe1Proto,
      bgColor: "#A7ADB1",
      type: "BASKETBALL",
      price: "$199",
    },
  ]);

  const [flores, setFlores] = useState([
    {
      id: 0,
      name: "Arreglo full",
      img: images.flor1,
      bgColor: "#A7ADB1",
      type: "FULL",
      price: "$186",
    },
    {
      id: 1,
      name: "Arreglo basico",
      img: images.flor2,
      bgColor: "#A7ADB1",
      type: "BASICO",
      price: "$135",
    },
    {
      id: 2,
      name: "Arreglo intermedio",
      img: images.flor3,
      bgColor: "#A7ADB1",
      type: "INTERMEDIO",
      price: "$199",
    },
  ]);

  const [recentlyViewed, setRecentlyViewed] = useState([
    {
      id: 0,
      name: "Nike Metcon 4",
      img: images.nikeMetcon4,
      bgColor: "#414045",
      type: "TRAINING",
      price: "$119",
      sizes: [6, 7, 8],
    },
    {
      id: 1,
      name: "Nike Metcon 6",
      img: images.nikeMetcon6,
      bgColor: "#4EABA6",
      type: "TRAINING",
      price: "$135",
      sizes: [6, 7, 8, 9, 10, 11],
    },
    {
      id: 2,
      name: "Nike Metcon 5",
      img: images.nikeMetcon5Purple,
      bgColor: "#2B4660",
      type: "TRAINING",
      price: "$124",
      sizes: [6, 7, 8, 9],
    },
  ]);

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
      <View >
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
            data={trending}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <TrendingShoes
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
              data={recentlyViewed}
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
              <TrendingShoes
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
        <View>
          <Text>HOLA</Text>
        </View>
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
