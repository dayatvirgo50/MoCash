import React, { useState, useEffect, useRef } from 'react'
import { View, TouchableOpacity, FlatList, Image, TextInput, ScrollView, StatusBar, Alert, BackHandler, PermissionsAndroid, Modal, Platform, ActivityIndicator } from 'react-native'
import styles, { Height, primaryColor } from '../styles/index'
import TextFormatted from '../component/Text'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import Divider from '../component/Divider'
import {
    useFocusEffect
} from '@react-navigation/native';
import { RNCamera } from 'react-native-camera'
import BarcodeMask from 'react-native-barcode-mask';

const Home = ({ navigation }) => {
    const dummyProduct = [
        // {
        //     id: 1,
        //     name: 'Nasi Goreng',
        //     harga: '10000',
        //     gambar: require('../assets/images/product/makanan/nasiGoreng.jpg'),
        //     selected: false,
        //     kategori: 'Makanan',
        //     stok: 10,
        //     tanggalDitambahkan: '29/09/2020'
        // },
        // {
        //     id: 2,
        //     name: 'Mie Goreng',
        //     harga: '10000',
        //     gambar: require('../assets/images/product/makanan/mieGoreng.jpg'),
        //     selected: false,
        //     kategori: 'Makanan',
        //     stok: 15,
        //     tanggalDitambahkan: '29/09/2020'
        // },
        // {
        //     id: 3,
        //     name: 'Teh Manis Dingin',
        //     harga: '6000',
        //     gambar: require('../assets/images/product/minman/iceTea.png'),
        //     selected: false,
        //     kategori: 'Minuman',
        //     stok: 20,
        //     tanggalDitambahkan: '29/09/2020'
        // },
        // {
        //     id: 4,
        //     name: 'Kopi Dingin',
        //     harga: '7000',
        //     gambar: require('../assets/images/product/minman/iceCoffee.jpg'),
        //     selected: false,
        //     kategori: 'Minuman',
        //     stok: 10,
        //     tanggalDitambahkan: '29/09/2020'
        // },
        // {
        //     id: 5,
        //     name: 'Kopi Dingin',
        //     harga: '7000',
        //     gambar: require('../assets/images/product/minman/iceCoffee.jpg'),
        //     selected: false,
        //     kategori: 'Minuman',
        //     stok: 10,
        //     tanggalDitambahkan: '29/09/2020'
        // },
    ]
    const [product, setProduct] = useState(dummyProduct)
    const [selectedProduct, setSelectedProduct] = useState([])
    const [search, setSearch] = useState('')
    const [openScanner, setOpenScanner] = useState(false)
    const [loading, setLoading] = useState(true)
    var camera = useRef(null)



    const selectedIcons = (index, selected, item) => {
        const dataProduct = [...product]
        dataProduct[index].selected = !selected
        if (dataProduct[index].selected) {
            selectedProduct.push(item)
        } else {
            selectedProduct.splice(selectedProduct.indexOf(item), 1)
        }
        setProduct(dataProduct)
    }


    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                Alert.alert(
                    "Exit App",
                    "Do you want to exit?",
                    [
                        {
                            text: "No",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "Yes", onPress: () => BackHandler.exitApp() }
                    ],
                    { cancelable: false }
                );
                // Return true to stop default back navigaton
                // Return false to keep default back navigaton
                return true;
            };

            const addListener = navigation.addListener('blur', () => {
                const dataProduct = [...product]
                dataProduct.map(item => {
                    item.selected = false
                })
                setProduct(dataProduct)
                setSelectedProduct([])
            })

            // Add Event Listener for hardwareBackPress
            BackHandler.addEventListener(
                'hardwareBackPress',
                onBackPress
            );

            return () => {
                // Once the Screen gets blur Remove Event Listener
                addListener;
                BackHandler.removeEventListener(
                    'hardwareBackPress',
                    onBackPress
                );
            };
        }, [navigation]),
    );


    const permissions = () => {
        async function requestCameraPermission() {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'MoCash App Camera Permission',
                        message:
                            'MoCash App needs access to your Camera ',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    //If WRITE_EXTERNAL_STORAGE Permission is granted
                    //changing the state to show Create PDF option
                    setOpenScanner(true)
                } else {
                    alert('Camera permission denied');
                }
            } catch (err) {
                alert('Camera permission err', err);
                console.warn(err);
            }
        }

        if (Platform.OS = 'android') {
            requestCameraPermission();
        } else {
            setOpenScanner(true);
        }
    }


    const takePicture = async () => {
        if (camera) {
            const options = { quality: 0.5, base64: true };
            const data = await camera.takePictureAsync(options);
            console.log(data.uri);
        }
    };

    function renderView() {
        if (loading) {
           return <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, alignSelf: 'center', margin: 5, marginTop: '25%' }}>
                {/* <View style={{ borderWidth: 1 }}> */}
               <ActivityIndicator color={primaryColor} size={'large'}/>
                {/* </View> */}
            </View>
        }
        else {
            if (product.length === 0) {
                return <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, alignSelf: 'center', margin: 5, marginTop: '25%' }}>
                    {/* <View style={{ borderWidth: 1 }}> */}
                    <Image source={require('../assets/icons/NoProduct.png')} style={{ resizeMode: 'contain', height: 140 }} />
                    <TextFormatted>No Product Available</TextFormatted>
                    {/* </View> */}
                </View>
            } else {
                return <FlatList
                    data={product}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    contentContainerStyle={{ width: '100%' }}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity key={index} style={styles.itemProductContainer} onPress={() => { selectedIcons(index, item.selected, item) }} >
                            <View style={styles.iconSelected}>
                                {
                                    item.selected ?
                                        <Icons name='check-circle' size={22} color={styles.accentColor.color} onPress={() => selectedIcons(index, item.selected, item)} /> :
                                        <Icons name='circle-outline' size={22} color={styles.accentColor.color} onPress={() => selectedIcons(index, item.selected, item)} />
                                }
                            </View>
                            <View style={styles.imageListProductContainer}>
                                <Image source={item.gambar} style={styles.imageListProduct} />
                            </View>
                            <TextFormatted>{item.name}</TextFormatted>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id.toString()}
                />
            }
        }


    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={styles.lightColor.color} barStyle='dark-content' animated showHideTransition='fade' />
            <Modal visible={openScanner} animationType='slide' style={{ height: 400 }}>
                <View style={{ flex: 1 }}>
                    <RNCamera
                        ref={ref => {
                            camera = ref;
                        }}
                        type={RNCamera.Constants.Type.back}
                        style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
                        flashMode={RNCamera.Constants.FlashMode.off}
                        androidCameraPermissionOptions={{
                            title: 'Permission to use camera',
                            message: 'We need your permission to use your camera',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                        androidRecordAudioPermissionOptions={{
                            title: 'Permission to use audio recording',
                            message: 'We need your permission to use your audio',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}

                        onGoogleVisionBarcodesDetected={({ barcodes }) => {
                            if (barcodes[0].type === 'UNKNOWN_FORMAT') {
                                alert('Barcode not Detect')
                                // setOpenScanner(false)
                            } else if (barcodes[0].data.includes('www')) {
                                alert('Not Support Link')
                            }
                            else {
                                setSearch(barcodes[0].data)
                                setOpenScanner(false)
                            }
                        }}
                    >
                        <BarcodeMask />
                    </RNCamera>
                    <View style={{ flex: 0, justifyContent: 'center' }}>
                        <TouchableOpacity onPress={takePicture} style={{ borderWidth: 1, borderColor: styles.dividerColor, padding: 10, alignItems: 'center', marginVertical: 5 }}>
                            <TextFormatted style={{ fontSize: 14 }}> Take </TextFormatted>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setOpenScanner(false)} style={{ borderWidth: 1, borderColor: styles.dividerColor, padding: 10, alignItems: 'center', marginVertical: 5 }}>
                            <TextFormatted style={{ fontSize: 14 }}> Cancel </TextFormatted>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} keyboardShouldPersistTaps='always' nestedScrollEnabled={true}>
                <View style={styles.header}>
                    <Icons name='menu' size={30} color={styles.primaryIcon.color} style={{ position: 'absolute' }} onPress={() => navigation.openDrawer()} />
                    <View style={styles.headerImageContainer}>
                        <Image source={require('../assets/icons/HeaderLogin.png')} style={styles.headerImage} />
                    </View>
                    <View style={styles.headerForm}>
                        <View style={styles.formRowHeader}>
                            <View style={{ width: '90%' }}>
                                <TextInput style={styles.textInputLogin} placeholder='Search Product' value={search} onChangeText={value => setSearch(value)} keyboardType='number-pad' />
                            </View>
                            {
                                search !== '' ?
                                    <View>
                                        <Icons name='close' size={20} color={styles.primaryIcon.color} onPress={() => setSearch('')} />
                                    </View> : null
                            }
                        </View>
                        <Icons name='barcode-scan' size={42} color={styles.primaryIcon.color} onPress={permissions} />
                    </View>

                </View>
                <View style={styles.body}>
                    <Divider width={'90%'} />
                    <TextFormatted style={styles.title}>Product List : </TextFormatted>
                    <Divider width={'90%'} />
                    {
                        renderView()
                    }

                </View>
            </ScrollView>
            {
                selectedProduct.length !== 0 ?

                    <TouchableOpacity style={styles.checkOutBtn} onPress={() => navigation.navigate('CheckOut', { product: selectedProduct })}>
                        <TextFormatted style={styles.textBtnLogin}>Check Out {selectedProduct.length} Items</TextFormatted>
                    </TouchableOpacity>

                    :
                    null
            }

        </View>
    )
}

export default Home;