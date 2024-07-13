import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import Payment from "../screens/payment/Payment";
import Checkout from "../screens/checkout/Checkout";
import PaymentSuccess from "../screens/payment-success/PaymentSuccess";
import colors from "../configs/colors.config";

// Create a stack navigator
const Stack = createStackNavigator();

// Define your screens for the stack navigator
const CheckoutStack: React.FC<{}> = ({ navigation }: any) => {
  return (
    <Stack.Navigator
      initialRouteName="Checkout"
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "Montserrat_600SemiBold",
        },
        headerLeft: () => (
          <Image
            source={require("../../assets/malltiverse-logo.png")}
            style={{ flex: 1, marginLeft: 24 }}
            resizeMode={"contain"}
          />
        ),
        headerStyle: {
          backgroundColor: colors.whiteFade,
        },
        headerBackgroundContainerStyle: {
          backgroundColor: colors.whiteFade,
        },
      }}
    >
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{
          headerTitle: "Checkout",
        }}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{
          headerTitleAlign: "left",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Checkout");
              }}
              style={styles.backButton}
            >
              <FontAwesome6 name="arrow-left-long" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="PaymentSuccess"
        component={PaymentSuccess}
        options={{
          headerTitle: "",
          headerLeft: () => (
            <Image
              source={require("../../assets/malltiverse-logo.png")}
              style={{ flex: 1, marginLeft: 24 }}
              resizeMode={"contain"}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default CheckoutStack;

const styles = StyleSheet.create({
  backButton: {
    paddingHorizontal: 22,
  },
});
