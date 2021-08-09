import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Table() {
    renderRow = () => {
        return (
            <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                <View style={{ flex: 1, alignSelf: 'stretch' }} /> { /* Edit these as they are your cells. You may even take parameters to display different data / react elements etc. */}
                <View style={{ flex: 1, alignSelf: 'stretch' }} />
                <View style={{ flex: 1, alignSelf: 'stretch' }} />
                <View style={{ flex: 1, alignSelf: 'stretch' }} />
                <View style={{ flex: 1, alignSelf: 'stretch' }} />
            </View>
        );
    };

    const data = [1, 2, 3, 4, 5];

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {
            data.map((datum) => { // This will render a row for each data element.
                return this.renderRow();
            })
        }
        </View>
    );
}

const styles = StyleSheet.create({


})
