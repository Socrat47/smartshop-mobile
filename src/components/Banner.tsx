import { View, Text, Image } from 'react-native'
import React from 'react'

const Banner = () => {
    return (
        <Image className='w-full h-96' source={require('../../assets/banner.jpg')} />
    )
}

export default Banner