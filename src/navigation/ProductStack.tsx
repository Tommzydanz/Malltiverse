import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OrdersHistory from "../screens/orders-history/OrdersHistory";
import Products from "../screens/product-screen/Products";
import OrderDetails from "../screens/order-details/OrderDetails";
import Wishlist from "../screens/wishlist/Wishlist";

const Stack = createStackNavigator();
const ProductStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProductList" component={Products} />
      <Stack.Screen name="Wishlist" component={Wishlist} />
      <Stack.Screen name="OrdersHistory" component={OrdersHistory} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
    </Stack.Navigator>
  );
};

export default ProductStack;

const styles = StyleSheet.create({});
