import React, { useMemo } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import CartItem from "../../components/cart-item/CartItem";
import { ICartItem } from "../../components/cart-item/interface";
import colors from "../../configs/colors.config";
import { ShoppingSummary } from "../../components/shopping-summary/ShoppingSummary";
import { useCartStore } from "../../store/useCartStore";
import { useNavigation } from "@react-navigation/native";

const Cart: React.FC = () => {
  const navigation = useNavigation<any>();
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateCartItemQuantity = useCartStore(
    (state) => state.updateCartItemQuantity,
  );
  const clearCart = useCartStore((state) => state.clearCart);

  // total price of items in a cart
  const total = useMemo(() => {
    if (!cart || cart.length === 0) {
      return 0;
    }
    return cart.reduce(
      (sum, item) => sum + item.current_price[0].NGN[0] * item.quantity,
      0,
    );
  }, [cart]);

  console.log(cart.length, cart);

  /**
   * Handles the checkout process
   * Clears the cart and navigates to the OrderSuccess screen
   */
  const handleCheckout = () => {
    navigation.navigate("CheckoutMain");
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <View style={styles.emptyCartContainer}>
        <Text style={styles.emptyCartText}>No Item in Cart</Text>
      </View>
    );
  }

  const renderFooter = () => (
    <View style={styles.summaryContainer}>
      <ShoppingSummary
        subTotal={total}
        onCheckout={handleCheckout}
        onApplyDiscount={() => {}}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CartItem
            cart={item}
            onRemoveFromCart={removeFromCart}
            onUpdateQuantity={updateCartItemQuantity}
          />
        )}
        keyExtractor={(item) => item.id}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 22,
  },
  cartItem: {
    marginBottom: 8,
  },
  removeButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  summaryContainer: {
    flex: 1,
    marginBottom: 120,
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
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.whiteFade,
  },
  emptyCartText: {
    fontSize: 24,
    fontFamily: "Montserrat_500Medium",
    color: colors.secondary,
  },
});

export default Cart;
