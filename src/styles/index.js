import React from 'react'
import { StyleSheet } from 'react-native'
import { scale, moderateScale, verticalScale } from 'react-native-size-matters'


export const bgWhiteColor = '#FDFDFC'
export const primaryColor = '#64b497'
export const accentColor = '#B9A16B'
export const primaryText = '#212121'
export const dividerColor = '#E3E5E9'
export const textLight = '#FDFDFC'
export const errColor = '#F44336'
export const fontFamily = 'Century Gothic'
export const fontFamilyBold = 'Century Gothic Bold'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: bgWhiteColor
    },
    divider:{
        borderWidth:1,
        borderColor:dividerColor,
        alignSelf:'center'
    },
    formRowHeader: {
        borderColor: dividerColor,
        borderWidth: 1,
        borderRadius: 20,
        width: '80%',
        flexDirection:'row',
        alignItems:'center'
    },
    header: {
        padding: scale(10),
        margin: scale(10)
    },
    title: {
        fontFamily: fontFamily,
        fontSize: 28,
        textAlign: 'center'
    },
    imageListProduct: {
        width: '100%',
        height: 120,
        resizeMode: 'contain'
    },
    body: {
        paddingBottom: 60
    },
    headerImageContainer:{
        padding: scale(10),
        height: verticalScale(100),
        justifyContent: 'center'
    },
    headerImage:{
        width: '100%',
        height: verticalScale(80),
        resizeMode: 'contain'
    },
    headerForm:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    itemProductContainer: {
        width: '45%',
        margin: scale(5),
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: bgWhiteColor,
        borderColor: dividerColor
    },
    checkOutBtn: {
        backgroundColor: primaryColor,
        width: '80%',
        padding: moderateScale(10),
        elevation: 3,
        borderRadius: 10,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 10
    },
    iconSelected: {
        position: 'relative',
        alignItems: 'flex-end',
        zIndex: 1,
        width: '100%',
    },
    textStyles: {
        fontFamily: 'Century Gothic'
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
    // Splash Style
    splashContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: bgWhiteColor
    },
    loadingText: {
        fontSize: 25,
        textAlign: 'center'
    },
    splashImage: {
        width: moderateScale(120),
        height: verticalScale(120),
        resizeMode: 'contain'
    },

    // Login Style
    loginImage: {
        width: '100%',
        height: verticalScale(120),
        resizeMode: 'contain'
    },
    headerLogin: {
        padding: scale(10),
        height: verticalScale(200),
        justifyContent: 'center'
    },
    loginForm: {
        height: verticalScale(320),
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: scale(10),
        borderBottomColor: dividerColor,
        borderBottomWidth: 1
    },
    formRow: {
        borderColor: dividerColor,
        borderWidth: 1,
        borderRadius: 20
    },
    textInputLogin: {
        textAlign: 'center',
        color: primaryText,
        fontFamily: fontFamily,
    },
    btnLogin: {
        backgroundColor: primaryColor,
        width: moderateScale(120),
        padding: scale(8),
        alignSelf: 'center',
        borderRadius: 20,
        elevation: 3,
        margin: verticalScale(10)
    },
    textBtnLogin: {
        color: textLight,
        textAlign: 'center',
        fontSize: moderateScale(15, 0.4),
        fontFamily: fontFamily
    },
    forgotPasswordText: {
        color: accentColor,
        textAlign: 'center',
        fontFamily: fontFamilyBold
    },

    footer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: fontFamily
    },
    footerText: {
        color: primaryText,
        textAlign: 'center',
        fontFamily: fontFamilyBold
    },

    // Login - Error Input Login
    formRowErr: {
        borderColor: errColor,
        borderWidth: 1,
        borderRadius: 20
    },
    textInputLoginErr: {
        textAlign: 'center',
        color: errColor
    },
    errMailContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    errText: {
        color: errColor,
        fontFamily: fontFamily
    },

    // Forgot Password
    containerForgotPassword: {
        flex: 1,
        paddingTop: scale(30),
        paddingHorizontal: scale(10),
        backgroundColor: bgWhiteColor
    },
    btnForgot: {
        backgroundColor: primaryColor,
        width: moderateScale(150),
        padding: scale(8),
        marginTop: scale(10),
        alignSelf: 'flex-end',
        borderRadius: 20,
        elevation: 3
    },
    LoadingContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    // Register
    headerRegister: {
        alignSelf: 'center',
        flexDirection: 'row',
        width: '55%',
        padding: scale(10),
        justifyContent: 'center'
    },

    containerIconRegister: {
        backgroundColor: '#fff',
        borderRadius: 20,
        width: scale(37),
        height: scale(37),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        marginLeft: -50,
        marginBottom: 30,
    },
    containerIconRegisterNoBg: {
        backgroundColor: accentColor,
        borderRadius: 20,
        width: scale(37),
        height: scale(37),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        marginLeft: -50,
        marginBottom: 30,
        borderColor: accentColor,
        borderWidth: 1
    },
    iconRegister: {
        padding: -3,
        margin: -3,
    },
    photoContainer: {
        padding: 15,

    },
    photoRegister: {
        padding: -3,
        margin: -3,
        width: moderateScale(160),
        height: verticalScale(170),
        borderRadius: 90
    },
    iconPerson: {
        paddingLeft: -10,
    },

    // CheckOutScreen
    checkOutContainer:{
        width:'90%',
        alignSelf:'center'
    },
    checkOutItemContainer:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        marginVertical:scale(8)
    },
    checkOutItemQty:{
        flexDirection:'row',
        justifyContent:'space-around',
        width:'35%'
    },
    checkOutItemHarga:{
        width:'20%',
    },
    checkOutItemName:{
        width:'25%'
    },
    totalContainer:{
        alignItems:'flex-end',
        width:'100%',
        borderWidth:1,
        backgroundColor:dividerColor,
        elevation:3,
        borderRadius:5,
        borderColor:dividerColor
    },
    total:{
        fontFamily:fontFamilyBold
    },
    itemHargaRow:{
        flexDirection:'row',
        width:'100%',
        paddingHorizontal:moderateScale(15),
    },
    rowHargaLeft:{
        width:'70%',
        alignSelf:'flex-start'
    },
    containerInputCash:{
        borderColor: dividerColor,
        borderWidth: 1,
        borderRadius:10
    },
    containerTotalCash:{
        marginVertical:verticalScale(15)
    },
    changeContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    changeTextLabel:{
        fontFamily:fontFamily
    },
    changeTextLabelContainer:{
        width:'30%'
    },
    changeTextPrice:{
        width:'70%'
    },
    changeText:{
        fontSize:30,
        fontFamily:fontFamily,
        textAlign:'right'
    },
    
    // Detail Transaction

    headerDetailTransaction:{
        alignItems:'center'
    },
    animationImage:{
        width:'50%',
        height:150,
    },
    btnContainer:{
        alignItems:'center'
    },
    btnSend:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-around',
        marginVertical:verticalScale(15)
    },
    btnPDF:{
        backgroundColor:accentColor,
        flexDirection:'row',
        padding:scale(10),
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        width:'35%',
        elevation:3
    },
    btnPrint:{
        backgroundColor:bgWhiteColor,
        flexDirection:'row',
        width:'22%',
        alignItems:'center',
        justifyContent:'center',
        padding:scale(10),
        borderRadius:10,
        elevation:3,
        borderWidth:1,
        borderColor:dividerColor
    },
    btnEmail:{
        backgroundColor:primaryText,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        padding:scale(10),
        borderRadius:10,
        elevation:3,
        width:'35%'
    },
    btnCancelContainer:{
        marginVertical:verticalScale(10)
    },
    btnCancel:{
        backgroundColor:primaryColor,
        padding:scale(10),
        elevation:3,
        borderRadius:20
    }
})

export default styles;