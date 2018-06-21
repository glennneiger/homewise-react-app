import React, { Component } from 'react'
import { Platform, View, Text, TouchableOpacity, ScrollView, Image, TextInput, StyleSheet, LoginRender } from 'react-native'

import { ApiEndpoints } from './AppConfig.js'

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textCurrentPassword: '',
      textNewPassword: '',
      textNewPasswordConfirm: '',
      agentEmail: '',
      success: false,
      backToProfile: false,
      refresh: true,
    }

    this.loadData = this.loadData.bind(this);
  }

  loadData = function() {
    const { navigation } = this.props;

    if (navigation.getParam('fromProfile', false)) {
      this.setState({
        backToProfile: true
      });
    }

    const currentPassword = navigation.getParam('currentPassword', '');
    const currentEmail = navigation.getParam('currentEmail', '');
    this.setState({
      agentEmail: currentEmail,
      textCurrentPassword: currentPassword
    });
  }

  componentDidMount() {

  }

  changePasswordFlow() {
    /*
      Requires:
        email
        current_password
        new_password
    */

    // Check that password boxes match
    // TODO

    // Make request to API
    const { agentEmail, textCurrentPassword, textNewPassword } = this.state;
    const reqURL = ApiEndpoints.url+ApiEndpoints.changepasswordPath;
    const reqBody = {
      email: agentEmail,
      current_password: textCurrentPassword,
      new_password: textNewPassword
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
          // All ok
          alert('Password successfully changed.');
          // Go to login screen or agent profile screen
          if (this.state.backToProfile) {
            this.props.navigation.navigate('Profile');
          } else {
            this.props.navigation.navigate('Login');
          }
        } else {
          // Handle errors
          // TODO
          alert('Error in changing password!');
          alert(response.status);
        }
      })
  }

  render() {

    if(this.state.refresh) {
      this.loadData();
      this.setState({
        refresh: false,
      })
    }

    return (
      <View style={{flex:1, backgroundColor: '#fff'}}>
        <ScrollView>
        <View style={{flex:1, alignItems:'center'}}>
          <Image style={{width: 70, height: 70, marginTop: 30, paddingBottom: 0}} 
              source={require('./Homewise.jpg')}/>
          <Text style={{fontSize: 20, fontWeight: 'bold', paddingTop: 10, paddingBottom: 20}}>Change Password</Text>
        </View>
        <View style={{flex:9}}>
        <View style={styles.container}>
            <View style={styles.body}>
              <View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>Current Password</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    secureTextEntry = {true}
                    underlineColorAndroid='transparent'
                    onChangeText = {(text)=> this.setState({textCurrentPassword: text})}
                    value = {this.state.textCurrentPassword}>
                  </TextInput>
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>New Password</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    secureTextEntry = {true}
                    underlineColorAndroid='transparent'
                    onChangeText = {(text)=> this.setState({textNewPassword: text})}>
                  </TextInput>
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>Retype New Password</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    secureTextEntry = {true}
                    underlineColorAndroid='transparent'
                    onChangeText = {(text)=> this.setState({textNewPasswordConfirm: text})}>
                  </TextInput>
                </View>
                <TouchableOpacity
                   style = {styles.submitButton}
                   onPress = {
                      () => this.changePasswordFlow()
                   }>
                   <Text style = {styles.submitButtonText}> Submit </Text>
                </TouchableOpacity>
              </View>           
            </View>
        </View> 
        </View>
        </ScrollView>
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


export default ChangePassword;
