import React, { useCallback } from "react";
import { FlatList, Text, StyleSheet } from "react-native";
import useOrderStore from "../../store/useOrderStore";
import OrderItem from "../../components/order-item/OrderItem";
import colors from "../../configs/colors.config";

const CompletedTab: React.FC = ({ navigation }: any) => {
  const orders = useOrderStore((state) => state.orders);

  const completedOrders = orders.filter(
    (order) => order.status === "completed",
  );

  const handlePress = useCallback(
    (order: any, itemIndex: number) => {
      const orderItem = order.items[itemIndex];
      navigation.navigate("OrderDetails", {
        orderItem: {
          ...orderItem,
          id: order.id,
          status: order.status,
          createdAt: order.createdAt.toISOString(),
        },
      });
    },
    [navigation],
  );

  return (
    <FlatList
      data={completedOrders}
      style={{ flex: 1, backgroundColor: colors.whiteFade, padding: 24 }}
      renderItem={({ item: order }) => (
        <>
          {order.items.map((_, index: number) => (
            <OrderItem
              key={`${order.id}-${index}`}
              order={order}
              itemIndex={index}
              onPress={() => handlePress(order, index)}
            />
          ))}
        </>
      )}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={
        <Text style={styles.emptyCartText}>No completed orders yet</Text>
      }
    />
  );
};

export default CompletedTab;

const styles = StyleSheet.create({
  emptyCartText: {
    fontSize: 16,
    fontFamily: "Montserrat_500Medium",
    alignSelf: "center",
  },
});
