import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ToastAndroid,
} from "react-native";
import colors from "../../configs/colors.config";
import { SavedItemProps } from "./interface";
import { useCartStore } from "../../store/useCartStore";
import useWishlistStore from "../../store/useWishlistStore";
import { Trash } from "../../../assets/svg";

const SavedItem: SavedItemProps = ({ product }) => {
  const { cart, addToCart, updateCartItemQuantity } = useCartStore();
  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const removeFromSaved = useWishlistStore((state) => state.removeItem);

  const handleIncrement = () => {
    if (quantity === 0) {
      addToCart(product);
      ToastAndroid.show(
        `${product.name} added to cart successfully`,
        ToastAndroid.SHORT,
      );
    } else {
      updateCartItemQuantity(product.id, quantity + 1);
      ToastAndroid.show(
        `${product.name} quantity increased to ${quantity + 1}`,
        ToastAndroid.SHORT,
      );
    }
  };

  const handleRemoveFromSaved = () => {
    removeFromSaved(product.id);
    ToastAndroid.show(
      `${product.name} removed from wishlist`,
      ToastAndroid.SHORT,
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `https://api.timbu.cloud/images/${product.photos[0].url}`,
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.description} numberOfLines={1}>
          {/* Add a description field to your cart object if not present */}
          {product.description || "Product Description"}
        </Text>
        <TouchableOpacity style={styles.buyNowButton} onPress={handleIncrement}>
          <Text style={styles.buyNowButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity
          onPress={handleRemoveFromSaved}
          style={styles.removeButton}
        >
          <Trash />
        </TouchableOpacity>
        <Text style={styles.price}>
          {quantity === 0
            ? `N ${String(
                (1 * product.current_price[0].NGN[0]).toLocaleString("en-US"),
              )}`
            : `N ${(quantity * product.current_price[0].NGN[0]).toLocaleString(
                "en-US",
              )}`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.secondaryFade,
    marginBottom: 21,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 12,
    lineHeight: 15,
    fontFamily: "Montserrat_600SemiBold",
  },
  description: {
    fontSize: 11,
    fontFamily: "Montserrat_400Regular",
    color: colors.secondary,
  },
  buyNowButton: {
    borderColor: colors.primary,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 11,
    borderRadius: 14,
    marginTop: 8,
    alignSelf: "flex-start",
  },
  buyNowButtonText: {
    color: colors.secondary,
    fontSize: 13,
    fontFamily: "Montserrat_500Medium",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  quantityButton: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  quantityCounter: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 17,
    top: -2,
    alignSelf: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
  quantity: {
    fontSize: 12,
    fontFamily: "Montserrat_500Medium",
    marginHorizontal: 12,
  },
  rightContainer: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  removeButton: {
    padding: 4,
  },
  price: {
    fontSize: 16,
    fontFamily: "Montserrat_500Medium",
  },
});

export default SavedItem;
