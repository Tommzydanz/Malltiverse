import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useCartStore } from "../../store/useCartStore";
import colors from "../../configs/colors.config";
import { formatDate } from "../../utils/date";

const OrderDetails: React.FC = ({ navigation, route }: any) => {
  const { orderItem } = route.params;
  const addToCart = useCartStore((state) => state.addToCart);

  if (!orderItem) {
    return (
      <Text
        style={{ fontFamily: "Montserrat_600SemiBold", alignSelf: "center" }}
      >
        Order not found
      </Text>
    );
  }

  const handleButtonPress = async () => {
    if (orderItem.status === "pending") {
      navigation.navigate("Payment", { orderId: orderItem.id });
    } else {
      addToCart(orderItem);
      navigation.navigate("Cart");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `https://api.timbu.cloud/images/${orderItem.photos[0].url}`,
        }}
        style={styles.image}
      />
      <Text style={styles.title}>{orderItem.name}</Text>
      <Text
        style={[
          styles.status,
          { backgroundColor: getStatusColor(orderItem.status) },
        ]}
      >
        {orderItem.status.toUpperCase()}
      </Text>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Quantity:</Text>
        <Text style={styles.detailValue}>{orderItem.quantity} pcs</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Price:</Text>
        <Text style={styles.detailValue}>
          N{" "}
          {(
            orderItem.current_price[0].NGN[0] * orderItem.quantity
          ).toLocaleString("en-US")}
        </Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Date:</Text>
        <Text style={styles.detailValue}>
          {formatDate(orderItem.createdAt)}
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>
          {orderItem.status === "pending" ? "Make Payment" : "Buy Again"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const getStatusColor = (status: string) => {
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
    flex: 1,
    padding: 20,
    backgroundColor: colors.whiteFade,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
  title: {
    fontSize: 20,
    fontFamily: "Montserrat_500Medium",
    marginTop: 20,
  },
  status: {
    fontSize: 14,
    fontFamily: "Montserrat_500Medium",
    width: "30%",
    textAlign: "center",
    marginTop: 10,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  detailLabel: {
    fontSize: 12,
    color: colors.secondary,
    fontFamily: "Montserrat_400Regular",
  },
  detailValue: {
    fontSize: 12,
    color: colors.secondary,
    fontFamily: "Montserrat_400Regular",
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 24,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: colors.secondary,
    fontSize: 12,
    fontFamily: "Montserrat_500Medium",
  },
});

export default OrderDetails;
