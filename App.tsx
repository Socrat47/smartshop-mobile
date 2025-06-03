import { StatusBar } from 'expo-status-bar';
import './global.css';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigators/StackNavigator';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native';


export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <StackNavigator />
      </NavigationContainer>
      <Toast />
    </SafeAreaView>
  );
}
