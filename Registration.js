/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 import DatePicker from 'react-native-datepicker'
 import React, { Component } from 'react';
 import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  View,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

import MLSRegion from './MLSRegion'

import { ApiEndpoints, StorageKeys } from './AppConfig'
import Spinner from 'react-native-loading-spinner-overlay';
import RNPickerSelect from 'react-native-picker-select';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const {width, height} = Dimensions.get('window')

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      first_name:'',
      last_name:'',
      email:'',
      password:'',
      retypePass:'',
      mls_region: '',
      mls_id:'',
    }

    // this.getTokenFromStorage = this.getTokenFromStorage.bind(this);
    this.pushStatetoWeb = this.pushStatetoWeb.bind(this);
  }

/*getTokenFromStorage = async () => {
  const token = await AsyncStorage.getItem(StorageKeys.authToken);
  return token;
}*/

// Async function to POST web data from state, and subsequently set state
pushStatetoWeb = async (url, bodyData, callback) => {
  // Get Bearer Token
  // const bearerToken = await this.getTokenFromStorage();
  // Build fetch arguments
  let headerData = {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer ' + bearerToken 
  };
  // Fetch data
  fetch(url, {
    'method': 'POST',
    'headers': headerData,
    'body': JSON.stringify(bodyData)
  })
  .then((response) => {
    if (!response.ok) {
      // Handle error
      alert('Error in response')
      alert(response.status);
      alert(response.statusText)
    } else {
      response.json().then((data) => {
          // Go to callback function
          callback(this, data);
      })
    }
  });
}

   signUp(){
        const {email, password, users, date, first_name, last_name, retypePass } = this.state
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        

        if(first_name == '' || last_name == '' || email == '' || password == '' || retypePass == '' || date == ''){
            alert('All Fields Required')
        }
        else if(password.length < 8){
          alert('Password Must Be at Least 8 Characters Long')
        }
        else if(reg.test(email) === false){
          alert('Invalid Email')
        }
        else if(password != retypePass){
            alert('Passwords Do Not Match')
        }
        else{
            let email = this.state.email
            let first_name = this.state.first_name
            let last_name = this.state.last_name
            let mls_region = this.state.mls_region
            let mls_id = this.state.mls_id
            let password = this.state.password

            console.log(mls_region[0])

            let postURL = ApiEndpoints.url + ApiEndpoints.registrationPath;

            let postBody = {
              email:email,
              first_name:first_name,
              last_name:last_name,
              mls_region:mls_region,
              mls_id:mls_id,
              password:password
            }

            let stateTransition = function(parent, data) {
              // Navigate to login page
              this.props.navigation.navigate('Login')
            }

            // this.pushStatetoWeb(postURL, postBody, stateTransition);

            fetch(postURL, 
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email:email,
                first_name:first_name,
                last_name:last_name,
                mls_region:mls_region,
                mls_id:mls_id,
                password:password,
                birthday:this.state.date,
              }),
            }).then((response) => response.json())
                .then((responseJson) => {
                  // Navigate to login page
                  this.props.navigation.navigate('Login')
                })
                .catch((error) => {
                  alert('Error while registering. Try again later.')
                  console.error(error);
                });
        }

    }

    static navigationOptions = ({ navigation }) => {
    return {
       header: null
    }
 }

  render() {
    const { navigation } = this.props;
    return (
      <View style ={styles.header}>
      <View style={{flex:1}}>
      <KeyboardAwareScrollView innerRef={ref => {this.scroll = ref}}>
        <View style={{flex:1, alignItems:'center'}}>
          <Image style={{width: 60, height: 70, marginTop: 40, paddingBottom: 0}} 
              source={require('./Homewise.png')}/>
          <Text style={{fontSize: 20, fontWeight: 'bold', paddingTop: 10, paddingBottom: 45}}>Create an Account</Text>
        </View>
        <View style={{flex:9}}>
        <View style={styles.container}>
            <View style={styles.body}>
              <View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>First Name</Text>
                </View>
                <View style={styles.row}>
                  <TextInput 
                    autoCorrect={false}
                    style={styles.values}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    maxLength = {99}
                    placeholder = 'John'
                    underlineColorAndroid='transparent'
                    onChangeText = {(text)=> this.setState({first_name: text})}>
                  </TextInput>
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>Last Name</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    autoCorrect={false}
                    style={styles.values}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    maxLength = {99}
                    placeholder = 'Doe'
                    underlineColorAndroid='transparent'
                    onChangeText = {(text)=> this.setState({last_name: text})}>
                  </TextInput>
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>Email</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    autoCorrect={false}
                    style={styles.values}
                    keyboardType = {'default'}
                    autoCapitalize = 'none'
                    returnKeyType = {'done'}
                    maxLength = {253}
                    placeholder = 'john.doe@gmail.com'
                    underlineColorAndroid='transparent'
                    onChangeText = {(text)=> this.setState({email: text})}>
                  </TextInput>
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>Date</Text>
                </View>
                <View style={styles.rowdate}>
                  <DatePicker
                            style={{width: width, height: 25,borderRadius:7, marginTop:10}}
                            date={this.state.date}
                            showIcon= {false}
                            mode="date"
                            placeholder="Birthday"
                            format="MM/DD/YYYY"
                            minDate="1900-01-01"
                            maxDate="2017-12-31"
                            confirmBtnText="Done"
                            cancelBtnText="Cancel"
                            customStyles={{
                              dateInput: {
                                borderWidth: 0
                              }
                            }}
                            onDateChange={(date) => {this.setState({date: date})}}
                        />
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>Password</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    autoCorrect={false}
                    style={styles.values}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    secureTextEntry={this.state.showPass ? false : true}
                    underlineColorAndroid='transparent'
                    onChangeText = {(text)=> this.setState({password: text})}>
                  </TextInput>
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>Retype Password</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    autoCorrect={false}
                    style={styles.values}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    secureTextEntry={this.state.showPass ? false : true}
                    underlineColorAndroid='transparent'
                    onChangeText = {(text)=> this.setState({retypePass: text})}>
                  </TextInput>
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>MLS Region</Text>
                </View>
                <View>
                <RNPickerSelect
                    placeholder={{
                        label: '',
                    }}
                    value={this.state.mls_region}
                    items={MLSRegion}
                    onValueChange= {(text)=> this.setState({mls_region: text})}
                    style={{ ...pickerSelectStyles }}
                />
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>MLS ID</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    keyboardType = {'numeric'}
                    returnKeyType = {'done'}
                    placeholder = '123'
                    maxLength = {99}
                    underlineColorAndroid='transparent'
                    onChangeText = {(text)=> this.setState({mls_id: text})}>
                  </TextInput>
                </View>
                <TouchableOpacity
                   style = {styles.submitButton}
                   onPress = {
                      () => this.signUp()
                   }>
                   <Text style = {styles.submitButtonText}> Submit </Text>
                </TouchableOpacity>
              </View>           
            </View>
        </View> 
        </View>
        </KeyboardAwareScrollView>
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
  rowdate: {
    flex:1,
    flexDirection: 'row',
    marginBottom: 20,
    paddingBottom: 0,
    alignItems: 'center'
  },
  rowmls: {
    marginTop: 0,
    marginBottom: 40,
    marginLeft: 35,
    marginRight: 35,
    height: 20,
    justifyContent: 'center',
    color: 'black'
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
  submitButton: {
    marginRight: 35,
    marginLeft: 35,
    marginTop: 15,
    marginBottom: 15, 

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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderColor: '#D3D3D3',
        /*borderRadius: 4,
        backgroundColor: 'white',*/
        color: 'black',
        marginTop: 0,
    marginBottom: 30,
    marginLeft: 35,
    marginRight: 35,
    height: 40,
    justifyContent: 'center',
    },
});



export default Registration;
