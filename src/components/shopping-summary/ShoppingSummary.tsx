import React, { useMemo } from "react";
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
import { useForm, Controller } from "react-hook-form";

const { width } = Dimensions.get("window");
const scale = width / 375;

const normalize = (size: number) => Math.round(size * scale);

const DELIVERY_FEE = 1500;
const FIXED_DISCOUNT_CODE = "SAVE10";
const FIXED_DISCOUNT_AMOUNT = 3500;

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
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      discountCode: "",
    },
  });

  const [appliedDiscount, setAppliedDiscount] = React.useState(0);

  const handleApplyDiscount = (data: { discountCode: string }) => {
    if (data.discountCode === FIXED_DISCOUNT_CODE) {
      setAppliedDiscount(FIXED_DISCOUNT_AMOUNT);
      onApplyDiscount(data.discountCode);
    } else {
      setAppliedDiscount(0);
      onApplyDiscount("");
      setError("discountCode", {
        type: "manual",
        message: "Invalid discount code",
      });
    }
  };

  const totalAmount = useMemo(() => {
    return subTotal + DELIVERY_FEE - appliedDiscount;
  }, [subTotal, appliedDiscount]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Shopping Summary</Text>

        <View style={styles.discountSection}>
          <Text style={styles.label}>Discount Code</Text>
          <View style={styles.discountInputContainer}>
            <Controller
              control={control}
              rules={{
                required: "Discount code is required",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.discountInput}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter discount code"
                />
              )}
              name="discountCode"
            />
            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleSubmit(handleApplyDiscount)}
            >
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
          {errors.discountCode && (
            <Text style={styles.errorText}>{errors.discountCode.message}</Text>
          )}
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
            N {appliedDiscount.toLocaleString()}
          </Text>
        </View>

        <Dash
          width="100%"
          style={{
            alignSelf: "center",
            flex: 1,
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
  errorText: {
    color: colors.danger,
    fontSize: normalize(12),
    marginTop: 5,
    fontFamily: "Montserrat_400Regular",
  },
});
