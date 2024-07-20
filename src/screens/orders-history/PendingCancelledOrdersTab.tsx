import React from "react";
import { FlatList, Text, StyleSheet } from "react-native";
import useOrderStore from "../../store/useOrderStore";
import OrderItem from "../../components/order-item/OrderItem";
import colors from "../../configs/colors.config";

const PendingCanceledTab: React.FC = ({ navigation }: any) => {
  const orders = useOrderStore((state) => state.orders);

  const pendingCanceledOrders = orders.filter(
    (order) => order.status === "pending" || order.status === "canceled",
  );

  const handlePress = (order: any, itemIndex: number) => {
    const orderItem = order.items[itemIndex];
    navigation.navigate("OrderDetails", {
      orderItem: {
        ...orderItem,
        id: order.id,
        status: order.status,
        createdAt: order.createdAt.toISOString(),
        updatedAt: order.updatedAt.toISOString(),
      },
    });
  };

  return (
    <FlatList
      data={pendingCanceledOrders}
      style={{ flex: 1, backgroundColor: colors.whiteFade, padding: 24 }}
      renderItem={({ item: order }) => (
        <>
          {order.items.map((_, index) => (
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
        <Text style={styles.emptyCartText}>No pending or canceled orders</Text>
      }
    />
  );
};

export default PendingCanceledTab;

const styles = StyleSheet.create({
  emptyCartText: {
    fontSize: 16,
    fontFamily: "Montserrat_500Medium",
    alignSelf: "center",
  },
});
