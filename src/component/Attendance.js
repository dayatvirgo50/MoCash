import React, { useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Icons from 'react-native-vector-icons/AntDesign'
import TextFormatted from '../component/Text'
import { theme } from '../styles/themeCalendars'
import { primaryColor, errColor, dividerColor, textLight, primaryText, accentColor } from '../styles/index'
import styles from '../styles/historyTransactionStyles'

const Attendance = ({ navigation }) => {
    const dummyData = [
        {
            idKaryawan: 1,
            date: '2020-10-01',
            status: 'hadir',
            alasan: ''
        },
        {
            idKaryawan: 1,
            date: '2020-10-02',
            status: 'hadir',
            alasan: ''
        },
        {
            idKaryawan: 1,
            date: '2020-10-03',
            status: 'hadir',
            alasan: ''
        },
        {
            idKaryawan: 1,
            date: '2020-10-04',
            status: 'absen',
            alasan: 'sakit'
        },
        {
            idKaryawan: 1,
            date: '2020-10-05',
            status: 'hadir',
            alasan: ''
        },
    ]
    const [dateList, setDateList] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedDate, setSelectedDate] = useState('')
    const [event, setEvent] = useState({})




    async function loadAbsen() {
        var obj = dummyData.reduce((c, v) => Object.assign(c, { [v.date]: { selected: true, selectedColor: v.status === 'hadir' ? primaryColor : errColor, marked: false } }), {}) // Changa Array Object to Objcet MarkedDates
        setLoading(false)
        setDateList(obj)
    }

    const getNameDay = (dateString) => {
        const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const d = new Date(dateString)
        const getNameDay = dayName[d.getDay()]
        const getDate = d.getDate()
        const dateFormat = `${getDate} ${getNameDay}`
        selectedDateFunction(dateString, dateFormat.split(' '))
        const myObj = dateList
        const dataObject = {}


        for (var i in myObj) {
            if (i.includes('e')) {
                console.log('bukan tanggal')
            } else {
                let selectedDate1 = dummyData.filter((x) => { return x.date == i })
                if (selectedDate1.length !== 0) {
                    if (i == dateString) {
                        Object.assign(dataObject, { [i]: { marked: true, selected: false, selectedColor: selectedDate1[0].status === 'hadir' ? primaryColor : errColor } })
                    } else {
                        Object.assign(dataObject, { [i]: { marked: false, selected: true, selectedColor: selectedDate1[0].status === 'hadir' ? primaryColor : errColor } })
                        // console.log('color ', myObj.selectedColor)
                    }
                }
            }
        }
        Object.assign(dataObject, { [dateString]: { marked: false, selected: true, selectedColor: accentColor } })
        setDateList(dataObject)
    }

    const selectedDateFunction = (date, textDate) => {
        let selectedDate1 = dummyData.filter((x) => { return x.date == date })
        let obj = {}
        Object.assign(obj, selectedDate1[0], { dayName: textDate[1], date: textDate[0] })
        setEvent(obj)
    }

    useEffect(() => {
        loadAbsen()
        return () => {
            loadAbsen()
        }
    }, [])

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>

            {/* Header */}

            <View style={styles.headerContainer}>
                <Icons name='left' size={25} color='#212121' style={styles.backIcon} onPress={() => navigation.goBack()} />
                <TextFormatted style={styles.textHeader}>Attendance</TextFormatted>
                <View style={{ width: 24, height: 24 }} />
            </View>

            {/* Keterangan */}

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: 250, alignSelf: 'center', flexWrap: 'wrap' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 10, height: 10, backgroundColor: errColor, borderRadius: 20, marginRight: 10 }} />
                    <TextFormatted style={styles.errColor}>Tidak Hadir</TextFormatted>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 10, height: 10, backgroundColor: primaryColor, borderRadius: 20, marginRight: 10 }} />
                    <TextFormatted style={{ color: primaryColor }}>Hadir</TextFormatted>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 10, height: 10, borderColor: '#00adf5', borderWidth: 1, borderRadius: 20, marginRight: 10 }} />
                    <TextFormatted style={{ color: '#00adf5' }}>Today</TextFormatted>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 10, height: 10, backgroundColor: accentColor, borderRadius: 20, marginRight: 10 }} />
                    <TextFormatted style={{ color: accentColor }}>Selected</TextFormatted>
                </View>
            </View>


            <Calendar
                current={new Date()}
                theme={theme}
                displayLoadingIndicator={loading}
                markedDates={dateList}
                enableSwipeMonths={true}
                onDayPress={date => getNameDay(date.dateString)}
            />

            {/* Custom Agenda */}
            <View style={{ flex: 1, padding: 10, backgroundColor: '#ededed' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', height: 100 }}>
                    <View>
                        <TextFormatted style={{ fontSize: 25, fontFamily: 'Century Gothic' }}>{event.date}</TextFormatted>
                        <TextFormatted style={{ fontSize: 18, fontFamily: 'Century Gothic' }}>{event.dayName}</TextFormatted>
                    </View>
                    <View style={{ backgroundColor: textLight, height: 100, width: '88%', maxWidth: '90%', borderRadius: 10, padding: 10, flexDirection: 'row', justifyContent: 'space-between', elevation: 2 }}>
                        <View style={{ width: '80%' }}>
                            <TextFormatted>Status : {event.status ? event.status : 'Belum Diketahui'}</TextFormatted>
                            <TextFormatted style={{ fontFamily: 'Century Gothic', color: primaryText }}>
                                {event.alasan ? 'Ket :' + event.alasan : ''}</TextFormatted>
                        </View>
                        <View>
                            <View style={{ backgroundColor: event.status ? event.status === 'hadir' ? primaryColor : errColor : accentColor, padding: 15, borderRadius: 30 }}>
                                <TextFormatted style={{ fontFamily: 'Century Gothic', color: textLight }}>RH</TextFormatted>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )

}

export default Attendance;