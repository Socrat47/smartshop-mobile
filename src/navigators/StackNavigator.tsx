import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';
import CategoryDetail from '../screens/CategoryDetail';
import BottomNavigator from './BottomNavigator';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Tabs: undefined;
    CategoryDetail: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        const checkLogin = async () => {
            const token = await AsyncStorage.getItem('token');
            setIsLoggedIn(!!token);
        };

        checkLogin();
    }, []);

    if (isLoggedIn === null) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={isLoggedIn ? "Tabs" : "Login"}
        >
            <Stack.Screen
                name="Login"
                children={(props) => (
                    <LoginScreen
                        {...props}
                        onLogin={() => setIsLoggedIn(true)}
                    />
                )}
            />
            <Stack.Screen
                name="Register"
                children={(props) => <RegisterScreen {...props} />}
            />
            <Stack.Screen name="Tabs" component={BottomNavigator} />
            <Stack.Screen name="CategoryDetail" component={CategoryDetail} />
        </Stack.Navigator>
    );
};

export default StackNavigator;