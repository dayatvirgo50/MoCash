import React from 'react'
import { ActivityIndicator, View, Modal } from 'react-native'
import styles from '../styles/index'

const Loading = ({ loading }) => {
    return (
        <View>
            <Modal visible={loading} transparent>
                <View style={styles.LoadingContainer}>
                    <ActivityIndicator animating={loading} color={styles.primaryIcon} size='large' />
                </View>
            </Modal>
        </View>
    )
}

export default Loading;