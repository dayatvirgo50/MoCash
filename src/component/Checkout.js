import React, { useEffect, useState } from 'react'
import { View, ScrollView, FlatList, Image, TouchableOpacity, Keyboard , NativeModules} from 'react-native'
import Icons from 'react-native-vector-icons/AntDesign'
import styles from '../styles/index'
import TextFormatted from '../component/Text'
import Divider from '../component/Divider'
import { TextInputMask } from 'react-native-masked-text'

const CheckOut = ({ route, navigation }) => {
    const [productList, setProductList] = useState([])
    const [total, setTotal] = useState(0)
    const [cash, setCash] = useState(0)
    const [visibleKeyboard, setVisibleKeyboard] = useState(false)
    const [visibleChange, setVisibleChange] = useState(false)


    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setVisibleKeyboard(true);
        })

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setVisibleKeyboard(false);
        })

        const { product } = route.params;
        const checkOut = []
        let subTotal = 0
        product.map(item => {
            subTotal = parseInt(subTotal) + parseInt(item.harga)
            checkOut.push({ id: item.id, name: item.name, harga: item.harga, qty: 1, stok: item.stok })
        })
        const loadData = async () => {
            const result = await product
            setProductList(checkOut)
        }

        setTotal(subTotal)
        loadData();

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        }
    }, []);


    const addQty = (id, harga) => {
        const listProduct = [...productList]
        listProduct[id].qty += 1
        let addTotal = parseInt(total) + parseInt(harga)
        setProductList(listProduct)
        setTotal(addTotal)
    }

    const minQty = (id, harga) => {
        const listProduct = [...productList]
        listProduct[id].qty -= 1
        let minTotal = parseInt(total) - parseInt(harga)
        setProductList(listProduct)
        setTotal(minTotal)
    }

    
    const checkOut = () => {
        if(cash == 0){
            alert('Enter Total Cash')
        } else if(cash - (total - (total * 0.1)) < 0){
            alert('Ca\'nt CheckOut , Cash not enough')
        } else {
            navigation.replace('DetailReceipt',{product : productList})
        }
    }


    return (
        <View style={styles.container}>
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: 70 }}>
                <View style={styles.headerImageContainer}>
                    <Image source={require('../assets/icons/HeaderLogin.png')} style={styles.headerImage} />
                </View>
                <View style={styles.header}>
                    <TextFormatted>Items : </TextFormatted>
                </View>
                <Divider width={'90%'} />
                <View style={styles.checkOutContainer}>
                    <FlatList
                        data={productList}
                        contentContainerStyle={{ width: '100%' }}
                        renderItem={({ item, index }) => (
                            <View key={index} style={styles.checkOutItemContainer}>
                                <View style={styles.checkOutItemName}>
                                    <TextFormatted>{item.name}</TextFormatted>
                                </View>
                                <View style={styles.checkOutItemQty}>
                                    <Icons name='pluscircleo' size={20} color={styles.accentColor.color} onPress={() => { item.qty >= item.stok ? alert('No More Stock for this product') : addQty(index, item.harga) }} />
                                    <TextFormatted>{item.qty}</TextFormatted>
                                    <Icons name='minuscircleo' size={20} color={styles.accentColor.color} onPress={() => { item.qty === 0 ? null : minQty(index, item.harga) }} />
                                </View>
                                <View style={styles.checkOutItemHarga}>
                                    <TextFormatted>Rp {item.harga}</TextFormatted>
                                </View>
                            </View>
                        )}
                        keyExtractor={item => item.id.toString()}
                    />
                    <Divider width={'100%'} />
                    <View style={styles.totalContainer}>
                        <View style={styles.itemHargaRow}>
                            <View style={styles.rowHargaLeft}>
                                <TextFormatted style={styles.total}>Total</TextFormatted>
                            </View>
                            <View style={styles.rowHargaRight}>
                                <TextFormatted style={styles.totalText}> : Rp {total}</TextFormatted>
                            </View>
                        </View>
                        <View style={styles.itemHargaRow}>
                            <View style={styles.rowHargaLeft}>
                                <TextFormatted style={styles.total}>Tax</TextFormatted>
                            </View>
                            <View style={styles.rowHargaRight}>
                                <TextFormatted style={styles.totalText}> : Rp {total * 0.1}</TextFormatted>
                            </View>
                        </View>
                        <View style={styles.itemHargaRow}>
                            <View style={styles.rowHargaLeft}>
                                <TextFormatted style={styles.total}>Grand Total</TextFormatted>
                            </View>
                            <View style={styles.rowHargaRight}>
                                <TextFormatted style={styles.totalText}> : Rp {total - (total * 0.1)}</TextFormatted>
                            </View>
                        </View>
                    </View>
                    <View style={styles.containerTotalCash}>
                        <View>
                            <TextFormatted>Total Cash : </TextFormatted>
                        </View>
                        <View style={styles.containerInputCash}>
                            <TextInputMask
                                type={'money'}
                                options={{
                                    precision: 0,
                                    separator: ',',
                                    delimiter: '.',
                                    unit: 'Rp',
                                    suffixUnit: ''
                                }}
                                value={cash}
                                includeRawValueInChangeText={true}
                                onChangeText={(text, rawText) => {
                                   setCash(rawText)
                                }}
                                style={styles.textInputLogin}
                                placeholder='Enter Total Cash'
                                onEndEditing={cash !== '' && cash !== 0 ? () => setVisibleChange(true) : () => setVisibleChange(false)}
                                keyboardType='number-pad'
                            />
                            
                        </View>
                    </View>

                    {
                        visibleChange ? <View style={styles.changeContainer}>
                            <View style={styles.changeTextLabelContainer}>
                                <TextFormatted style={styles.changeTextLabel}>Total Change :</TextFormatted>
                            </View>
                            <View style={styles.changeTextPrice}>
                                <TextFormatted style={styles.changeText}>
                                    Rp {cash - (total - (total * 0.1))}
                                </TextFormatted>
                            </View>
                        </View> : null
                    }

                </View>
            </ScrollView>
            {
                visibleKeyboard ? null : <TouchableOpacity style={styles.checkOutBtn} onPress={checkOut}>
                    <TextFormatted style={styles.textBtnLogin}>CheckOut</TextFormatted>
                </TouchableOpacity>
            }

        </View>
    )
}

export default CheckOut;