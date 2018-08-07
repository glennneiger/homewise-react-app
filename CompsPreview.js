import React, { Component } from 'react';
 import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Image,
  Dimensions,
  AsyncStorage
} from 'react-native'
import { ApiEndpoints, StorageKeys } from './AppConfig';
const {width, height} = Dimensions.get('window')


export default class CompsPreview extends Component{
   constructor(props) {
    super(props);

    this.state = {
      complete: false,
      requested: false, 
    };
  }

   getTokenFromStorage = async () => {
    const token = await AsyncStorage.getItem(StorageKeys.authToken);
    return token;
  }

   pushStatetoWeb = async (url) => {
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
      'body': JSON.stringify({
  
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        requested: true,
        complete: true,
      })
    })
    .catch((error) => {
      console.error(error);
    });
  }

  requestCity(){
    let url = ApiEndpoints.url + ApiEndpoints.requestcityPath;
    const bearerToken = this.getTokenFromStorage();
    this.pushStatetoWeb(url);
  }

  static navigationOptions = {
        title: 'Comps',
        headerTitleStyle :{textAlign: 'center',alignSelf:'center', color: '#fff'},
        headerStyle:{
            backgroundColor:'#0091FF',
        },
  };

  render() {
    return (
      <View style ={styles.header}>
      <View style={{flex:1}}>
        <View style={{flex:1, alignItems:'center'}}>
          <Image style={{width: 60, height: 70, marginTop: 40, paddingBottom: 0}} 
              source={require('./Homewise.png')}/>
          <Text style={{fontSize: 20, fontWeight: 'bold', paddingTop: 10, paddingBottom: 45}}>A.I. CMA Coming Soon</Text>
        </View>
        <View style ={{flex:3}}>
        <View style={styles.container}>
            <View style={styles.body}>
              <View>
                
                  <Text style={styles.captionText}>Placeholder Text</Text>
                
                
              
                  <Text style={styles.captionText}>Placeholder Text</Text>
                 
               
              
                  <Text style={styles.captionText}>Placeholder Text</Text>
              <TouchableOpacity
                 style = {this.state.complete? styles.submitButtonNotComplete : styles.submitButtonComplete}
                 onPress = {
                      () => this.requestCity()
                   }>
                {this.state.complete?
                  <Text style={styles.submitNotButtonText}>Requested</Text>
                  :
                  <Text style={styles.submitButtonText}>Request in my City</Text>
                }
              </TouchableOpacity> 
              </View>         
            </View>
        </View> 
        </View>
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
    justifyContent: 'center'
  },
  caption: {
    marginLeft: 35,
    flex:3,
    flexDirection: 'row',
    paddingBottom: 0,
  },
  captionText: {
    fontSize: 32,
    paddingBottom: 35 ,
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
  },
   submitButtonComplete: {
    marginRight: 35,
    marginLeft: 35,

    height: 50,
    
    paddingRight: 10,
    paddingLeft: 15,
    backgroundColor: '#20BF55',
    justifyContent:'center', 
    alignItems:'center'
  },
  submitButtonNotComplete: {
    marginRight: 35,
    marginLeft: 35,

    height: 50,
    
    paddingRight: 10,
    backgroundColor: '#fff',
    borderColor: '#20BF55',
    borderRadius: 5,
    borderWidth: 1,
    justifyContent:'center', 
    alignItems:'center',
  },
  submitButtonText:{
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  submitNotButtonText:{
    color: '#20BF55',
    fontSize: 20,
    fontWeight: 'bold'
  },
});
