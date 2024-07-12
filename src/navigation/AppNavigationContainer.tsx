import { StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Products from '../screens/product-screen/Products';
import { RootStackParamList } from './interface';
import ProductDetails from '../screens/product-details/ProductDetails';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigationContainer: React.FC<{}> = function AppNavigationContainer() {


    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Products" component={Products} options={{
                    headerTitle: "Daynor Store",
                    headerTitleAlign: 'left',
                    headerLeft: () => <Image source={require('../../assets/daynor-logo.png')} style={{width: 24, height: 24, marginLeft: 16}}/>
                }} />
                <Stack.Screen name="ProductDetails" component={ProductDetails} options={{
                    headerTitle: '',
                    headerBackTitle: 'Back',
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default AppNavigationContainer;

const styles = StyleSheet.create({
    badge: {
      position: 'absolute',
      right: 9,
      top: -1,
      backgroundColor: 'orange',
      borderRadius: 8,
      width: 16,
      height: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    badgeText: {
      color: 'white',
      fontSize: 10,
      fontWeight: 'bold',
    },
  });