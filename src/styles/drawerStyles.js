import React from 'react'
import { StyleSheet } from 'react-native'
import { scale, moderateScale, verticalScale } from 'react-native-size-matters'


const bgWhiteColor = '#FDFDFC'
const primaryColor = '#64b497'
const accentColor = '#B9A16B'
const primaryText = '#212121'
const dividerColor = '#E3E5E9'
const textLight = '#FDFDFC'
const errColor = '#F44336'
const fontFamily = 'Century Gothic'
const fontFamilyBold = 'Century Gothic Bold'

const styles = StyleSheet.create({
    primaryIcon: {
        color: primaryColor
    },
    accentColor: {
        color: accentColor
    },
    errColor: {
        color: errColor
    },
    lightColor: {
        color: textLight
    },
    dividerColor: {
        color: dividerColor
    },
     textStyles: {
        fontFamily: 'Century Gothic'
    },
})

export default styles;