import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../configs/colors.config";
import { CommonActions, useNavigation } from "@react-navigation/native";

const PaymentSuccess: React.FC = () => {
  const navigation = useNavigation<any>();

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: "Products", // This should be the name of your Products tab
            },
          ],
        }),
      );
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={require("../../../assets/confetti-background.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Payment Successful</Text>
        <Ionicons name="checkmark-circle" size={92} color={colors.primary} />
        <Text style={styles.subtitle}>Payment Successful</Text>
        <Text style={styles.message}>Thanks for your purchase</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Montserrat_600SemiBold",
    marginBottom: 100,
  },
  checkmarkContainer: {
    width: 100,
    height: 100,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "Montserrat_600SemiBold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    textAlign: "center",
  },
});

export default PaymentSuccess;
