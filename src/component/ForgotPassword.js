import React, { useState, useEffect } from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import styles from '../styles/index'
import TextFormatted from '../component/Text'
import Loading from '../component/Loading'


const ForgotPassword = ({navigation}) => {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')

    const resetPassword = () => {
        setLoading(true)
        const timeOut = setTimeout(() => setLoading(false), 3000)
    }



    return (
        <View style={styles.containerForgotPassword}>
            {/* <Modal visible={loading} transparent> */}
                <Loading loading={loading} />
            {/* </Modal> */}
            <View style={styles.formRow}>
                <TextInput style={styles.textInputLogin} placeholder='Email Address' onChangeText={value => setEmail(value)} value={email} keyboardType='email-address'/>
            </View>
            <TouchableOpacity style={styles.btnForgot} onPress={resetPassword}>
                <TextFormatted style={styles.textBtnLogin}>Send Link Reset</TextFormatted>
            </TouchableOpacity>
        </View>
    )
}

export default ForgotPassword;