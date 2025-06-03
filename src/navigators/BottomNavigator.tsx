import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import OrdersScreen from '../screens/OrdersScreen';
import CartScreen from '../screens/CartScreen';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const BottomNavigator = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: '#5D38BE',
            tabBarInactiveTintColor: '#A8A8A8',
        })}>
            <Tab.Screen
                name="Anasayfa"
                component={HomeScreen} options={{
                    tabBarIcon: ({ color }) => (
                        <Entypo name="home" size={24} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="Siparişler"
                component={OrdersScreen} options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="shopping-bag" size={24} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="Sepet"
                component={CartScreen} options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="shopping-cart" size={24} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="Profil"
                component={ProfileScreen} options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="user" size={24} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomNavigator