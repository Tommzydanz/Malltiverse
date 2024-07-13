import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { ProductItemProps } from "./interface";
import colors from "../../configs/colors.config";
import { StarRating } from "../star-rating/StarRating";

const { width } = Dimensions.get("window");
const cardWidth = width / 2 - 24;

const ProductItem: ProductItemProps = ({ product, onAddToCart }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.imageWrapper, { backgroundColor: colors.gray500 }]}>
        <Image
          style={styles.image}
          source={{
            uri: `https://api.timbu.cloud/images/${product.photos[0].url}`,
          }}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {product.name}
      </Text>
      <Text style={styles.desc} numberOfLines={1}>
        {product.description}
      </Text>
      <StarRating rating={product.rating} size={16} />
      <Text style={styles.price}>
        N {product.current_price[0].NGN[0].toLocaleString("en-US") || null}
      </Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => onAddToCart(product)}
      >
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    borderRadius: 8,
    marginRight: 20,
    width: cardWidth,
    minHeight: 347,
  },
  imageWrapper: {
    width: "100%",
    minHeight: 184,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  image: { borderRadius: 8, width: "70%", aspectRatio: 1 },
  name: {
    marginTop: 16,
    fontSize: 12,
    fontFamily: "Montserrat_600SemiBold",
  },
  desc: {
    marginTop: 8,
    fontSize: 12,
    fontFamily: "Montserrat_400Regular",
  },
  price: {
    marginTop: 8,
    fontSize: 13,
    color: colors.primary,
    fontFamily: "Montserrat_500Medium",
  },
  addButton: {
    borderColor: colors.primary,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 11,
    borderRadius: 14,
    marginTop: 17,
    alignSelf: "flex-start",
  },
  addButtonText: {
    color: colors.secondary,
    fontSize: 13,
    fontFamily: "Montserrat_500Medium",
  },
});

export default ProductItem;
