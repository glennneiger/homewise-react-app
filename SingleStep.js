import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity, 
  LayoutAnimation, 
  UIManager, 
  Platform,
  ART,
  KeyboardAvoidingView
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PropTypes from 'prop-types';
import Numeral from 'numeral';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';



class SingleStep extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: '',
      name: '',
      date: '',
      vendors: [],
      complete: false,

      editMode: false
    };
  }



  render() {

    return (
      <View style={styles.container}>
        <View style={{position: 'relative', alignItems: 'center', width: '100%', marginTop: 10, paddingBottom: 10}}> 
            {this.state.editMode?
              <TouchableOpacity
                  style={{
                      paddingHorizontal: 8,
                      paddingVertical: 3,
                      borderColor: '#0091FF',
                      borderWidth: 0.5,
                      position: 'absolute',
                      top: 0,
                      borderRadius: 4,
                      left: 15,
                  }}>
                  <Text style={{color: '#0091FF', fontSize: 18}}>Cancel</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity
                  style={{
                      paddingHorizontal: 8,
                      paddingVertical: 3,
                      borderColor: '#0091FF',
                      backgroundColor: '#0091FF',
                      borderWidth: 0.5,
                      position: 'absolute',
                      top: 0,
                      borderRadius: 4,
                      left: 15,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                      <Icon2 name="md-arrow-round-back" style={{fontSize: 17, color: '#fff', paddingTop: 3}} />
                      <Text style={{color: '#fff', fontSize: 18}}>Back</Text>
                  </View>
              </TouchableOpacity>
            }
            {this.state.editMode?
              <TouchableOpacity
                  style={{
                      paddingHorizontal: 8,
                      paddingVertical: 3,
                      borderColor: '#0091FF',
                      borderWidth: 0.5,
                      position: 'absolute',
                      top: 0,
                      borderRadius: 4,
                      right: 15,
                  }}>
                  <Text style={{color: '#0091FF', fontSize: 18}}>Done</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity
                  style={{
                      paddingHorizontal: 8,
                      paddingVertical: 3,
                      borderColor: '#0091FF',
                      borderWidth: 0.5,
                      position: 'absolute',
                      top: 0,
                      borderRadius: 4,
                      right: 15,
                  }}>
                  <Text style={{color: '#0091FF', fontSize: 18}}>Edit</Text>
              </TouchableOpacity>
            }
          </View>

          <View style={styles.row}>

          <View style={styles.caption}>
            <Text style={styles.captionText}>Down Payment</Text>
          </View>
          <View style={styles.row}>
            <TextInput
              style={styles.dollaSign}
              keyboardType = {'numeric'}
              value = '$'
              underlineColorAndroid='transparent'
              editable={false}>
            </TextInput>
            <TextInput
              style={styles.values}
              keyboardType = {'numeric'}
              returnKeyType = {'done'}
              placeholder = '0'
              value = 'hi'
              underlineColorAndroid='transparent'
              onChangeText={(downPayment) => this._downPaymentOnChangeText(downPayment)}>
            </TextInput>
            </View>
          </View>
      </View>    
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'ios' ? 12 : 0,
  },
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
    marginBottom: 10,
    marginTop: 10
    //alignItems: 'flex-end'
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
    //backgroundColor: '#F7F7F5'
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
    //backgroundColor: '#F7F7F5'
  },
  percentPlace: {
    flex: 2.5,
    marginRight: 10,
    paddingRight: 5
  },
  percentValue: {
    flex: 2,
    borderColor: '#D3D3D3',
    borderBottomWidth: 1,
    height: 40,
    fontSize: 20, 
    textAlign: 'right',
    paddingRight: 5
  },
  percentSign: {
    flex: 0.5,
    borderColor: '#D3D3D3',
    borderBottomWidth: 1,
    height: 40,
    fontSize: 20,
    marginRight: 10,
    paddingRight: 5
  },
});



export default SingleStep;