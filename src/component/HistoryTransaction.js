import React, { useState, useEffect } from 'react'
import { View, SectionList, Image, TouchableOpacity, TextInput } from 'react-native'
import Icons from 'react-native-vector-icons/AntDesign'
import TextFormatted from '../component/Text'
import styles from '../styles/historyTransactionStyles'

const HistoryTransaction = ({ navigation }) => {
    const dummyData = [
        // {
        //     id: 123123456,
        //     date: '5/10/2020',
        //     totalPrice: 'Rp 50000'
        // },
        // {
        //     id: 123123466,
        //     date: '03/10/2020',
        //     totalPrice: 'Rp 50000'
        // },
        // {
        //     id: 123123488,
        //     date: '03/10/2020',
        //     totalPrice: 'Rp 50000'
        // }, {
        //     id: 123123411,
        //     date: '01/10/2020',
        //     totalPrice: 'Rp 50000'
        // },
        // {
        //     id: 123123421,
        //     date: '02/10/2020',
        //     totalPrice: 'Rp 50000'
        // },
        // {
        //     id: 123123455,
        //     date: '02/10/2020',
        //     totalPrice: 'Rp 50000'
        // },
        // {
        //     id: 123123421,
        //     date: '02/10/2020',
        //     totalPrice: 'Rp 50000'
        // },
        // {
        //     id: 123123455,
        //     date: '02/10/2020',
        //     totalPrice: 'Rp 50000'
        // },
        // {
        //     id: 123123421,
        //     date: '02/10/2020',
        //     totalPrice: 'Rp 50000'
        // },
        // {
        //     id: 123123455,
        //     date: '02/10/2020',
        //     totalPrice: 'Rp 50000'
        // },
        // {
        //     id: 123123421,
        //     date: '02/10/2020',
        //     totalPrice: 'Rp 50000'
        // },
        // {
        //     id: 123123455,
        //     date: '02/10/2020',
        //     totalPrice: 'Rp 50000'
        // },
        // {
        //     id: 123123421,
        //     date: '02/10/2020',
        //     totalPrice: 'Rp 50000'
        // },
        // {
        //     id: 123123455,
        //     date: '02/10/2020',
        //     totalPrice: 'Rp 50000'
        // },
        // {
        //     id: 123123421,
        //     date: '02/10/2020',
        //     totalPrice: 'Rp 50000'
        // },
        // {
        //     id: 123123455,
        //     date: '02/10/2020',
        //     totalPrice: 'Rp 50000'
        // }
    ]

    const [dataHistory, setDataHistory] = useState([])
    const [search, setSearch] = useState('')



    async function loadHistory(data) {
        const dataSource = data.reduce(function (sections, item) {
            let section = sections.find(section => section.date === item.date);
            if (!section) {
                section = { date: item.date, data: [] };
                sections.push(section);
            }
            section.data.push(item);
            return sections;
        }, []);
        setDataHistory(dataSource)
    }

    const searchFunction = () => {
        if (search) {
            let filteredData = dummyData.filter((x) => { return x.id == search })
            loadHistory(filteredData)
        }
        else {
            loadHistory(dummyData)
        }
    }


    useEffect(() => {


        loadHistory(dummyData)
        return () => {
            loadHistory(dummyData)
        }
    }, [])

    const today = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`


    function renderView() {
        if (dataHistory.length === 0 || !dataHistory) {
            return <View style={{justifyContent:'center', alignItems:'center',marginTop:'30%'}}>
                <Image source={require('../assets/icons/NoHistory.png')} style={{resizeMode:'contain',height: 140}}/>
                <TextFormatted>No History Transaction</TextFormatted>
            </View>
        } else {
            return <SectionList
                sections={dataHistory}
                stickySectionHeadersEnabled={true}
                showsVerticalScrollIndicator={false}
                renderSectionHeader={
                    ({ section: { date } }) => (
                        <View style={styles.listHeader}>
                            <TextFormatted style={styles.textHeaderList}>{today === date ? 'Today' : date}</TextFormatted>
                        </View>)
                }
                renderItem={({ item, index, section }) =>
                    <TouchableOpacity key={index}>
                        <View style={styles.dataListBodyContainer}>
                            <View style={styles.contentHeader}>
                                <TextFormatted style={styles.textContentHeader}>#id: {item.id}</TextFormatted>
                            </View>
                            <View style={styles.content}>
                                <TextFormatted style={styles.textContent}>{item.totalPrice}</TextFormatted>
                            </View>
                        </View>
                    </TouchableOpacity>
                }
                keyExtractor={(item, index) => item.id + index}
            />
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Icons name='left' size={25} color='#212121' style={styles.backIcon} onPress={() => navigation.goBack()} />
                <TextFormatted style={styles.textHeader}>History Transaction</TextFormatted>
                <View style={{ width: 24, height: 24 }} />
            </View>
            <View style={styles.formRowHeader}>
                <View style={{ width: '90%' }}>
                    <TextInput style={styles.textInputSearch} placeholder='Search Transaction' value={search} onChangeText={value => setSearch(value)} keyboardType='number-pad' onEndEditing={searchFunction} />
                </View>
                {
                    search !== '' ?
                        <View>
                            <Icons name='close' size={20} color={styles.primaryIcon.color} onPress={() => { setSearch(''), loadHistory(dummyData) }} />
                        </View> : null
                }
            </View>
            <View style={styles.bodyContainer}>
                {
                    renderView()
                }
            </View>
        </View>
    )
}
export default HistoryTransaction