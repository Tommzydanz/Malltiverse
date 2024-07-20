import React from "react";
import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CompletedOrdersTab from "./CompletedOrdersTab";
import PendingCancelledOrdersTab from "./PendingCancelledOrdersTab";
import colors from "../../configs/colors.config";

const Tab = createMaterialTopTabNavigator();

const OrdersHistory: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontFamily: "Montserrat_500Medium",
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.primary,
        },
        tabBarActiveTintColor: colors.secondary,
      }}
    >
      <Tab.Screen name="Completed" component={CompletedOrdersTab} />
      <Tab.Screen
        name="Pending/Cancelled"
        component={PendingCancelledOrdersTab}
      />
    </Tab.Navigator>
  );
};

export default OrdersHistory;

const styles = StyleSheet.create({
  // Add any styles you need
});
