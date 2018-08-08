import React from 'react'
import { View, Image } from 'react-native'
import style from './style'

const ProfileBackground = ({ bgColor, bgImage }) => {
  return (
    <View>
      {
        bgImage &&
        <Image
          source={{ uri: bgImage }}
          style={style.image}
        />
      }
      {
        bgColor &&
        <View
          style={[
            style.bg,
            { backgroundColor: `#${bgColor}`},
            bgImage && { opacity: 0.3 },
            ]}
        />
      }
    </View>
  )
}

export default ProfileBackground
