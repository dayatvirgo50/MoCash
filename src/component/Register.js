import React, { useState, useEffect } from 'react'
import { View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import styles from '../styles/index'
import Icons from 'react-native-vector-icons/Ionicons'
import TextFormatted from '../component/Text'
import { checkEmail, checkInputRegister, checkRePassword, checkInputEmpty } from '../commons/validation'


const options = {
    title: 'Select Photo',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};


const Register = ({ navigation }) => {
    const [photo, setPhoto] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRePassword] = useState('')
    const [name, setName] = useState('')
    const [errMail, setErrMail] = useState(false)
    const [errPass, setErrPass] = useState(false)
    const [errRePass, setErrRePass] = useState(false)
    const [errName, setErrName] = useState(false)
    const [focus, setFocus] = useState(false)

    const pickerImage = () => {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                alert('Fail to pick Image')
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                setPhoto(response.uri)
            }
        });
    }

    const register = () => {
        if (!checkInputRegister(email, name, password, repassword)) {
            alert('berhasil daftar')
            setErrMail(false)
            setErrPass(false)
            setErrRePass(false)
            setErrName(false)
        } else {
            if (email == '') {
                setErrMail(true)
            }
            setErrPass(true)
            setErrRePass(true)
            setErrName(true)
        }
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.headerRegister}>


                {
                    !photo ?
                        <Icons name='md-person-circle-outline' size={180} color={styles.dividerColor.color} style={styles.iconPerson} /> :
                        <View style={styles.photoContainer}>
                            <Image source={{ uri: photo }} style={styles.photoRegister} />
                        </View>

                }

                {/* Icon */}

                {
                    !photo ? <View style={styles.containerIconRegister}>
                        <Icons name='add-circle' size={47} color={styles.accentColor.color} style={styles.iconRegister} onPress={pickerImage} />
                    </View> :
                        <View style={styles.containerIconRegisterNoBg}>
                            <Icons name='ios-trash' size={30} color={styles.lightColor.color} style={styles.iconRegister} onPress={() => setPhoto('')} />
                        </View>

                }

            </View>


            {/* Form */}
            <View style={styles.loginForm}>
                <View style={errMail ? styles.formRowErr : styles.formRow}>
                    <TextInput placeholder='Email Address' style={errMail ? styles.textInputLoginErr : styles.textInputLogin} onChangeText={value => setEmail(value)} value={email} onEndEditing={() => { setErrMail(checkEmail(email)), setFocus(checkEmail(email)) }} />
                </View>
                {errMail && email !== '' ?
                    <View style={styles.errMailContainer}>
                        <Icons name='close' size={20} color={styles.errColor.color} />
                        <TextFormatted style={styles.errText}>Please Enter a Valid Email Address</TextFormatted>
                    </View>
                    : !focus ? null : <View style={styles.errMailContainer}>
                        <Icons name='close' size={20} color={styles.errColor.color} />
                        <TextFormatted style={styles.errText}>Please Enter Email Address</TextFormatted>
                    </View>}

                <View style={errName ? styles.formRowErr : styles.formRow}>
                    <TextInput placeholder='Name' style={errName ? styles.textInputLoginErr : styles.textInputLogin} onChangeText={value => setName(value)} value={name} onEndEditing={() => setErrName(checkInputEmpty(name))} />
                </View>

                <View style={errPass ? styles.formRowErr : styles.formRow}>
                    <TextInput placeholder='Password' style={errPass ? styles.textInputLoginErr : styles.textInputLogin} onChangeText={value => setPassword(value)} secureTextEntry value={password} onEndEditing={() => setErrPass(checkInputEmpty(password))} />
                </View>

                <View style={errRePass ? styles.formRowErr : styles.formRow}>
                    <TextInput placeholder='Re-Type Password' style={errPass ? styles.textInputLoginErr : styles.textInputLogin} secureTextEntry onChangeText={value => setRePassword(value)} onEndEditing={repassword !== '' ? ()=>{setErrRePass(checkRePassword(password, repassword)),setErrPass(checkRePassword(password, repassword))} : ()=> setErrRePass(checkInputEmpty(repassword))} value={repassword} />
                </View>


                {errRePass && errPass && password !== '' && repassword !== '' ?
                    <View style={styles.errMailContainer}>
                        <Icons name='close' size={20} color={styles.errColor.color} />
                        <TextFormatted style={styles.errText}>Your Password not match</TextFormatted>
                    </View>
                    : errRePass && errPass ? <TextFormatted style={styles.errText}>Input can't be empty</TextFormatted> : null}
            </View>

            {/* Button */}
            <TouchableOpacity style={styles.btnLogin} activeOpacity={0.7} onPress={register}>
                <TextFormatted style={styles.textBtnLogin}>Register</TextFormatted>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default Register;