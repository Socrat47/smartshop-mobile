import React, { useRef, useEffect, useState } from 'react'
import { View, Text, Image, FlatList, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

type Item = {
    id: string
    title: string
    url: string
}

const data: Item[] = [
    { id: '1', title: 'Ürün 1', url: "https://biqmenu.com/kavuskafe/assets/uploads/urunler/9998b-_0041_kavus-18782.jpg" },
    { id: '2', title: 'Ürün 2', url: "https://biqmenu.com/kavuskafe/assets/uploads/urunler/9baaa-sahanda-sarimsakli-et.jpg" },
    { id: '3', title: 'Ürün 3', url: "https://biqmenu.com/kavuskafe/assets/uploads/urunler/9baaa-sahanda-sarimsakli-et.jpg" },
    { id: '4', title: 'Ürün 4', url: "https://biqmenu.com/kavuskafe/assets/uploads/urunler/9baaa-sahanda-sarimsakli-et.jpg" },
    { id: '5', title: 'Ürün 5', url: "https://biqmenu.com/kavuskafe/assets/uploads/urunler/9baaa-sahanda-sarimsakli-et.jpg" }
]

const ITEM_WIDTH = width * 0.3
const SPACING = 10

const AutoScrollingCarousel = () => {
    const flatListRef = useRef<FlatList<Item>>(null)
    const [currentIndex, setCurrentIndex] = useState(0)

    const infiniteData = [...data, ...data]

    useEffect(() => {
        const interval = setInterval(() => {
            let nextIndex = currentIndex + 1

            if (nextIndex >= infiniteData.length) {
                nextIndex = 0
                flatListRef.current?.scrollToOffset({ offset: 0, animated: false })
            }

            flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true })
            setCurrentIndex(nextIndex)
        }, 3000)

        return () => clearInterval(interval)
    }, [currentIndex])

    return (
        <View className="mt-5">
            <FlatList
                ref={flatListRef}
                data={infiniteData}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => item.id + '-' + index}
                getItemLayout={(data, index) => ({
                    length: ITEM_WIDTH + SPACING,
                    offset: (ITEM_WIDTH + SPACING) * index,
                    index,
                })}
                renderItem={({ item }) => (
                    <View className="mx-2" style={{ width: ITEM_WIDTH, marginRight: SPACING }}>
                        <Image
                            source={{ uri: item.url }}
                            style={{ width: '100%', height: 100, borderRadius: 15 }}
                            resizeMode="cover"
                        />
                        <Text className="mt-2 text-center text-lg font-semibold">{item.title}</Text>
                    </View>
                )}
            />
        </View>
    )
}

export default AutoScrollingCarousel
