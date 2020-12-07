import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View} from 'react-native';

let fontSizeInput=19
let backgroundColorInput = 'white'
export default function FlatButton({text, fontSiz, backgroundCol  /*, onPress*/}){
  fontSizeInput= fontSiz
  backgroundColorInput=backgroundCol
  
  return (
    //<TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.opacityBtn}> {text} </Text>
      </View>
    //</TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  opacityBtn: {
    flexDirection: 'row',
    color: '#0a84ff',
    fontSize: fontSizeInput,
    lineHeight: 20,
    justifyContent: 'space-between',
  },
  container: {
    backgroundColor: backgroundColorInput,
    alignItems: 'center',
    marginTop: 10,
  },
  button : {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: '#0000FF',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center'
  
  }

})