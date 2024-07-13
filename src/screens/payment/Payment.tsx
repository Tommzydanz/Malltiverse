import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import colors from "../../configs/colors.config";
import { Card } from "../../../assets/svg";

type PaymentProps = {
  navigation: any;
};

const Payment: React.FC<PaymentProps> = ({ navigation }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = cleaned.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length > 0 ? parts.join(" ") : text;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardContainer}>
        <Card style={{ marginHorizontal: 20 }} />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Card Number</Text>
        <TextInput
          style={styles.input}
          placeholder="0000 0000 0000 0000"
          value={cardNumber}
          onChangeText={(text) => setCardNumber(formatCardNumber(text))}
          keyboardType="numeric"
          maxLength={19}
        />
        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Text style={styles.label}>Expiry Date</Text>
            <TextInput
              style={styles.input}
              placeholder="MM/YY"
              value={expiryDate}
              onChangeText={setExpiryDate}
              keyboardType="numeric"
              maxLength={5}
            />
          </View>
          <View style={styles.halfWidth}>
            <Text style={styles.label}>CVV</Text>
            <TextInput
              style={styles.input}
              placeholder="123"
              value={cvv}
              onChangeText={setCvv}
              keyboardType="numeric"
              maxLength={3}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("PaymentSuccess")}
        >
          <Text style={styles.buttonText}>Make Payment</Text>
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
    color: colors.gray500,
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
});

export default Payment;
