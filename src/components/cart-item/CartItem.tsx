import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ToastAndroid,
} from "react-native";
import { CartItemProps } from "./interface";
import colors from "../../configs/colors.config";
import { Trash } from "../../../assets/svg";

const CartItem: CartItemProps = ({
  cart,
  onRemoveFromCart,
  onUpdateQuantity,
}) => {
  const handleIncrement = () => {
    onUpdateQuantity(cart.id, cart.quantity + 1);
  };

  const handleDecrement = () => {
    if (cart.quantity > 1) {
      onUpdateQuantity(cart.id, cart.quantity - 1);
    } else {
      onRemoveFromCart(cart.id);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `https://api.timbu.cloud/images/${cart.photos[0].url}`,
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.name} numberOfLines={2}>
          {cart.name}
        </Text>
        <Text style={styles.description} numberOfLines={1}>
          {/* Add a description field to your cart object if not present */}
          {cart.description || "Product Description"}
        </Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={[
              styles.quantityButton,
              cart.quantity === 1 && styles.disabledButton,
            ]}
            onPress={handleDecrement}
            disabled={cart.quantity === 1}
          >
            <Text style={styles.quantityCounter}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{cart.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={handleIncrement}
          >
            <Text style={styles.quantityCounter}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity
          onPress={() => {
            onRemoveFromCart(cart.id);
            ToastAndroid.show(
              cart.name + " removed from cart successfully",
              ToastAndroid.SHORT,
            );
          }}
          style={styles.removeButton}
        >
          <Trash />
        </TouchableOpacity>
        <Text style={styles.price}>
          N{" "}
          {(cart.quantity * cart.current_price[0].NGN[0]).toLocaleString(
            "en-US",
          )}
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
  quantityContainer: {
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

export default CartItem;
