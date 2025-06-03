import { View, Text, Image, FlatList, ScrollView } from 'react-native'
import React from 'react'
import Banner from '../components/Banner'
import AutoScrollingCarousel from '../components/AutoScrollingCarousel'
import Menus from '../components/Menus'
const HomeScreen = ({ navigation }: any) => {
    const data = [
        { id: '1', title: 'Ürün 1', url: "https://biqmenu.com/kavuskafe/assets/uploads/urunler/9998b-_0041_kavus-18782.jpg" },
        { id: '2', title: 'Ürün 2', url: "https://biqmenu.com/kavuskafe/assets/uploads/urunler/9baaa-sahanda-sarimsakli-et.jpg" },
        { id: '3', title: 'Ürün 3', url: "https://biqmenu.com/kavuskafe/assets/uploads/urunler/9baaa-sahanda-sarimsakli-et.jpg" },
        { id: '4', title: 'Ürün 4', url: "https://biqmenu.com/kavuskafe/assets/uploads/urunler/9baaa-sahanda-sarimsakli-et.jpg" },
        { id: '5', title: 'Ürün 5', url: "https://biqmenu.com/kavuskafe/assets/uploads/urunler/9baaa-sahanda-sarimsakli-et.jpg" }
    ]
    return (
        <ScrollView>
            <Banner />
            <View className='z-10 p-4 rounded-xl absolute bg-white mx-10 mt-80 w-96'>
                <Text className='text-2xl font-semibold'>Sizin için seçtiklerimiz</Text>
                <AutoScrollingCarousel />
            </View>
            <Menus navigation={navigation} />
        </ScrollView>
    )
}

export default HomeScreen