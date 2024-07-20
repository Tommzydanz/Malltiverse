import { StyleSheet, Image, TouchableOpacity, View } from "react-native";
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../configs/colors.config";
import { CartIcon, CheckoutIcon, History, Home } from "../../assets/svg";
import Cart from "../screens/cart/Cart";
import CheckoutStack from "./CheckoutStack";
import { selectCartItemsCount, useCartStore } from "../store/useCartStore";
import ProductStack from "./ProductStack";

const Tab = createBottomTabNavigator();

const AppNavigationContainer: React.FC = function AppNavigationContainer() {
  const cartItemsCount = useCartStore(selectCartItemsCount);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ navigation, route }) => ({
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
          headerLeft: () => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";
            if (routeName === "OrdersHistory") {
              return (
                <TouchableOpacity
                  style={{ marginLeft: 16 }}
                  onPress={() => navigation.goBack()}
                >
                  <FontAwesome6
                    name="arrow-left-long"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              );
            }
            if (routeName === "OrderDetails") {
              return (
                <TouchableOpacity
                  style={{ marginLeft: 16 }}
                  onPress={() => navigation.goBack()}
                >
                  <FontAwesome6
                    name="arrow-left-long"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              );
            }
            return (
              <Image
                source={require("../../assets/malltiverse-logo.png")}
                style={{ flex: 1, marginLeft: 24 }}
                resizeMode={"contain"}
              />
            );
          },

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
            marginHorizontal: 45,
            height: 35,
          },
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen
          name="Products"
          component={ProductStack}
          options={({ navigation, route }) => {
            const routeName =
              getFocusedRouteNameFromRoute(route) || "ProductList";

            return {
              headerTitle:
                routeName === "OrdersHistory"
                  ? "My Orders"
                  : routeName === "OrderDetails"
                    ? "Order Details"
                    : routeName === "Wishlist"
                      ? "Saved Items"
                      : "Product List",
              tabBarIcon: ({ color }) => <Home color={color} fill={color} />,
              headerRight: () => {
                if (routeName === "ProductList") {
                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        marginRight: 16,
                        marginTop: 14,
                      }}
                    >
                      <TouchableOpacity
                        style={{ marginRight: 16 }}
                        onPress={() => navigation.navigate("Wishlist")}
                      >
                        <MaterialIcons
                          name="favorite-border"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => navigation.navigate("OrdersHistory")}
                      >
                        <History width={36} height={36} />
                      </TouchableOpacity>
                    </View>
                  );
                }
                return null;
              },
            };
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            headerTitle: "My Cart",
            tabBarIcon: ({ color }) => <CartIcon color={color} />,
            tabBarBadge: cartItemsCount > 0 ? cartItemsCount : undefined,
            tabBarBadgeStyle: {
              backgroundColor: colors.primary,
              color: "white",
            },
          }}
        />
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
