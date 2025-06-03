import { View, Text, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { useStore } from '../stores/useStore'; // zustand store dosyanın yolu

const OrdersScreen = () => {
    const { orders, loading, error, fetchOrders } = useStore();

    useEffect(() => {
        fetchOrders();
    }, []);

    // Sipariş durumuna göre renk ve metin döndüren yardımcı fonksiyon
    const renderStatus = (status: string) => {
        switch (status) {
            case 'success':
                return (
                    <Text className="text-green-600 font-semibold">
                        Sipariş tamamlandı
                    </Text>
                );
            case 'pending':
                return (
                    <Text className="text-yellow-600 font-semibold">
                        Ödeme bekleniyor
                    </Text>
                );
            default:
                return (
                    <Text className="text-gray-600 font-semibold">
                        {status}
                    </Text>
                );
        }
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <Text className="text-lg font-semibold">Yükleniyor...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View className="flex-1 justify-center items-center bg-white px-4">
                <Text className="text-red-500 text-center">{error}</Text>
            </View>
        );
    }

    if (orders.length === 0) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <Text className="text-gray-600">Henüz sipariş yok.</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white p-4">
            <FlatList
                data={orders}
                keyExtractor={(order) => order.id.toString()}
                renderItem={({ item }) => (
                    <View className="mb-4 rounded-lg border border-gray-300 p-4 shadow-sm bg-gray-50">
                        <Text className="text-xl font-bold text-gray-800 mb-1">
                            Sipariş ID: {item.id}
                        </Text>
                        <Text className="text-gray-600 mb-1">
                            Kullanıcı: {item.user.username}
                        </Text>
                        <Text className="text-gray-600 mb-1">Masa: {item.table.name}</Text>

                        <View className="mb-2">{renderStatus(item.status)}</View>

                        <Text className="text-gray-800 font-semibold mb-2">
                            Toplam: {item.total} ₺
                        </Text>

                        <Text className="font-semibold mb-1">Ürünler:</Text>
                        {item.items.map((orderItem: any) => (
                            <View
                                key={orderItem.id}
                                className="border border-gray-200 rounded-md p-2 mb-1 bg-white"
                            >
                                <Text className="text-gray-700">
                                    {orderItem.product.name} - {orderItem.quantity} adet - {orderItem.price} ₺
                                </Text>
                            </View>
                        ))}
                    </View>
                )}
            />
        </View>
    );
};

export default OrdersScreen;
