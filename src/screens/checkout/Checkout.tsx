import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { RadioButton } from "react-native-paper";
import colors from "../../configs/colors.config";
import { useNavigation } from "@react-navigation/native";

const Checkout: React.FC = () => {
  const navigation = useNavigation<any>();
  const [selectedPickup, setSelectedPickup] = useState("sokoto");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [phoneNumber1, setPhoneNumber1] = useState("");
  const [phoneNumber2, setPhoneNumber2] = useState("");

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={styles.title}>Select how to receive your package(s)</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pickup</Text>
        <RadioButton.Group
          onValueChange={(value) => setSelectedPickup(value)}
          value={selectedPickup}
        >
          <View style={styles.radioItem}>
            <RadioButton.Android value="secretariat" color={colors.primary} />
            <Text style={styles.radioLabel}>
              Old Secretariat Complex, Area 1, Garki Abaji Abji
            </Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton.Android value="sokoto" color={colors.primary} />
            <Text style={styles.radioLabel}>
              Sokoto Street, Area 1, Garki Area 1 AMAC
            </Text>
          </View>
        </RadioButton.Group>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery</Text>
        <TextInput
          style={styles.deliveryInput}
          value={deliveryAddress}
          onChangeText={setDeliveryAddress}
          multiline
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone nos 1"
          value={phoneNumber1}
          onChangeText={setPhoneNumber1}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone nos 2"
          value={phoneNumber2}
          onChangeText={setPhoneNumber2}
          keyboardType="phone-pad"
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Payment")}
      >
        <Text style={styles.buttonText}>Go to Payment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Checkout;

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
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Montserrat_500Medium",
    marginBottom: 10,
  },
  radioItem: {
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
    marginBottom: 10,
    fontFamily: "Montserrat_400Regular",
  },
  input: {
    backgroundColor: colors.whiteFade,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
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
});
