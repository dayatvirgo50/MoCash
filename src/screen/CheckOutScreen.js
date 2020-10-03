import React from 'react'
import CheckOut from '../component/Checkout'


const CheckOutScreen = ({route, navigation}) => {
    return(
        <CheckOut navigation={navigation} route={route}/>
    )
}
export default CheckOutScreen;