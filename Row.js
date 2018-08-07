import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet
} from 'react-native';


const Row = ({caption, sign, update, value}) => (
  <View>
    <View style={styles.caption}>
      <Text style={styles.captionText}>{caption}</Text>
    </View>
    <View style={styles.row}>
      <TextInput
        style={styles.dollaSign}
        keyboardType = {'numeric'}
        value = {sign}
        editable={false}>
      </TextInput>
      <TextInput
        style={styles.values}
        keyboardType = {'numeric'}
        returnKeyType = {'done'}
        placeholder = '0'
        value = {value}
        onChangeText={update}>
      </TextInput>
      <TextInput
        style={styles.percentPlace}
        editable={false}>
      </TextInput>
    </View>
  </View>
                
);

const styles = StyleSheet.create({
  row: {
    flex:1,
    flexDirection: 'row',
    marginBottom: 30,
    paddingBottom: 0
  },

  caption: {
    marginLeft: 22,
    flex:3,
    flexDirection: 'row',
    paddingBottom: 0,
  },
  captionText: {
    fontSize: 16,
    paddingBottom: 0
  },
  values: {
    marginRight: 20,
    flex:7,
    borderColor: '#D3D3D3',
    borderBottomWidth: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    height: 40,
    fontSize: 20,
    paddingRight: 10,

    textAlign: 'right',
  },
  dollaSign: {
    marginLeft: 20,
    flex:0.5,
    borderColor: '#D3D3D3',
    borderBottomWidth: 1,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    height: 40,
    fontSize: 20,

    paddingLeft: 5,
    textAlign: 'left',
  },
  percentPlace: {
    flex: 2.5,
    marginRight: 10,
    paddingRight: 5
  },
});

export default Row;