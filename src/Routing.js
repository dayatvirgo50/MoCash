import React from 'react'
import { Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer'
import LoginScreen from './screen/LoginScreen'
import ForgotPasswordScreen from './screen/ForgotPasswordScreen'
import SplashScreen from './screen/SplashScreen'
import RegisterScreen from './screen/RegisterScreen'
import HomeScreen from './screen/HomeScreen'
import CheckOutScreen from './screen/CheckOutScreen'
import DetailTransactionScreen from './screen/DetailTransactionScreen'
import CustomDrawer from './component/CustomDrawer'
import HistoryTransactionScreen from './screen/HistoryTransactionScreen'
import AttendanceScreen from './screen/AttendanceScreen'
import Icons from 'react-native-vector-icons/AntDesign'
import styles from './styles/index';
import AttendanceSreen from './screen/AttendanceScreen';
import Tsc from './component/tsc'
import EscPos from './component/Test'
import Main from './component/main'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()


const MyTab = () => {
    return (
        <Drawer.Navigator drawerContentOptions={{ activeBackgroundColor: styles.primaryIcon.color, activeTintColor: '#FDFDFC',labelStyle:styles.textStyles}} drawerContent={(props => <CustomDrawer  {...props} />)}>
            <Drawer.Screen name='Home' component={HomeScreen} options={{
                title: 'Home',
                drawerIcon: ({ color, size, focused }) => <Icons
                    size={size}
                    name='home'
                    color={color}
                />
            }} 
            
            />
            <Drawer.Screen name='Attendance' component={AttendanceSreen} options={{
                title: 'Attendance',
                drawerIcon: ({ color, size, focused }) => <Icons
                    size={size}
                    name='calendar'
                    color={color}
                />
            }} />
            <Drawer.Screen name='Main' component={Main} options={{
                title: 'Print Test',
                drawerIcon: ({ color, size, focused }) => <Icons
                    size={size}
                    name='calendar'
                    color={color}
                />
            }} />
            <Drawer.Screen name='HistoryTransaction' component={HistoryTransactionScreen} options={{
                title: 'History Transaction',
                
                drawerIcon: ({ color, size, focused }) => <Image source={focused ? require('./assets/icons/historyTransactionActive.png'): require('./assets/icons/historyTransaction.png')} style={{width:25,height:25,resizeMode:'contain'}}
                
                />
            }} />
        </Drawer.Navigator>
    )
}



const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName='Login' >
            <Stack.Screen name='Register' component={RegisterScreen} options={{ title: 'Register', headerStyle: { elevation: 0 } }} />
            <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const StackNav = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Splash' screenOptions={({ navigation }) => ({ headerTitleStyle: { fontFamily: 'Century Gothic', color: '#212121' }, headerLeft: () => (<Icons name='left' size={25} color='#212121' onPress={() => navigation.goBack()} />), headerLeftContainerStyle: { paddingLeft: 8 } })}>
                <Stack.Screen name='Splash' component={SplashScreen} options={{ headerShown: false }} />
                <Stack.Screen name='Auth' component={AuthStack} options={{ headerShown: false }} />
                {/* <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} /> */}
                <Stack.Screen name='MyTab' component={MyTab} options={{ headerShown: false }} />
                <Stack.Screen name='CheckOut' component={CheckOutScreen} options={{ title: 'CheckOut', headerStyle: { elevation: 0 } }} />
                <Stack.Screen name='DetailReceipt' component={DetailTransactionScreen} options={{ headerShown: false }} />
                <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} options={{ title: 'Forgot Password', headerStyle: { elevation: 0 } }} />
                <Stack.Screen name='Tsc' component={Tsc} options={{ title: 'Forgot Password', headerStyle: { elevation: 0 } }} />
                <Stack.Screen name='EcsPos' component={EscPos} options={{ title: 'Forgot Password', headerStyle: { elevation: 0 } }} />
                <Stack.Screen name='Main' component={Main} options={{ title: 'Forgot Password', headerStyle: { elevation: 0 } }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default StackNav;