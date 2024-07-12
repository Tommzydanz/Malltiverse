import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ProductItemProps } from "./interface";
import { useNavigation } from "@react-navigation/native";

const ProductItem: ProductItemProps = ({ product }) => {

  const navigation = useNavigation<any>();

  const handlePress = () => {
    navigation.navigate('ProductDetails', { product: product });
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image style={styles.image} source={{uri: `https://api.timbu.cloud/images/${product.photos[0].url}`}} resizeMode="contain" /> 
      <Text style={styles.name} numberOfLines={2}>
        {product.name}
      </Text>
      <Text style={styles.price}>
        ₦ {product.current_price[0].NGN[0].toLocaleString("en-US")}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginBottom: 8,
    borderRadius: 8,
    marginRight: 12,
    width: "48%",
  },
  image: { borderRadius: 8, height: 200, width: "100%" },
  name: {
    fontSize: 13,
    fontWeight: "light",
  },
  price: {
    marginTop: 8,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "orange",
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 40,
    borderRadius: 4,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ProductItem;
