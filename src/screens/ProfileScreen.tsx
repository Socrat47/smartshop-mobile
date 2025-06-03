import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Alert,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation, NavigationProp, CommonActions, useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../navigators/StackNavigator';

interface User {
    username: string;
    email: string;
    image: string;
    status: string;
}

const ProfileScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            setLoading(true);
            const username = await AsyncStorage.getItem('username');

            if (!username) {
                Alert.alert('Hata', 'Kullanıcı bilgisi bulunamadı!');
                handleNavigateToLogin();
                return;
            }

            const res = await axios.get(`http://192.168.1.7:3000/api/users/username/${username}`);

            if (res.data.status === 'success') {
                setUser(res.data.data);
            } else {
                Alert.alert('Hata', res.data.message || 'Kullanıcı bulunamadı!');
                handleNavigateToLogin();
            }
        } catch (error: any) {
            console.error('User fetch error:', error);
            Alert.alert('Hata', 'Kullanıcı bilgisi alınamadı.');
            handleNavigateToLogin();
        } finally {
            setLoading(false);
        }
    };

    const handleNavigateToLogin = () => {
        try {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                })
            );
        } catch (error) {
            // Fallback navigation
            navigation.navigate('Login' as never);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    // Screen'e her focus olduğunda kullanıcı bilgilerini yenile
    useFocusEffect(
        React.useCallback(() => {
            fetchUser();
        }, [])
    );

    const handleLogout = async () => {
        Alert.alert(
            'Çıkış Yap',
            'Çıkış yapmak istediğinizden emin misiniz?',
            [
                {
                    text: 'İptal',
                    style: 'cancel',
                },
                {
                    text: 'Çıkış Yap',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await AsyncStorage.clear();
                            handleNavigateToLogin();
                        } catch (error) {
                            console.error('Logout error:', error);
                            Alert.alert('Hata', 'Çıkış yapılırken bir hata oluştu.');
                        }
                    },
                },
            ]
        );
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#4f46e5" />
                <Text className="mt-4 text-gray-600">Yükleniyor...</Text>
            </View>
        );
    }

    if (!user) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <Text className="text-red-500 text-lg mb-4">Kullanıcı bulunamadı.</Text>
                <TouchableOpacity
                    onPress={handleNavigateToLogin}
                    className="bg-indigo-600 py-2 px-6 rounded-lg"
                >
                    <Text className="text-white font-semibold">Giriş Yap</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="p-6">
                <View className="bg-gray-100 rounded-xl p-6 items-center shadow-md">
                    {user.image ? (
                        <Image
                            source={{ uri: user.image }}
                            className="w-32 h-32 rounded-full mb-4"
                            onError={() => {
                                console.log('Image load error');
                            }}
                        />
                    ) : (
                        <View className="w-32 h-32 rounded-full bg-gray-300 mb-4 justify-center items-center">
                            <Text className="text-gray-600 text-2xl font-bold">
                                {user.username.charAt(0).toUpperCase()}
                            </Text>
                        </View>
                    )}

                    <Text className="text-2xl font-bold mb-1 text-gray-800">
                        {user.username}
                    </Text>
                    <Text className="text-gray-600 mb-3">{user.email}</Text>
                    <Text className="text-indigo-600 mb-5 font-semibold">
                        {user.status}
                    </Text>

                    <TouchableOpacity
                        onPress={handleLogout}
                        className="bg-red-600 py-3 px-10 rounded-full active:bg-red-700"
                    >
                        <Text className="text-white font-bold text-lg">Çıkış Yap</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default ProfileScreen;