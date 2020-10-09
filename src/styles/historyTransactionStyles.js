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
    container: {
        flex: 1,
        backgroundColor: bgWhiteColor
    },
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
    headerContainer: {
        padding: scale(10),
        paddingLeft:0,
        marginVertical: scale(10),
        width: '100%',
        alignItems: 'center',
        backgroundColor: textLight,
        flexDirection: 'row',
        justifyContent:'space-evenly'
    },
    backIcon: {
        position: 'relative',
    },
    textHeader: {
        fontFamily: fontFamily,
        fontSize: 18,
        paddingLeft:10,
        width:'70%'
    },
    listContainer: {
        paddingVertical: '2%'
    },
    listHeader: {
        backgroundColor: bgWhiteColor,
        padding: scale(10),
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: dividerColor,
        width: '95%',
        alignSelf: 'center',
        marginVertical: verticalScale(5)
    },
    textHeaderList: {
        fontFamily: fontFamily,
        textAlign: "center",
        color: accentColor
    },
    bodyContainer: {
        width: '95%',
        alignSelf: 'center',
        paddingVertical: verticalScale(15)
    },
    dataListBodyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: scale(15),
        padding: scale(5),
        alignItems:'center'
    },
    textContentHeader: {
        fontFamily:fontFamily,
        color:primaryText
    },

    textContent: {
        fontFamily:fontFamilyBold,
        color:primaryColor
    },
    formRowHeader: {
        borderColor: dividerColor,
        borderWidth: 1,
        borderRadius: 8,
        width: '90%',
        flexDirection:'row',
        alignItems:'center',
        alignSelf:'center'
    },
    textInputSearch: {
        textAlign: 'center',
        color: primaryText,
        fontFamily: fontFamily,
    },
})

export default styles;