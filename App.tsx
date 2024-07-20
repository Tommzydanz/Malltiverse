import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { StatusBar } from "expo-status-bar";
import AppNavigationContainer from "./src/navigation/AppNavigationContainer";
import colors from "./src/configs/colors.config";
import useOrderStore from "./src/store/useOrderStore";

export default function App() {
  SplashScreen.preventAutoHideAsync();

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });
  const loadOrders = useOrderStore((state) => state.loadOrders);

  useEffect(() => {
    const init = async () => {
      try {
        await loadOrders();
      } catch (error) {
        console.error("Failed to load orders:", error);
      }
    };
    init();
  }, [loadOrders]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Render nothing while the splash screen is visible
  }
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={colors.whiteFade} />
      <AppNavigationContainer />
    </SafeAreaProvider>
  );
}
