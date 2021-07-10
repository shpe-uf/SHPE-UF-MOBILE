import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const SmallCard = ({label, info}) => {
    
    return (
        <View>
            <View style={styles.aBox}>
                <Text style = {styles.labelText}>{label}</Text>
                <Text style = {styles.infoText}>{info}</Text>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    aBox:{
        alignContent: 'center',
        paddingHorizontal: "8%",
        paddingVertical : '1.5%'
    },
    labelText :{
        color : '#001F5B',
        fontWeight : 'bold',
        fontSize: 21,
        paddingVertical: '1%'
    },
    infoText:{
        color : '#000',
        fontSize : 19,
        paddingVertical: '1%'
    }
})



export default SmallCard;