import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput, StyleSheet, LoginRender } from 'react-native'


class ChangePassword extends Component {
   state = {
      textCurrentPassword: '',
      textNewPassword: '',
      textNewPasswordConfirm: '',
      success: false
   }
  render() {
    return (
      <View style={{flex:1}}>
        <ScrollView>
        <View style={{flex:1, alignItems:'center'}}>
          {/*<Image style={{width: 70, height: 70, marginTop: 30, paddingBottom: 0}} 
              source={require('./Homewise.jpg')}/>*/}
          <Text style={{fontSize: 20, fontWeight: 'bold', paddingTop: 10, paddingBottom: 20}}>Forgot Password</Text>
        </View>
        <View style={{flex:9}}>
        <View style={styles.container}>
            <View style={styles.body}>
              <View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>Temporary Password</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    onChangeText = {(text)=> this.setState({tempPassword: text})}>
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
                    onChangeText = {(text)=> this.setState({password: text})}>
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
                    onChangeText = {(text)=> this.setState({newPassword: text})}>
                  </TextInput>
                </View>
                <TouchableOpacity
                   style = {styles.submitButton}
                   onPress = {
                      () => this.login(this.state.email, this.state.password)
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
    height: 25,
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
