import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { useForm, Controller, FieldValues } from "react-hook-form";
import colors from "../../configs/colors.config";
import useOrderStore from "../../store/useOrderStore";
import { useCartStore } from "../../store/useCartStore";
import { WhiteLoader } from "../../components/Loader/Loader";

const Checkout: React.FC = ({ navigation }: any) => {
  const [selectedPickup, setSelectedPickup] = useState("sokoto");
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const addOrder = useOrderStore((state) => state.addOrder);
  const cartItems = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const onSubmit = async (formData: FieldValues) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const deadline = new Date();
    deadline.setHours(deadline.getHours() + 12); // 12-hour deadline

    const orderData = {
      id: Date.now().toString(),
      items: cartItems,
      status: "pending" as const,
      paymentDeadline: deadline,
      deliveryAddress: formData.deliveryAddress,
      phoneNumber1: formData.phoneNumber1,
      phoneNumber2: formData.phoneNumber2,
    };

    const newOrder = addOrder(orderData);

    // Clear the cart after creating the order
    clearCart();
    setIsLoading(false);
    // Navigate to payment screen
    navigation.navigate("Payment", { orderId: (await newOrder).id });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={styles.title}>Select how to receive your package(s)</Text>

      <RadioButton.Group
        onValueChange={(value) => setSelectedPickup(value)}
        value={selectedPickup}
      >
        <View style={styles.radioOption}>
          <RadioButton.Android value="secretariat" color={colors.primary} />
          <Text style={styles.radioLabel}>
            Old Secretariat Complex, Area 1, Garki
          </Text>
        </View>
        <View style={styles.radioOption}>
          <RadioButton.Android value="sokoto" color={colors.primary} />
          <Text style={styles.radioLabel}>
            Sokoto Street, Area 1, Garki Area 1 AMAC
          </Text>
        </View>
      </RadioButton.Group>

      <Text style={styles.subtitle}>Delivery Information</Text>

      <Controller
        control={control}
        rules={{ required: "Address is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.deliveryInput}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Delivery Address"
          />
        )}
        name="deliveryAddress"
      />
      {errors.deliveryAddress && (
        <Text style={styles.errorText}>
          {errors.deliveryAddress.message as string}
        </Text>
      )}

      <Text style={styles.subtitle}>Contact</Text>

      <Controller
        control={control}
        rules={{ required: "Phone number 1 is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            maxLength={11}
            placeholder="Phone Number 1"
            keyboardType="phone-pad"
          />
        )}
        name="phoneNumber1"
      />
      {errors.phoneNumber1 && (
        <Text style={styles.errorText}>
          {errors.phoneNumber1.message as string}
        </Text>
      )}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            maxLength={11}
            onChangeText={onChange}
            value={value}
            placeholder="Phone Number 2 (Optional)"
            keyboardType="phone-pad"
          />
        )}
        name="phoneNumber2"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        {isLoading ? (
          <WhiteLoader />
        ) : (
          <Text style={styles.buttonText}>Go to Payment</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteFade,
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: "Montserrat_500Medium",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Montserrat_500Medium",
    marginBottom: 10,
    marginTop: 10,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioLabel: {
    fontSize: 12,
    marginLeft: 8,
    fontFamily: "Montserrat_400Regular",
  },
  deliveryInput: {
    backgroundColor: colors.whiteFade,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 5,
    padding: 10,
    minHeight: 60,
    fontFamily: "Montserrat_400Regular",
  },
  input: {
    backgroundColor: colors.whiteFade,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: "65%",
    fontFamily: "Montserrat_400Regular",
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    marginTop: 42,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 30,
    margin: 20,
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

export default Checkout;
