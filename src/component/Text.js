import React from 'react'
import {Text} from 'react-native'
import styles from '../styles'

const TextFormatted = ({children ,style}) => {
    
    return(
    <Text style={style || styles.textStyles}>{children}</Text>
    )
}

export default TextFormatted;