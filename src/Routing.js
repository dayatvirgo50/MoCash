import React from 'react'
import {Image} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import LoginScreen from './screen/LoginScreen'
import ForgotPasswordScreen from './screen/ForgotPasswordScreen'
import SplashScreen from './screen/SplashScreen'
import RegisterScreen from './screen/RegisterScreen'
import HomeScreen from './screen/HomeScreen'
import CheckOutScreen from './screen/CheckOutScreen'
import DetailTransactionScreen from './screen/DetailTransactionScreen'
import Icons from 'react-native-vector-icons/AntDesign'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()


const MyTab = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name='Home' component={HomeScreen} options={{
                title:'Home',
                drawerIcon:({})=>(
                    <Image source={require('./assets/icons/images/Home.png')} style={{width:30,height:30}}/>
                )
            }}/>
            <Drawer.Screen name='ForgotPassword' component={ForgotPasswordScreen} options={{
                title:'Cashier',
                drawerIcon:({})=>(
                    <Image source={require('./assets/icons/images/person.png')} style={{width:30,height:30}}/>
                )
            }}/>
        </Drawer.Navigator>
    )
}

const StackNav = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Splash' screenOptions={({ navigation }) => ({ headerTitleStyle: { fontFamily: 'Century Gothic', color: '#212121' }, headerLeft: () => (<Icons name='left' size={25} color='#212121' onPress={() => navigation.goBack()} />), headerLeftContainerStyle: { paddingLeft: 8 } })}>
                <Stack.Screen name='Splash' component={SplashScreen} options={{ headerShown: false }} />
                <Stack.Screen name='Register' component={RegisterScreen} options={{ title: 'Register', headerStyle: { elevation: 0 } }} />
                <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
                {/* <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} /> */}
                <Stack.Screen name='MyTab' component={MyTab} options={{ headerShown: false }} />
                <Stack.Screen name='CheckOut' component={CheckOutScreen} options={{ title: 'CheckOut', headerStyle: { elevation: 0 } }} />
                <Stack.Screen name='DetailReceipt' component={DetailTransactionScreen} options={{ headerShown: false }} />
                <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} options={{ title: 'Forgot Password', headerStyle: { elevation: 0 } }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default StackNav;