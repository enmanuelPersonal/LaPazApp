import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";

import { images, COLORS, FONTS, SIZES } from "../constants";
import TrendingShoes from "./TrendingShoes";
import { RecentlyViewed } from "./RecentlyViewed";
import { ModalDetail } from "./ModalDetail";

const Home = () => {
  const [showAddToBagModal, setShowAddToBagModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  const [trending, setTrending] = useState([
    {
      id: 0,
      name: "Nike Air Zoom Pegasus 36",
      img: images.nikePegasus36,
      bgColor: "#BF012C",
      type: "RUNNING",
      price: "$186",
      sizes: [6, 7, 8, 9, 10],
    },
    {
      id: 1,
      name: "Nike Metcon 5",
      img: images.nikeMetcon5Black,
      bgColor: "#D39C67",
      type: "TRAINING",
      price: "$135",
      sizes: [6, 7, 8, 9, 10, 11, 12],
    },
    {
      id: 2,
      name: "Nike Air Zoom Kobe 1 Proto",
      img: images.nikeZoomKobe1Proto,
      bgColor: "#7052A0",
      type: "BASKETBALL",
      price: "$199",
      sizes: [6, 7, 8, 9],
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
    {
      id: 3,
      name: "Nike Metcon 3",
      img: images.nikeMetcon3,
      bgColor: "#A69285",
      type: "TRAINING",
      price: "$99",
      sizes: [6, 7, 8, 9, 10, 11, 12, 13],
    },
    {
      id: 4,
      name: "Nike Metcon Free",
      img: images.nikeMetconFree,
      bgColor: "#A02E41",
      type: "TRAINING",
      price: "$108",
      sizes: [6, 7, 8, 9, 10, 11],
    },
  ]);

  return (
    <View style={styles.container}>
      <Text
        style={{
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.padding,
          ...FONTS.largeTitleBold,
        }}
      >
        TRENDING
      </Text>

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
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
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
      {selectedItem && (
        <ModalDetail
          showAddToBagModal={showAddToBagModal}
          setSelectedItem={setSelectedItem}
          setSelectedSize={setSelectedSize}
          setShowAddToBagModal={setShowAddToBagModal}
          selectedItem={selectedItem}
          selectedSize={selectedSize}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  recentContainerShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
});

export default Home;
