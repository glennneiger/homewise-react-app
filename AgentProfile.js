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
  AsyncStorage
} from 'react-native';

import { ApiEndpoints, StorageKeys } from './AppConfig.js';

const {width, height} = Dimensions.get('window')

class AgentProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name:'',
      last_name:'',
      email:'',
      mls_region: '',
      mls_id:'',
      phone_number: '',
      id: ''
    }
  }

  getTokenFromStorage = async () => {
    const token = await AsyncStorage.getItem(StorageKeys.authToken);
    return token;
  }

  // Async function to fetch web data and set state via callback
  fetchWebtoState = async (url, callback) => {
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
        alert('Error in response');
        alert(response.status);
      } else {
        response.json().then((data) => {
          callback(this, data);
        })
      }
    });
  }

  
  componentDidMount(){

    let getURL = ApiEndpoints.url + ApiEndpoints.agentProfile;

    let stateTransition = function(parent, responseJson) {
      parent.setState({
        first_name: responseJson.first_name,
        last_name: responseJson.last_name,
        email: responseJson.email,
        mls_region: responseJson.mls_region,
        mls_id: responseJson.mls_id,
        id: responseJson.id,
        phone_number: responseJson.phone_number
      })
    }

    this.fetchWebtoState(getURL, stateTransition);

    /*fetch('http://127.0.0.1:8000/agent/AgentProfile/', 
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer kXw1EblISCF5MAymCeg3HfuF68mPrh'
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          first_name: responseJson.first_name,
          last_name: responseJson.last_name,
          email: responseJson.email,
          mls_region: responseJson.mls_region,
          mls_id: responseJson.mls_id,
          id: responseJson.id,
          phone_number: responseJson.phone_number
        })
      })
      .catch((error) =>{
        console.error(error);
    });*/


  
  }

  logout() {
    // Logout user
    AsyncStorage.removeItem(StorageKeys.authToken)
      .then(() => {
        alert("Succesfully logged out.");
        // Navigate to login flow
        this.props.navigation.navigate('Auth');
      });
  }

    

  static navigationOptions = ({ navigation }) => {
  return {
     header: null
  }
 
 }

  render() {
    const { navigation } = this.props;
    return (
      <View style={{flex:1}}>
        <Text>{this.state.first_name}</Text>
        <ScrollView>
        <View style={{flex:1, alignItems:'center'}}>
          <Image style={{width: 70, height: 70, marginTop: 30, paddingBottom: 0}} 
              source={require('./Homewise.jpg')}/>
          <Text style={{fontSize: 20, fontWeight: 'bold', paddingTop: 10, paddingBottom: 20}}>Agent Profile</Text>
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
                    style={styles.values}
                    editable = {false}
                    value={this.state.first_name}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    placeholder = 'John'
                  />
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>Last Name</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    editable = {false}
                    value = {this.state.last_name}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    placeholder = 'Doe'
                  />
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>Email</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    editable = {false}
                    value={this.state.email}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    placeholder = 'john.doe@gmail.com'
                  />
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>Phone Number</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    editable = {false}
                    value={this.state.phone_number}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    placeholder = '1-800-HomeWise'
                  />
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>MLS Region</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    editable = {false}
                    value={this.state.mls_region}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    placeholder = 'Charlotte'
                  />
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>MLS ID</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    editable = {false}
                    value={this.state.mls_id}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    placeholder = '123'
                  />
                </View>
                <TouchableOpacity
                   style = {styles.submitButton}
                   onPress = {
                      () => this.signUp()
                   }>
                   <Text style = {styles.submitButtonText}> Change Password </Text>
                </TouchableOpacity>
                <TouchableOpacity
                   style = {styles.submitButton}
                   onPress = {
                      () => this.logout()
                   }>
                   <Text style = {styles.submitButtonText}> Sign Out </Text>
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
  rowdate: {
    flex:1,
    flexDirection: 'row',
    marginBottom: 20,
    paddingBottom: 0,
    alignItems: 'center'
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



export default AgentProfile;
