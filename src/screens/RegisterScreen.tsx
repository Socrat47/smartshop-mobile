import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import axios from 'axios';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigators/StackNavigator';

const RegisterScreen = ({ props }: any) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');

    const handleRegister = async () => {
        try {
            const res = await axios.post('http://192.168.1.7:3000/api/auth/register', {
                username,
                email,
                password,
                image,
            });

            if (res.data.status === 'success') {
                Alert.alert('Başarılı', 'Kayıt başarıyla tamamlandı.');
                navigation.navigate('Login');
            } else {
                Alert.alert('Hata', res.data.message || 'Kayıt başarısız.');
            }
        } catch (error: any) {
            console.error('Kayıt hatası:', error);
            Alert.alert('Hata', error.response?.data?.message || 'Sunucu hatası.');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            className="flex-1 justify-center items-center px-6 bg-white"
        >
            <Text className="text-3xl font-bold text-indigo-700 mb-6">Kayıt Ol</Text>

            <View className="w-full bg-gray-100 p-6 rounded-2xl shadow-md">
                <TextInput
                    className="border border-gray-300 p-3 rounded-md mb-4 text-base"
                    placeholder="Kullanıcı Adı"
                    value={username}
                    onChangeText={setUsername}
                    placeholderTextColor="#999"
                />
                <TextInput
                    className="border border-gray-300 p-3 rounded-md mb-4 text-base"
                    placeholder="E-posta"
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                />
                <TextInput
                    className="border border-gray-300 p-3 rounded-md mb-4 text-base"
                    placeholder="Şifre"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor="#999"
                />
                <TextInput
                    className="border border-gray-300 p-3 rounded-md mb-4 text-base"
                    placeholder="Profil Resmi URL (Opsiyonel)"
                    value={image}
                    onChangeText={setImage}
                    placeholderTextColor="#999"
                />

                <TouchableOpacity
                    className="bg-indigo-600 py-3 rounded-md"
                    onPress={handleRegister}
                >
                    <Text className="text-white text-center font-semibold text-base">
                        Kayıt Ol
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default RegisterScreen;
