import { create } from 'zustand';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

interface Product {
    id: number;
    productId?: string;
    name: string;
    image: string;
    description?: string;
    price: number;
}

interface CartItem extends Product {
    quantity: number;
}

interface Order {
    user: {
        id: number;
        username: string;
        email: string;
    }
    table: any;
    id: number;
    items: CartItem[];
    createdAt: string;
    tableName: string;
    status: string;
    total: number;
}

interface StoreState {
    categories: { name: string; products: Product[] }[];
    cart: CartItem[];
    orders: Order[];
    loading: boolean;
    error: string | null;

    // Kategori işlemleri
    fetchCategories: () => Promise<void>;

    // Sepet işlemleri
    addToCart: (item: Product) => void;
    removeFromCart: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    clearCart: () => void;

    // Sipariş işlemleri
    handleOrder: () => Promise<void>;
    fetchOrders: () => Promise<void>;
}

export const useStore = create<StoreState>((set, get) => ({
    categories: [],
    cart: [],
    orders: [],
    loading: false,
    error: null,

    // KATEGORİLERİ ÇEK
    fetchCategories: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get('http://192.168.1.7:3000/api/categories');
            set({ categories: response.data.data || [], loading: false });
        } catch (e) {
            set({ error: 'Kategori verisi alınamadı', loading: false });
        }
    },

    // SEPETE EKLE
    addToCart: (item: Product) => {
        const cart = get().cart;
        const index = cart.findIndex((i) => i.id === item.id);
        if (index >= 0) {
            const updatedCart = [...cart];
            updatedCart[index].quantity += 1;
            set({ cart: updatedCart });
        } else {
            set({ cart: [...cart, { ...item, quantity: 1 }] });
        }
    },

    // SEPETTEN ÇIKAR
    removeFromCart: (id: number) => {
        const cart = get().cart;
        const updatedCart = cart.filter(item => item.id !== id);
        set({ cart: updatedCart });
    },

    // MİKTAR AZALT
    decreaseQuantity: (id: number) => {
        const cart = get().cart;
        const index = cart.findIndex(item => item.id === id);
        if (index >= 0) {
            const updatedCart = [...cart];
            if (updatedCart[index].quantity > 1) {
                updatedCart[index].quantity -= 1;
            } else {
                updatedCart.splice(index, 1);
            }
            set({ cart: updatedCart });
        }
    },

    // SEPETİ TEMİZLE
    clearCart: () => set({ cart: [] }),

    // SİPARİŞİ TAMAMLA
    handleOrder: async () => {
        const cart = get().cart;
        if (cart.length === 0) {
            Alert.alert('Sepet boş', 'Lütfen önce ürün ekleyin.');
            return;
        }

        const token = await AsyncStorage.getItem('token');
        if (!token) {
            Alert.alert('Giriş gerekli', 'Lütfen tekrar giriş yapın.');
            return;
        }

        try {
            await axios.post(
                'http://192.168.1.7:3000/api/orders/create-order',
                {
                    tableName: 'Masa 01',
                    items: cart.map(item => ({
                        productId: item.id.toString(),
                        quantity: item.quantity,
                        price: item.price,
                    })),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            Alert.alert('Başarılı', 'Siparişiniz alındı!');
            get().clearCart();
            await get().fetchOrders(); // sipariş sonrası sipariş listesini güncelle

        } catch (error) {
            Alert.alert('Hata', 'Sipariş verilirken bir hata oluştu.');
            console.error(error);
        }
    },

    fetchOrders: async () => {
        set({ loading: true, error: null });

        const token = await AsyncStorage.getItem('token');
        const username = await AsyncStorage.getItem('username');

        if (!token) {
            set({ error: 'Giriş tokeni bulunamadı', loading: false });
            return;
        }

        if (!username) {
            set({ error: 'Kullanıcı bilgisi bulunamadı', loading: false });
            return;
        }

        try {
            const res = await axios.get('http://192.168.1.7:3000/api/orders', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.data.status === 'success') {
                const filteredOrders = res.data.data.filter(
                    (order: Order) => order.user.username === username
                );

                const sortedOrders = [...filteredOrders].sort(
                    (a: Order, b: Order) =>
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                set({ orders: sortedOrders });
            } else {
                set({ error: 'Siparişler getirilemedi' });
            }
        } catch (err) {
            set({ error: 'Sunucu hatası' });
            console.error(err);
        } finally {
            set({ loading: false });
        }
    },

}));
