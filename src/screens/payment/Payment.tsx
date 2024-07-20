import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import colors from "../../configs/colors.config";
import CreditCardSVG from "../../components/credit-card/CreditCardSVG";
import { useRoute } from "@react-navigation/native";
import useOrderStore from "../../store/useOrderStore";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { WhiteLoader } from "../../components/Loader/Loader";
import { formatCardNumber } from "../../utils/cardFormat";

type PaymentProps = {
  navigation: any;
};

const Payment: React.FC<PaymentProps> = ({ navigation }) => {
  const route = useRoute();
  const { orderId } = route.params as { orderId: string };
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const cardNumber = watch("cardNumber");
  const expiryDate = watch("expiryDate");

  const [isLoading, setIsLoading] = useState(false);
  const updateOrderStatus = useOrderStore((state) => state.updateOrder);

  const onSubmit = async (formData: FieldValues) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    handlePayment();
  };

  const handlePayment = async () => {
    await Alert.alert(
      "Confirm Payment",
      "Are you sure you want to complete the payment?",
      [
        {
          text: "Cancel",
          onPress: () => {
            updateOrderStatus(orderId, "canceled");
            navigation.navigate("Products");
          },
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            updateOrderStatus(orderId, "completed");
            navigation.navigate("PaymentSuccess");
          },
        },
      ],
    );
  };

  const handleExpiryDateChange = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .substr(0, 5);
  };

  const getInputStyle = useCallback(
    (fieldName: string) => {
      return {
        ...styles.input,
        borderColor: (errors as Record<string, any>)[fieldName]
          ? colors.danger
          : colors.gray600,
      };
    },
    [errors],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardContainer}>
        <CreditCardSVG
          cardNumber={cardNumber}
          expiryDate={expiryDate}
          cardHolder={""}
        />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Card Number</Text>
        <Controller
          control={control}
          rules={{
            required: "Card number is required",
            pattern: {
              value: /^(\d{4}\s?){4}$/,
              message: "Invalid card number format",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={getInputStyle("cardNumber")}
              placeholder="0000 0000 0000 0000"
              onBlur={onBlur}
              onChangeText={(text) => onChange(formatCardNumber(text))}
              value={value}
              keyboardType="numeric"
              maxLength={19}
            />
          )}
          name="cardNumber"
        />
        {errors.cardNumber && (
          <Text style={styles.errorText}>{errors.cardNumber.message}</Text>
        )}

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Text style={styles.label}>Expiry Date</Text>
            <Controller
              control={control}
              rules={{
                required: "Expiry date is required",
                pattern: {
                  value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                  message: "Invalid expiry date format",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={getInputStyle("expiryDate")}
                  placeholder="MM/YY"
                  onBlur={onBlur}
                  onChangeText={(text) =>
                    onChange(handleExpiryDateChange(text))
                  }
                  value={value}
                  keyboardType="numeric"
                  maxLength={5}
                />
              )}
              name="expiryDate"
            />
            {errors.expiryDate && (
              <Text style={styles.errorText}>{errors.expiryDate.message}</Text>
            )}
          </View>
          <View style={styles.halfWidth}>
            <Text style={styles.label}>CVV</Text>
            <Controller
              control={control}
              rules={{
                required: "CVV is required",
                pattern: {
                  value: /^\d{3}$/,
                  message: "Invalid CVV",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={getInputStyle("cvv")}
                  placeholder="123"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                  maxLength={3}
                />
              )}
              name="cvv"
            />
            {errors.cvv && (
              <Text style={styles.errorText}>{errors.cvv.message ?? ""}</Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          {isLoading ? (
            <WhiteLoader />
          ) : (
            <Text style={styles.buttonText}>Make Payment</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteFade,
  },
  cardContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: "Montserrat_500Medium",
    color: colors.secondary,
    marginBottom: 5,
  },
  input: {
    backgroundColor: colors.whiteFade,
    borderWidth: 1,
    borderColor: colors.gray500,
    color: colors.secondary,
    fontFamily: "Montserrat_400Regular",
    borderRadius: 5,
    padding: 10,
    fontSize: 12,
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfWidth: {
    width: "48%",
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: colors.secondary,
    fontSize: 12,
    fontFamily: "Montserrat_500Medium",
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    marginBottom: 10,
    fontFamily: "Montserrat_500Medium",
  },
});

export default Payment;
