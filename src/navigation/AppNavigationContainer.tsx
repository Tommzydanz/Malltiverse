import { StyleSheet, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Products from "../screens/product-screen/Products";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useCallback, useMemo, useState } from "react";
import colors from "../configs/colors.config";
import { CartIcon, CheckoutIcon, Home } from "../../assets/svg";
import Cart from "../screens/cart/Cart";
import { ICartItem } from "../components/cart-item/interface";
import CheckoutStack from "./CheckoutStack";
import { Product } from "../api/products";

const Tab = createBottomTabNavigator();

const AppNavigationContainer: React.FC = function AppNavigationContainer() {
  // State to hold the current items in the cart
  const [cart, setCart] = useState<ICartItem[]>([]);

  /**
   * Adds a product to the cart or increments its quantity if already present
   * @param product The product to be added to the cart
   */
  const addToCart = useCallback((product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, []);

  const updateCartItemQuantity = useCallback(
    (productId: string, newQuantity: number) => {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item,
        ),
      );
    },
    [],
  );

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  /**
   * Clears all items from the cart
   */
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  /**
   * Clears all items from the cart
   */
  const cartItemsCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Montserrat_600SemiBold",
          },
          headerStyle: {
            backgroundColor: colors.whiteFade,
          },
          headerBackgroundContainerStyle: {
            backgroundColor: colors.whiteFade,
          },
          headerLeft: () => (
            <Image
              source={require("../../assets/malltiverse-logo.png")}
              style={{ flex: 1, marginLeft: 24 }}
              resizeMode={"contain"}
            />
          ),
          tabBarActiveTintColor: colors.secondary,
          tabBarInactiveTintColor: colors.whiteFade,
          tabBarActiveBackgroundColor: colors.primary,
          tabBarStyle: {
            backgroundColor: colors.secondary,
            position: "absolute",
            marginHorizontal: 16,
            marginTop: 10,
            marginBottom: 10,
            paddingTop: 15,
            borderRadius: 20,
            shadowOpacity: 0.7,
            shadowOffset: { width: 0, height: 5 },
            elevation: 3,
            height: 70,
            overflow: "hidden",
          },
          tabBarItemStyle: {
            borderRadius: 34,
            marginHorizontal: 42,
            height: 35,
          },
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="Products"
          options={{
            headerTitle: "Product List",
            tabBarIcon: ({ color }) => <Home color={color} fill={color} />,
          }}
        >
          {(props) => <Products {...props} addToCart={addToCart} />}
        </Tab.Screen>
        <Tab.Screen
          name="Cart"
          options={{
            headerTitle: "My Cart",
            tabBarIcon: ({ color }) => <CartIcon color={color} />,
          }}
        >
          {(props) => (
            <Cart
              {...props}
              cart={cart}
              removeFromCart={removeFromCart}
              updateCartItemQuantity={updateCartItemQuantity}
              clearCart={clearCart}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="CheckoutMain"
          component={CheckoutStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <CheckoutIcon color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigationContainer;

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    right: 9,
    top: -1,
    backgroundColor: "orange",
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});
