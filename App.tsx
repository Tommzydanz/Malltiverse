
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigationContainer from './src/navigation/AppNavigationContainer';

export default function App() {
  return (
    <SafeAreaProvider>
    <AppNavigationContainer />
    </SafeAreaProvider>
  )
}
