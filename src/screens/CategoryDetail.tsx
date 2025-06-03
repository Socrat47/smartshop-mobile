import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { useStore } from '../stores/useStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CategoryDetail = ({ route, navigation }: any) => {
    const { name } = route.params;
    const { categories, fetchCategories, loading, error, addToCart } = useStore();

    useEffect(() => {
        fetchCategories();
    }, []);

    const category = categories.find((c: any) => c.name === name);

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-lg font-semibold">Yükleniyor...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-red-500">{error}</Text>
            </View>
        );
    }

    if (!category) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-red-500">Kategori bulunamadı</Text>
            </View>
        );
    }

    const handleAddToCart = (item: any) => {
        addToCart(item);
        Toast.show({
            type: 'success',
            text1: `${item.name} sepete eklendi`,
            position: 'bottom',
            visibilityTime: 2000,
        });
    };

    return (
        <View className="flex-1 p-4 bg-white">
            <FlatList
                data={category.products}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View className="bg-gray-100 rounded-xl p-4 mb-4 shadow">
                        <Image
                            source={{ uri: item.image }}
                            className="w-full h-48 rounded-md mb-3"
                            resizeMode="cover"
                        />
                        <Text className="text-xl font-bold text-gray-800">{item.name}</Text>
                        <Text className="text-gray-600 mt-1">{item.description}</Text>
                        <Text className="text-green-600 font-semibold mt-2">{item.price} ₺</Text>

                        <TouchableOpacity
                            className="mt-3 bg-blue-500 rounded-md py-2 px-4"
                            onPress={() => handleAddToCart(item)}
                        >
                            <Text className="text-white text-center font-semibold">Sepete Ekle</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

export default CategoryDetail;
