import React from 'react'
import { View } from 'react-native'
import styles from '../styles/index'


const Divider = ({width}) => {
    return(
        <View style={[styles.divider, {width : width}]}/>
    )
}

export default Divider;