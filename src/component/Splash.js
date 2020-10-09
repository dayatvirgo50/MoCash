import React, {useEffect} from 'react'
import {View, Image,StatusBar} from 'react-native'
import TextFormatted from './Text'
import styles from '../styles/index'
import AsyncStorage from '@react-native-community/async-storage'


const Splash = ({navigation}) => {


    const checkAccount = () => {
        AsyncStorage.getItem('email').then(res => {
            if (!res) {
                navigation.replace('Auth')
            } else {
                navigation.navigate('MyTab')
            }
        })
    }

    useEffect(()=>{
        const timeOut = setTimeout(checkAccount,3000)

        return() =>{
            clearTimeout(timeOut);
        }
    })
    return(
        <View style={styles.splashContainer}>
            <StatusBar backgroundColor={styles.lightColor.color} barStyle='dark-content' animated showHideTransition='fade'/>
            <Image source={require('../assets/icons/logo-mocash.png')} style={styles.splashImage}/>
        </View>
    )
}

export default Splash;