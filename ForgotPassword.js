import React, { Component } from 'react'
import { Platform, View, Text, TouchableOpacity, ScrollView, Image, TextInput, StyleSheet, LoginRender } from 'react-native'

import { ApiEndpoints } from './AppConfig.js'

class ForgotPassword extends Component {
    constructor(props) {
      super(props);

      this.state = {
        textEmail: ''
      }
    }
    
    static navigationOptions = ({ navigation }) => {
      return {
        header: null
      }
    }

    forgotPasswordFlow() {
      const { textEmail } = this.state;

      // Make request to API
      const reqURL = ApiEndpoints.url+ApiEndpoints.forgotpasswordPath;
      const reqBody = {
        email: textEmail
      }
      fetch(reqURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody),
        })
        .then((response) => {
          if (response.ok) {
            // Successful password reset
            alert('An email has been sent with a temporary password!');
            this.props.navigation.navigate('Login');
          } else {
            // Handle Errors
            // TODO
          }
        })
    }

  render() {
    return (
      <View style ={styles.header}>
      <View style={{flex:1}}>
        <ScrollView>
        <View style={{flex:1, alignItems:'center'}}>
          <Image style={{width: 60, height: 70, marginTop: 30, paddingBottom: 0}} 
              source={require('./Homewise.png')}/>
          <Text style={{fontSize: 20, fontWeight: 'bold', paddingTop: 10, paddingBottom: 20}}>Forgot Password</Text>
        </View>
        <View style={{flex:9}}>
        <View style={styles.container}>
            <View style={styles.body}>
              <View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>Email Address</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                     autoCapitalize = 'none'
                    underlineColorAndroid='transparent'
                    onChangeText = {(text)=> this.setState({textEmail: text})}>
                  </TextInput>
                </View>
                <TouchableOpacity
                   style = {styles.submitButton}
                   onPress = {
                      () => this.forgotPasswordFlow()
                   }>
                   <Text style = {styles.submitButtonText}> Submit </Text>
                </TouchableOpacity>
              </View>           
            </View>
        </View> 
        </View>
        </ScrollView>
      </View>
      </View>     
    );
  }

}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f6fbfc'
  },
  container: {
    flex: 1,
    backgroundColor: '#f6fbfc',
    paddingTop: Platform.OS === 'ios' ? 12 : 0,
  },
  body: {
    flex:8,
    //backgroundColor: '#FFFBF8'
  },
  row: {
    flex:1,
    flexDirection: 'row',
    marginBottom: 20,
    paddingBottom: 0
  },
  caption: {
    marginLeft: 35,
    flex:3,
    flexDirection: 'row',
    paddingBottom: 0,
    //alignItems: 'flex-end'
  },
  captionText: {
    fontSize: 16,
    paddingBottom: 0
  },
  captionTextU: {
    fontSize: 16,
    paddingBottom: 0,
    color: 'rgb(65,147,237)'
  },
  values: {
    marginRight: 35,
    marginLeft: 35,

    flex:9.5,
    borderColor: '#D3D3D3',
    borderBottomWidth: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    height: 45,
    fontSize: 18,
    paddingRight: 10,

    textAlign: 'right',
    //backgroundColor: '#F7F7F5'
  },
  forgotpassword: {
    flex: 5,
    paddingTop: 15,
  },
  newuser: {
    flex:5,
    alignItems: 'flex-end',
    marginRight: 35,
    paddingTop: 15,
  },

  submitButton: {
    marginRight: 35,
    marginLeft: 35,

    flex:9.5,
    borderColor: '#D3D3D3',
    height: 40,
    fontSize: 18,
    paddingRight: 10,
    backgroundColor: 'rgb(65,147,237)',
    justifyContent:'center', 
    alignItems:'center'
   },
   submitButtonText:{
      color: 'white',
   }
});


export default ForgotPassword;
