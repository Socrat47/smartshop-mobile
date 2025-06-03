import { View, Text, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { useStore } from '../stores/useStore';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = () => {
    const { cart, clearCart, handleOrder } = useStore();

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <View className="flex-1 p-4 bg-white">
            <Text className="text-2xl font-bold mb-4">Sepetim</Text>
            {cart.length === 0 ? (
                <Text className="text-gray-500">Sepet boş</Text>
            ) : (
                <>
                    <FlatList
                        data={cart}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View className="bg-gray-100 p-4 mb-2 rounded-lg">
                                <Image source={{ uri: item.image }} className="w-full h-32 rounded-md" />
                                <Text className="font-bold text-lg mt-2">{item.name}</Text>
                                <Text className="text-gray-700">{item.price} ₺ x {item.quantity}</Text>
                                <Text className="text-gray-700 font-semibold mt-1">
                                    Toplam: {item.price * item.quantity} ₺
                                </Text>
                            </View>
                        )}
                    />
                    <View className="mt-4 p-4 border-t border-gray-300">
                        <Text className="text-xl font-bold mb-3">Genel Toplam: {totalPrice} ₺</Text>
                        <TouchableOpacity
                            className="bg-green-600 py-3 rounded-md"
                            onPress={handleOrder}
                        >
                            <Text className="text-white text-center font-semibold text-lg">Sipariş Ver</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
};

export default CartScreen;
