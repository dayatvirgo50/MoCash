import React, { useEffect, useState } from 'react'
import { View, TextInput, StatusBar, Image, TouchableOpacity, ScrollView } from 'react-native'
import styles from '../styles/index'
import { checkEmail } from '../commons/validation'
import TextFormatted from './Text'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorge from '@react-native-community/async-storage'


const Login = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errPass, setErrPass] = useState(false)
    const [errMail, setErrMail] = useState(false)

    const Login = () => {
        if (email !== '' & password !== '') {
            setErrMail(false)
            setErrPass(false)
            AsyncStorge.setItem('email' , email)
            AsyncStorge.setItem('password', password)
            navigation.navigate('Home')
        } else if (email == '' & password !== '') {
            setErrMail(true)
        } else if (email !== '' & password == '') {
            setErrPass(true)
        } else {
            setErrMail(true)
            setErrPass(true)
        }
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <StatusBar backgroundColor={styles.lightColor.color} barStyle='dark-content' animated showHideTransition='fade' />
            {/* header */}
            <View style={styles.headerLogin}>
                <Image source={require('../assets/icons/HeaderLogin.png')} style={styles.loginImage} />
            </View>
            {/* End Header */}

            {/* Form */}
            <View style={styles.loginForm}>
                <View style={errMail ? styles.formRowErr : styles.formRow}>
                    <TextInput placeholder='Email Address' style={[styles.textStyles, errMail ? styles.textInputLoginErr : styles.textInputLogin]} onChangeText={value => setEmail(value)} keyboardType='email-address' value={email} onEndEditing={() => checkEmail(email) ? setErrMail(true) : setErrMail(false)} />
                </View>
                {errMail ?
                    <View style={styles.errMailContainer}>
                        <Icons name='close' size={20} color={styles.errColor.color} />
                        <TextFormatted style={styles.errText}>Please Enter a Valid Email Address</TextFormatted>
                    </View>
                    : null}
                <View style={errPass ? styles.formRowErr : styles.formRow}>
                    <TextInput placeholder='Password' style={[styles.textStyles, errPass ? styles.textInputLoginErr : styles.textInputLogin]} textAlignVertical='center' secureTextEntry onChangeText={value => setPassword(value)} value={password} />
                </View>

                {/* Validation Message */}
                {
                    errMail && errPass ?
                        <View style={styles.errMailContainer}>
                            <Icons name='close' size={20} color={styles.errColor.color} />
                            <TextFormatted style={styles.errText}>Wrong Email Or Password</TextFormatted>
                        </View> :
                        errPass ? <TextFormatted style={styles.errText}>Enter Password</TextFormatted> :
                            errMail && email == '' ? <TextFormatted style={styles.errText}>Enter Email</TextFormatted> :
                                null
                }



                {/* Button */}
                <TouchableOpacity style={styles.btnLogin} activeOpacity={0.7} onPress={Login}>
                    <TextFormatted style={styles.textBtnLogin}>Login</TextFormatted>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                    <TextFormatted style={styles.forgotPasswordText}>Forgot Password ?</TextFormatted></TouchableOpacity>
                <TextFormatted style={{ textAlign: 'center' }}>Or</TextFormatted>

                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <TextFormatted style={styles.footerText}>Create New Account</TextFormatted>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Login;