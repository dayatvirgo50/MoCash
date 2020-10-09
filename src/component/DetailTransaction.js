import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, ScrollView, BackHandler, PermissionsAndroid, Platform, Linking, ToastAndroid } from 'react-native'
import TextFormatted from '../component/Text'
import styles from '../styles/index'
import LottiView from 'lottie-react-native';
import Icons from 'react-native-vector-icons/AntDesign'
import RNHTMLtoPDF from 'react-native-html-to-pdf'

const DetailTransaction = ({ navigation, route }) => {

    const [filePath, setFilePath] = useState('')
    const [date, setDate] = useState('')
    const [idTransaction, setIdTransaction] = useState('')
    const [productList, setProductList] = useState(route.params.product)



    // ${productList.map((item, index) => (
    //     `<tr>
    //         <td style="width: 75%;">${item.qty} ${item.name}</td>
    //         <td>Rp ${item.harga}</td>
    //     </tr>`
    // )
    // )
    //     }

    async function createPDF() {
        let total = 0
        productList.map(item => {
            total = parseInt(total) + parseInt(item.harga)
        })
        let x = '<tr>'
        const product = await productList
        const loop = () => {
            for (var i = 0; i < product.length; i++) {
                x = x + '<td style="width: 45%;">' + product[i].name + '</td> <td style="text-align:right;"> Rp ' + product[i].harga + '</td>'
                x = x + '</tr>';
            }
            return x;
        }


        const html = `
        <html>
        <div style="width: 303px;margin-right: auto;margin-left: auto;">
    <h1 style="text-align: center;">
        <strong>Outlet Name</strong></h1>
    <p style="text-align: center;">
        <strong>Jl.Gajah Mada, No.1</strong>
    <p style="text-align: center;">www.mocash.com</p>
    </p>
    <div style="text-align:center">
        <p>Cashier : Cashier 1</p>
        ===============================<br />
        Transaction ID : ${idTransaction} <br />
        ${date}<br />
        ===============================<br />
    </div>
    <div
        style="text-align: center;justify-content: center;width: 100%;margin-left: auto;margin-right: auto;">
        <table style="margin-left:auto;margin-right:auto; width: 90%;">
        
        ${loop()
            }
           
        </table>
        ===============================
        <table style="margin-left:auto;margin-right:auto; width: 90%;">
            <tr>
                <td style="width: 45%;">Subtotal</td>
                <td style="text-align: right;">Rp ${total}</td>
            </tr>
            <tr>
                <td>Tax</td>
                <td style="text-align: right;">Rp ${total * 0.1}</td>
            </tr>
        </table>
        ===============================
        <table style="margin-left:auto;margin-right:auto; width: 90%;">
            <tr>
                <td style="font-weight: bold;">Total</td>
                <td style="text-align: right;">Rp ${total - (total * 0.1)}</td>
        </tr>
    </table>
    <div>
        <p>-------Thank You--------</p>
    </div>
</div>
</div>
</html>`
        let options = {
            //Content to print
            html: html,
            //File Name
            fileName: `Transaction - ${idTransaction}`,
            //File directory
            directory: 'docs',
        };
        let file = await RNHTMLtoPDF.convert(options);
        setFilePath(file.filePath)
        ToastAndroid.show(`Success Create PDF to : ${file.filePath}`, ToastAndroid.LONG)
        Linking.openURL(`file://${file.filePath}`).catch((err) => {
            console.log(err)
        })
    }


    const permissions = () => {
        async function requestExternalWritePermission() {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'MoCash App External Storage Write Permission',
                        message:
                            'MoCash App needs access to Storage data in your SD Card ',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    //If WRITE_EXTERNAL_STORAGE Permission is granted
                    //changing the state to show Create PDF option
                    createPDF();
                } else {
                    alert('WRITE_EXTERNAL_STORAGE permission denied');
                }
            } catch (err) {
                alert('Write permission err', err);
                console.warn(err);
            }
        }

        if (Platform.OS = 'android') {
            requestExternalWritePermission();
        } else {
            createPDF();
        }
    }




    useEffect(() => {
        const handleBack = () => {
            return true;
        }
        const date = new Date()
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        const hours = date.getHours()
        const minute = date.getMinutes()

        const dateFormatted = `${day}/${month}/${year}, ${hours}:${minute}`
        setDate(dateFormatted)

        const idTransaction = Math.floor(Math.random() * 99999999)
        setIdTransaction(idTransaction)

        const backHandlerListener = BackHandler.addEventListener('hardwareBackPress', handleBack);
        return () => {
            backHandlerListener.remove();
        }
    }, [])



    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.headerDetailTransaction}>
                    <LottiView source={require('../assets/animation/success.json')} style={styles.animationImage} autoPlay loop={false} />
                    <TextFormatted style={[styles.title, styles.primaryIcon]}>Success</TextFormatted>
                    <TextFormatted>{date}</TextFormatted>
                    <TextFormatted>No.Transaction : {idTransaction}</TextFormatted>
                    <TextFormatted>Cashier Name : Cashier</TextFormatted>
                </View>
                <View style={styles.btnContainer}>
                    <View style={styles.btnSend}>
                        <TouchableOpacity style={styles.btnPDF} onPress={permissions}>
                            <Icons name='pdffile1' size={20} color={styles.errColor.color} />
                            <TextFormatted style={[styles.lightColor, styles.textStyles, { marginLeft: 8 }]}>Create PDF</TextFormatted>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnPrint}>
                            <Icons name='printer' size={20} color={styles.primaryIcon.color} />
                            <TextFormatted style={{ marginLeft: 8 }}>Print</TextFormatted>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnEmail}>
                            <Icons name='mail' size={20} color={styles.lightColor.color} />
                            <TextFormatted style={[styles.lightColor, styles.textStyles, { marginLeft: 8 }]}>Send Email</TextFormatted>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.btnCancelContainer}>
                        <TouchableOpacity style={styles.btnCancel} onPress={() => navigation.navigate('Home')}>
                            <TextFormatted style={[styles.lightColor, styles.textStyles]}>Back To Home</TextFormatted>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default DetailTransaction;