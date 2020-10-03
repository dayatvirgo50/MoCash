import React from 'react'
import DetailTransaction from '../component/DetailTransaction'

const DetailTransactionScreen = ({navigation,route}) =>{
    return (
        <DetailTransaction navigation={navigation} route={route}/>
    )
}
export default DetailTransactionScreen;