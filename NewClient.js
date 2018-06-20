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
  AsyncStorage,
  KeyboardAvoidingView
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import States from './States'
import ClientType from './ClientType'
import { ApiEndpoints, StorageKeys } from './AppConfig'
import Numeral from 'numeral';

const {width, height} = Dimensions.get('window')


class NewClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name:'',
      last_name:'',
      email:'',
      phone_number:'',
      address:'',
      city: '',
      state:'',
      zipcode:'',
      est_price: 0,
      commission: 0,
      client_type: '',
      display_form: false
    }
  }

  setClientType(text){
    if(text === 'Buyer'){
      this.setState({
        client_type: 'B',
        client_type_bool: false,
        display_form: true
      })
    }
    else if(text === 'Listing'){
      this.setState({
        client_type: 'S',
        client_type_bool: true,
        display_form: true
      })
    }
    else{
      this.setState({
        client_type: 'S',
        client_type_bool: true,
        display_form: true
      })
    }
  }

  getTokenFromStorage = async () => {
    const token = await AsyncStorage.getItem(StorageKeys.authToken);
    return token;
  }

  // Async function to fetch web data and set state
  fetchWebtoState = async (url, stateField) => {
    // Get Bearer Token
    const bearerToken = await this.getTokenFromStorage();
    // Build fetch arguments
    let headerData = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + bearerToken 
    };
    // Fetch data
    fetch(url, {
      'method': 'GET',
      'headers': headerData
    })
    .then((response) => {
      if (!response.ok) {
        // Handle error
        alert('Error in response')
      } else {
        response.json().then((data) => {
          // Set corresponding state field
          this.setState({
            [stateField]: data
          })
        })
      }
    });
  }

  // Async function to POST web data from state, and subsequently set state
  pushStatetoWeb = async (url, bodyData, callback) => {
    // Get Bearer Token
    const bearerToken = await this.getTokenFromStorage();
    // Build fetch arguments
    let headerData = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + bearerToken 
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
            // Trigger refresh hook
            //hook = this.props.navigation.getParam('refresh_hook', () => {alert('No refresh hook found')});
            //hook();
            this.props.navigation.state.params.refresh();
            // Go to callback function
            callback(this, data);
        })
      }
    })
    .catch((error) => {
      alert(error);
    });
  }

  signUp(){
        const {email, phone_number, address, city, first_name, last_name, state, zipcode, est_price, commission } = this.state
         let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(client_type === 'B'){
          if(first_name == '' || last_name == '' || email == '' || phone_number == '' || est_price == '' || commission == ''){
            alert('All Field Required')
          }
          else if(reg.test(email) === false){
            alert('Invalid Email')
          } 
        } else if(client_type === 'S') {
          if(first_name == '' || last_name == '' || email == '' || phone_number == '' || address == '' || city == '' || state == '' || zipcode == '' || est_price == '' || commission == ''){
            alert('All Fields Required')
          }
          else if(reg.test(email) === false){
            alert('Invalid Email')
          }
        }

        else{
            let client_type = this.state.client_type
            let email = this.state.email
            let first_name = this.state.first_name
            let last_name = this.state.last_name
            let phone_number = this.state.phone_number
            let address = this.state.address
            let city = this.state.city
            let state = this.state.state
            let zipcode = this.state.zipcode
            let est_price = this.state.est_price
            let commission = this.state.commission

            // Build URL
            let addclientURL = ApiEndpoints.url + ApiEndpoints.addclientPath;

            // Prepare fetch call arguments
            let addclientBody = {
                email:email,
                first_name:first_name,
                last_name:last_name,
                phone_number:phone_number,
                address:address,
                city:city,
                state:state, 
                zipcode:zipcode,
                est_price: est_price,
                commission: commission,
                client_type: client_type              
              };

            // Prepare callback after POST request
            let stateTransition = function(parent, data) {
              parent.props.navigation.navigate('AllClients');
            }

            // Make fetch call
            this.pushStatetoWeb(addclientURL, addclientBody, stateTransition);

            /*fetch('http://127.0.0.1:8000/agent/AddClient/', 
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer kXw1EblISCF5MAymCeg3HfuF68mPrh'
              },
              body: JSON.stringify({
                email:email,
                first_name:first_name,
                last_name:last_name,
                phone_number:phone_number,
                address:address,
                city:city,
                state:state, 
                zipcode:zipcode,
                est_price: est_price,
                commission: commission
              }),
            }).then((response) => response.json())
                .then((responseJson) => {
                  this.props.navigation.navigate('AllClients');
                })
                .catch((error) => {
                  console.error(error);
                });*/
        }

    }

  static navigationOptions = {
        title: 'Clients',
        headerTitleStyle :{textAlign: 'center',alignSelf:'center', color: '#fff'},
        headerStyle:{
            backgroundColor:'#0091FF',
        },
    };

  render() {
    const { navigation } = this.props;
    return (
      <View style ={styles.header}>
      <View style={{flex:1}}>
      <KeyboardAvoidingView behavior="position" enabled>
        <ScrollView>
        <View style={{flex:1, alignItems:'center'}}>
          <Image style={{width: 70, height: 70, marginTop: 30, paddingBottom: 0}} 
              source={require('./Homewise.jpg')}/>
          <Text style={{fontSize: 20, fontWeight: 'bold', paddingTop: 10, paddingBottom: 20}}>Add Client</Text>
        </View> 
        <View style={{flex:9}}>
        <View style={styles.container}>
            <View style={styles.body}>
              <View>
              <View style={styles.caption}>
                  <Text style={styles.captionText}>Client Type</Text>
                </View>
                <View>
                  <Dropdown
                    data = {ClientType}
                    containerStyle = {styles.rowdate}
                    onChangeText = {(text)=> this.setClientType(text)}>
                  </Dropdown>
                </View>

                {this.state.display_form&&
                  <View>
                {this.state.client_type_bool?
                  <View>
                  <View style={styles.caption}>
                  <Text style={styles.captionText}>First Name</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    placeholder = 'John'
                    maxLength = {99}
                    onChangeText = {(text)=> this.setState({first_name: text})}>
                  </TextInput>
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>Last Name</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    placeholder = 'Doe'
                    maxLength = {99}
                    onChangeText = {(text)=> this.setState({last_name: text})}>
                  </TextInput>
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>Email</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    autoCapitalize = 'none'
                    maxLength = {253}
                    placeholder = 'john.doe@gmail.com'
                    onChangeText = {(text)=> this.setState({email: text})}>
                  </TextInput>
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>Phone Number</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    keyboardType = {'numeric'}
                    returnKeyType = {'done'}
                    placeholder = '1-800-HomeWise'
                    maxLength = {10}
                    onChangeText = {(text)=> this.setState({phone_number: text})}>
                  </TextInput>
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>Street Address</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    placeholder = '24 Quiet Road'
                    maxLength = {99}
                    onChangeText = {(text)=> this.setState({address: text})}>
                  </TextInput>
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>City</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    placeholder = 'Charlotte'
                    maxLength = {29}
                    onChangeText = {(text)=> this.setState({city: text})}>
                  </TextInput>
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>State</Text>
                </View>
                <View>
                  <Dropdown
                    data = {States}
                    containerStyle = {styles.rowdate}
                    onChangeText = {(text)=> this.setState({state: text})}>
                  </Dropdown>
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>Zip Code</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    keyboardType = {'numeric'}
                    returnKeyType = {'done'}
                    placeholder = '00000'
                    maxLength = {5}
                    onChangeText = {(text)=> this.setState({zipcode: text})}>
                  </TextInput>
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>Estimated House Value</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.dollaSign}
                    keyboardType = {'numeric'}
                    value = '$'
                    editable={false}>
                  </TextInput>
                  <TextInput
                    style={styles.valuescom}
                    keyboardType = {'numeric'}
                    returnKeyType = {'done'}
                    placeholder = '000000'
                    //value = {Numeral((this.state.est_price).toString()).format('0,0')}
                    onChangeText = {(text)=> this.setState({est_price: text})}>
                  </TextInput>
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>Commission</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.percentSign}
                    keyboardType = {'numeric'}
                    value = '%'
                    editable={false}>
                  </TextInput>
                  <TextInput
                    style={styles.valuescom}
                    keyboardType = {'numeric'}
                    returnKeyType = {'done'}
                    maxLength = {2}
                    placeholder = '15'
                    onChangeText = {(text)=> this.setState({commission: text})}>
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
                :
                <View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>First Name</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    placeholder = 'John'
                    maxLength = {99}
                    onChangeText = {(text)=> this.setState({first_name: text})}>
                  </TextInput>
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>Last Name</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    placeholder = 'Doe'
                    maxLength = {99}
                    onChangeText = {(text)=> this.setState({last_name: text})}>
                  </TextInput>
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>Email</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    autoCapitalize = 'none'
                    placeholder = 'john.doe@gmail.com'
                    maxLength = {253}
                    onChangeText = {(text)=> this.setState({email: text})}>
                  </TextInput>
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>Phone Number</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    keyboardType = {'numeric'}
                    returnKeyType = {'done'}
                    placeholder = '1-800-HomeWise'
                    maxLength = {10}
                    onChangeText = {(text)=> this.setState({phone_number: text})}>
                  </TextInput>
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>Estimated House Value</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.dollaSign}
                    keyboardType = {'numeric'}
                    value = '$'
                    editable={false}>
                  </TextInput>
                  <TextInput
                    style={styles.valuescom}
                    keyboardType = {'numeric'}
                    returnKeyType = {'done'}
                    placeholder = '000000'
                    //value = {Numeral((this.state.est_price).toString()).format('0,0')}
                    onChangeText = {(text)=> this.setState({est_price: text})}>
                  </TextInput>
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>Commission</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.percentSign}
                    keyboardType = {'numeric'}
                    value = '%'
                    editable={false}>
                  </TextInput>
                  <TextInput
                    style={styles.valuescom}
                    keyboardType = {'numeric'}
                    returnKeyType = {'done'}
                    maxLength = {2}
                    placeholder = '15'
                    onChangeText = {(text)=> this.setState({commission: text})}>
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

                }
                </View>
              }
              </View>           
            </View>
        </View> 
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
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
    backgroundColor: '#fff',
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
    marginTop: 0,
    marginBottom: 40,
    marginLeft: 35,
    marginRight: 35,
    height: 20,
    justifyContent: 'center'
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
    height: 45,
    fontSize: 18,
    paddingRight: 10,

    textAlign: 'right',
    //backgroundColor: '#F7F7F5'
  },
  valuescom: {
    marginRight: 35,
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
    marginLeft: 35,
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
  percentSign: {
    marginLeft: 35,
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

export default NewClient;