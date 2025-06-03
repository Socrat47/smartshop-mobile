import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigators/StackNavigator';


const LoginScreen = ({ onLogin }: any) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://192.168.1.7:3000/api/auth/login', {
                username,
                password,
            });

            if (res.data.token) {
                await AsyncStorage.setItem('token', res.data.token);
                await AsyncStorage.setItem('username', username);
                navigation.navigate('Tabs');

            }
        } catch (err) {
            console.error('Giriş hatası:', err);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            className="flex-1 justify-center items-center px-6 bg-gradient-to-b from-indigo-600 to-blue-500"
        >
            <Text className="text-3xl font-bold text-black mb-2">SmartShop’a</Text>
            <Text className="text-xl text-black mb-6">Tekrar Hoş Geldin 👋</Text>

            <View className="w-full bg-white p-6 rounded-2xl shadow-lg">
                <TextInput
                    className="border border-gray-300 p-3 rounded-md mb-4 text-base"
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    placeholderTextColor="#999"
                />
                <TextInput
                    className="border border-gray-300 p-3 rounded-md mb-4 text-base"
                    placeholder="Şifre"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor="#999"
                />

                <TouchableOpacity className='my-5 ml-44' onPress={() => navigation.navigate("Register")}>
                    <Text>Hesabın yok mu? <Text className='font-semibold'>Kayıt Ol</Text></Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="bg-indigo-600 py-3 rounded-md"
                    onPress={handleLogin}
                >
                    <Text className="text-white text-center font-semibold text-base">
                        Giriş Yap
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;
