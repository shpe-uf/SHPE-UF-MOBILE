import React from 'react'
import { StyleSheet, View, Text } from 'react-native';

const SmallCard = ({label, info}) => {
    
    return (
      <View>
          <View style={styles.aBox}>
            <Text style={{fontSize: 20, color: '#777'}}> {label}:   {info}</Text>  
          </View>
          <View style={{paddingVertical:10}}></View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    aBox: {
        alignContent: 'center',
        backgroundColor: '#eee',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius:10
    },
    
  });
  
  export default SmallCard;
