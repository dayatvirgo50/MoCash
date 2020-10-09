import React  from 'react'
import { View, Image } from 'react-native'
import styles from '../styles/drawerStyles'
import {
    DrawerItem,
    DrawerContentScrollView,
    DrawerItemList
} from '@react-navigation/drawer';
import TextFormatted from '../component/Text'
import Divider from '../component/Divider'
import Icons from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-community/async-storage'



const CustomDrawer = (props) => {

    const logout = async() => {
        await AsyncStorage.clear().then(
            props.navigation.navigate('Auth')
        )
    }


    return (
        <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
                <View style={{ height: 200, marginTop: 10 }}>
                    <View style={{ height: 140, alignItems: 'center' }}>
                        <Image source={require('../assets/images/user.jpg')} style={{ width: 120, height: 120, resizeMode: 'cover', borderRadius: 60 }} />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <TextFormatted>Cashier 1</TextFormatted>
                        <TextFormatted>lsdayat@gmail.com</TextFormatted>
                        <TextFormatted>Your Shift : 16:00 - 22:00</TextFormatted>
                    </View>
                </View>
                <Divider width='100%' />
                {/* Container Drawer Item */}
                <DrawerItemList {...props} />
                <DrawerItem
                    label='Logout'
                    labelStyle={styles.textStyles}
                    icon={({focused,size,color})=>(
                        <Icons name='poweroff' color={color} size={size}/>
                    )}
                    onPress={logout}
                />
        </DrawerContentScrollView>
    )
}

export default CustomDrawer;