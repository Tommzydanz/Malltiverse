import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ToastAndroid,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ProductItemProps } from "./interface";
import colors from "../../configs/colors.config";
import { StarRating } from "../star-rating/StarRating";
import { useCartStore } from "../../store/useCartStore";
import useWishlistStore from "../../store/useWishlistStore";

const { width: screenWidth } = Dimensions.get("window");
const itemMargin = 22;
const itemsPerRow = 2;
const itemWidth = (screenWidth - itemMargin * (itemsPerRow + 1)) / itemsPerRow;
const ProductItem: ProductItemProps = ({ product, onAddToCart }) => {
  const { cart, addToCart, updateCartItemQuantity } = useCartStore();
  const { addItem, removeItem, products: wishlistItems } = useWishlistStore();
  const [isInWishlist, setIsInWishlist] = useState<boolean>(false);
  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  //increase quantity of product in cart
  const handleIncrement = () => {
    if (quantity === 0) {
      addToCart(product);
      ToastAndroid.show(`${product.name} added to cart`, ToastAndroid.SHORT);
    } else {
      updateCartItemQuantity(product.id, quantity + 1);
      ToastAndroid.show(
        `${product.name} quantity increased to ${quantity + 1}`,
        ToastAndroid.SHORT,
      );
    }
  };

  // decrease quantity of product in cart
  const handleDecrement = () => {
    if (quantity > 0) {
      updateCartItemQuantity(product.id, quantity - 1);
      if (cartItem && cartItem.id) {
        removeFromCart(cartItem.id);
      }
      ToastAndroid.show(
        `${product.name} quantity decreased to ${quantity - 1}`,
        ToastAndroid.SHORT,
      );
    }
  };

  useEffect(() => {
    setIsInWishlist(wishlistItems.some((item) => item.id === product.id));
  }, [wishlistItems, product.id]);

  const handleWishlist = useCallback(() => {
    if (isInWishlist) {
      removeItem(product.id);
      setIsInWishlist(false);
      ToastAndroid.show(
        `${product.name} removed from wishlist`,
        ToastAndroid.SHORT,
      );
    } else {
      addItem(product);
      setIsInWishlist(true);
      ToastAndroid.show(
        `${product.name} added to wishlist`,
        ToastAndroid.SHORT,
      );
    }
  }, [isInWishlist, removeItem, product, addItem]);

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={{
            uri: `https://api.timbu.cloud/images/${product.photos[0].url}`,
          }}
          resizeMode="contain"
        />
        <TouchableOpacity
          style={{ position: "absolute", top: 10, right: 10 }}
          onPress={handleWishlist}
        >
          <MaterialIcons
            name={isInWishlist ? "favorite" : "favorite-outline"}
            size={24}
            color={isInWishlist ? colors.primary : colors.primary}
          />
        </TouchableOpacity>
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
      {quantity === 0 ? (
        <TouchableOpacity style={styles.addButton} onPress={handleIncrement}>
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={handleDecrement}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={handleIncrement}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 185,
    borderRadius: 8,
    paddingRight: 13,
    minHeight: 347,
  },
  imageWrapper: {
    aspectRatio: 1,
    borderRadius: 5,
    backgroundColor: colors.gray500,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: { width: "60%", height: "60%" },
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
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 17,
  },
  quantityButton: {
    borderColor: colors.secondary,
    borderWidth: 1,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    color: colors.secondary,
    fontSize: 18,
    fontFamily: "Montserrat_500Medium",
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontFamily: "Montserrat_500Medium",
  },
});

export default ProductItem;
