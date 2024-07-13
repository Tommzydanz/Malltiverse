import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import colors from "../../configs/colors.config";
import { Dash } from "../../../assets/svg";

const { width } = Dimensions.get("window");
const scale = width / 375;

const normalize = (size: number) => Math.round(size * scale);

const DELIVERY_FEE = 1500;
const DISCOUNT_AMOUNT = 3500;

interface ShoppingSummaryProps {
  subTotal: number;
  onApplyDiscount: (code: string) => void;
  onCheckout: () => void;
}

export const ShoppingSummary: React.FC<ShoppingSummaryProps> = ({
  subTotal,
  onApplyDiscount,
  onCheckout,
}) => {
  const [discountCode, setDiscountCode] = useState("");

  const handleApplyDiscount = () => {
    onApplyDiscount(discountCode);
  };

  const totalAmount = useMemo(() => {
    return subTotal + DELIVERY_FEE - DISCOUNT_AMOUNT;
  }, [subTotal]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Shopping Summary</Text>

        <View style={styles.discountSection}>
          <Text style={styles.label}>Discount Code</Text>
          <View style={styles.discountInputContainer}>
            <TextInput
              style={styles.discountInput}
              value={discountCode}
              onChangeText={setDiscountCode}
            />
            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleApplyDiscount}
            >
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Sub-Total</Text>
          <Text style={styles.summaryValue}>N {subTotal.toLocaleString()}</Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Delivery Fee</Text>
          <Text style={styles.summaryValue}>
            N {DELIVERY_FEE.toLocaleString()}
          </Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Discount Amount</Text>
          <Text style={styles.summaryValue}>
            N {DISCOUNT_AMOUNT.toLocaleString()}
          </Text>
        </View>

        <Dash
          width={346}
          style={{
            alignSelf: "center",
          }}
        />

        <View style={styles.summaryItem}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>
            N {totalAmount.toLocaleString()}
          </Text>
        </View>

        <TouchableOpacity style={styles.checkoutButton} onPress={onCheckout}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: normalize(1),
    backgroundColor: colors.gray500,
  },
  card: {
    borderRadius: normalize(10),
    padding: normalize(20),
    width: "100%",
  },
  title: {
    fontSize: normalize(18),
    marginBottom: normalize(20),
    fontFamily: "Montserrat_600SemiBold",
  },
  discountSection: {
    marginBottom: normalize(20),
  },
  label: {
    fontSize: normalize(14),
    fontFamily: "Montserrat_500Medium",
    color: colors.secondary70,
    marginBottom: normalize(5),
  },
  discountInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  discountInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.secondary70,
    fontFamily: "Montserrat_500Medium",
    borderRadius: normalize(5),
    padding: normalize(10),
    marginRight: normalize(10),
  },
  applyButton: {
    backgroundColor: colors.primary,
    borderRadius: normalize(5),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: normalize(15),
  },
  applyButtonText: {
    color: colors.secondary,
    fontSize: normalize(12),
    fontFamily: "Montserrat_500Medium",
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: normalize(10),
  },
  summaryLabel: {
    fontSize: normalize(12),
    fontFamily: "Montserrat_500Medium",
  },
  summaryValue: {
    fontSize: normalize(12),
    fontFamily: "Montserrat_500Medium",
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: normalize(10),
  },
  totalLabel: {
    fontSize: normalize(12),
    fontFamily: "Montserrat_500Medium",
  },
  totalValue: {
    fontSize: normalize(12),
    fontFamily: "Montserrat_500Medium",
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    borderRadius: normalize(5),
    padding: normalize(15),
    alignItems: "center",
    marginTop: normalize(20),
  },
  checkoutButtonText: {
    color: colors.secondary,
    fontFamily: "Montserrat_500Medium",
    fontSize: normalize(12),
  },
});
