import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput, Button, StyleSheet, LoginRender, AsyncStorage } from 'react-native'
import { StackNavigator } from 'react-navigation';


import ForgotPassword from './ForgotPassword'
import Registration from './Registration'

import {ApiEndpoints, StorageKeys} from './AppConfig.js'

class Login extends Component {
   state = {
      email: '',
      password: '',
      showPass: false,
      auth: false
   }
   handleEmail = (text) => {
      this.setState({ email: text })
   }
   handlePassword = (text) => {
      this.setState({ password: text })
   }
   login(){
        const {email, password } = this.state
        if(email == '' || password == ''){
            alert('All Fields Required')
        }
        else{
            var reqURL = ApiEndpoints.url+ApiEndpoints.loginPath;
            var reqBody = {
              'email': email,
              'password': password
            };

            fetch(reqURL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(reqBody),
              })
              .then((response) => {
                // Check response HTTP Status
                if (response.ok) {
                  response.json()
                    .then(async (responseJson) => {
                      var tokenExpiryDate = new Date();
                      tokenExpiryDate.setSeconds(tokenExpiryDate.getSeconds() + Number(responseJson.expires_in));
                      await AsyncStorage.multiSet(
                        [
                          [StorageKeys.authToken, responseJson.access_token], 
                          [StorageKeys.authExpiry, tokenExpiryDate.toString()]
                        ]
                      , (err) => {
                        if(err) {
                          alert("Error: " + err);
                        } else {
                          // Auth is valid
                          // TODO
                        }
                      }
                      )
                    })
                } else {
                  if (Number(response.status) == 404) {
                    // No agent found
                    response.json()
                      .then((responseJson) => {
                        alert(responseJson.message);
                      })
                  } else if (Number(response.status) == 400) {
                    response.json()
                      .then((responseJson) => {
                        if (Number(responseJson.code) == 1) {
                          // Incorrect password entered
                          alert(responseJson.message);
                        } else if (Number(responseJson.code) == 2) {
                          // Handle temporary password flow
                          alert(responseJson.message);
                          this.props.navigation.navigate('ChangePassword', {
                            currentEmail: email,
                            currentPassword: password
                          });
                        }
                      })
                  }
                }

              })
              .catch((error) => {
                  alert('Could not communicate with HomeWise server.');
              });
        }

    }
    
  static navigationOptions = ({ navigation }) => {
    return {
       header: null
    }
 }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style ={styles.header}>
      <View style={{flex:1}}>
        <ScrollView>
        <View style={{flex:1, alignItems:'center'}}>
          <Image style={{width: 70, height: 70, marginTop: 30, paddingBottom: 0}} 
              source={require('./Homewise.jpg')}/>
          <Text style={{fontSize: 20, fontWeight: 'bold', paddingTop: 10, paddingBottom: 20}}>Login</Text>
        </View>
        <View style={{flex:9}}>
        <View style={styles.container}>
            <View style={styles.body}>
              <View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>Email</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    onChangeText = {(text)=> this.setState({email: text})}>
                  </TextInput>
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>Password</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    secureTextEntry={this.state.showPass ? false : true}
                    onChangeText = {(text)=> this.setState({password: text})}>
                  </TextInput>
                </View>
                <TouchableOpacity
                   style = {styles.submitButton}
                   onPress = {
                      //() => this.props.navigation.navigate('AllClients')
                      () => this.login()
                   }>
                   <Text style = {styles.submitButtonText}> Log In </Text>
                </TouchableOpacity>
                <View style={styles.caption}>
                  <View style={styles.forgotpassword}>
                  <TouchableOpacity
                    style = {styles.fpsize}
                    onPress={
                      () => this.props.navigation.navigate('ForgotPassword')
                    }>
                    <Text style = {styles.ButtonText}> Forgot Password </Text>
                  </TouchableOpacity>
                  </View>
                  <View style={styles.newuser}>
                   <TouchableOpacity
                    style = {styles.fpsize}
                    onPress={
                      () => this.props.navigation.navigate('Registration')
                    }>
                    <Text style = {styles.ButtonText}> New User? </Text>
                    </TouchableOpacity>
                  </View>
                </View>
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
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: 'white'
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
    alignItems: 'flex-start' 
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
   },
   fpsize:{
    fontSize: 12
   },
   ButtonText:{
    color: 'rgb(65,147,237)'
   }
});




export default Login;
