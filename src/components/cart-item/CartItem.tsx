import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CartItemProps } from "./interface";

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
    <View style={styles.cartItem}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "flex-start",
        }}
      >
        <Image
          source={cart.photos[0].url[0]}
          style={{
            width: 100,
            height: 100,
            borderRadius: 8,
            justifyContent: "flex-start",
          }}
          resizeMode="contain"
        />
        <Text style={styles.productName} numberOfLines={5} lineBreakMode="clip">
          {cart.name}
        </Text>
        <Text style={styles.priceText}>
          ₦ {(cart.quantity * cart.current_price[0].NGN[0]).toLocaleString("en-US")}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginLeft: 12,
        }}
      >
        <TouchableOpacity
          onPress={() => onRemoveFromCart(cart.id)}
          style={styles.removeButton}
        >
          <Ionicons name="trash-outline" color={"red"} size={24} />
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              cart.quantity === 1 && styles.disabledButton,
            ]}
            onPress={handleDecrement}
            disabled={cart.quantity === 1}
          >
            <AntDesign name="minus" size={18} color="white" />
          </TouchableOpacity>
          <Text style={styles.countText}>{cart.quantity}</Text>
          <TouchableOpacity style={styles.button} onPress={handleIncrement}>
            <AntDesign name="plus" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItem: {
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    lineHeight: 20,
    width: "40%",
    flexWrap: "wrap",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 20,
    flexWrap: "wrap",
  },
  removeButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  removeText: {
    color: "#fc2828",
    fontSize: 16,
  },
  totalContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  checkoutButton: {
    backgroundColor: "orange",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  checkoutButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  button: {
    backgroundColor: "orange",
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  disabledButton: {
    opacity: 0.5,
  },
  countText: {
    fontSize: 18,
  },
});
