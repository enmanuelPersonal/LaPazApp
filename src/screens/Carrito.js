import React, {useState} from "react";
import { StyleSheet, View, Text, FlatList, ScrollView } from "react-native";

import { images, COLORS, FONTS, SIZES } from "../../constants";
import { CarItems } from "../components/CarItems";
import { ModalDetail } from "./ModalDetail";

export const Carrito = () => {
    const [showAddToBagModal, setShowAddToBagModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
  const [recentlyViewed, setRecentlyViewed] = useState([
    {
      id: 0,
      name: "Nike Metcon 4",
      img: images.flor1,
      bgColor: "#414045",
      type: "TRAINING",
      price: "$119",
    },
    {
      id: 1,
      name: "Nike Metcon 6",
      img: images.nikePegasus36,
      bgColor: "#4EABA6",
      type: "TRAINING",
      price: "$135",
    },
    {
      id: 2,
      name: "Nike Metcon 5",
      img: images.flor3,
      bgColor: "#2B4660",
      type: "TRAINING",
      price: "$124",
    },
  ]);

  return (
    <ScrollView showsVerticalScrollIndicator style={styles.container}>
      <View >
        <Text>Carrito</Text>
        <View style={{ flex: 1, paddingBottom: SIZES.padding }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={recentlyViewed}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CarItems
                item={item}
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
