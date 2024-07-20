import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import colors from "../../configs/colors.config";
import { OrderItemProps } from "./interface";
import { formatDate } from "../../utils/date";

const OrderItem: OrderItemProps = ({ order, itemIndex, onPress }) => {
  const item = order.items[itemIndex];

  if (!item) {
    return null; // Or some fallback UI
  }
  const displayDate = order.updatedAt || order.createdAt;
  const dateString = formatDate(displayDate.toString());

  const statusText = order.status ? `${order.status}` : "";

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{
          uri: `https://api.timbu.cloud/images/${item.photos[0].url}`,
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text
          style={[
            styles.status,
            { backgroundColor: getStatusColor(order.status) },
          ]}
        >
          {statusText.toUpperCase()}
        </Text>
        <View style={styles.quantityContainer}>
          <Text style={styles.quantity}>Qty:</Text>
          <Text style={styles.quantity}>{`x ${item.quantity}`}</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <Text style={{ fontFamily: "Montserrat_400Regular", fontSize: 12 }}>
          {dateString}
        </Text>
        <Text style={styles.price}>
          N{" "}
          {(item.current_price[0].NGN[0] * item.quantity).toLocaleString(
            "en-US",
          )}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const getStatusColor = (status: any) => {
  switch (status.toLowerCase()) {
    case "completed":
      return colors.success;
    case "pending":
      return colors.orange;
    case "canceled":
      return colors.danger;
    default:
      return colors.secondary;
  }
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
  status: {
    fontSize: 12,
    fontFamily: "Montserrat_500Medium",
    marginBottom: 4,
    textAlign: "center",
    color: colors.secondary,
    borderRadius: 2,
    width: "50%",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 8,
  },
  quantityCounter: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 17,
    top: -2,
  },
  disabledButton: {
    opacity: 0.5,
  },
  quantity: {
    fontSize: 12,
    fontFamily: "Montserrat_500Medium",
    color: colors.secondary,
    marginRight: 8,
  },
  rightContainer: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 16,
    fontFamily: "Montserrat_500Medium",
  },
});

export default OrderItem;
