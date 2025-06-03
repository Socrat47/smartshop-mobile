import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'

const Menus = ({ navigation }: any) => {
    const data = [
        { name: 'Kahvaltılar' },
        { name: 'Burgerler' },
        { name: 'Pasta' },
        { name: 'Salad' },
        { name: 'Sushi' },
        { name: 'Dessert' },
        { name: 'Beverages' },
        { name: 'Appetizers' },
        { name: 'Sandwiches' },
        { name: 'Wraps' },
        { name: 'Tacos' },
        { name: 'Steaks' },
        { name: 'Seafood' },
        { name: 'Vegan' },
        { name: 'Gluten-Free' },
        { name: 'Breakfast' },
        { name: 'Brunch' },
        { name: 'Kids Menu' },
    ]
    return (
        <View className='items-center mt-48 mx-4 rounded-xl bg-white p-5'>
            <Text className='text-3xl font-bold'>Menüler</Text>
            <FlatList
                data={data}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        className='bg-black w-32 h-16 items-center justify-center rounded-xl'
                        onPress={() => navigation.navigate('CategoryDetail', { name: item.name })}
                    >
                        <Text className='text-white text-xl font-semibold'>{item.name}</Text>
                    </TouchableOpacity>

                )}
                contentContainerClassName='flex-row flex-wrap justify-center gap-4 mt-4'
            />
        </View>
    )
}

export default Menus