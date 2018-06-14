/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';
 import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  AsyncStorage
} from 'react-native';

import HomeScreen from './HomeScreen';
import Login from './Login';
import Registration from './Registration';
import ForgotPassword from './ForgotPassword';
import AllClients from './AllClients';
import Steps from './Steps';
import AgentProfile from './AgentProfile'
import NewClient from './NewClient'
import States from './States'

import {Clients, HomeNav} from './Router';
import {Tabs} from './Router';

import {StorageKeys} from './AppConfig.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      first_name:'',
      last_name:'',
      email:'',
      password:'',
      retypePass:'',
      users: '',
      mls_region: '',
      mls_id:'',

      validAuth: false
    }
  }

  componentDidMount() {
    // Check Auth state
    async () => {
      const authToken = await AsyncStorage.getItem(StorageKeys.authToken);
      if(value !== null) {
        // Check validity
        const authExpiry = await AsyncStorage.getItem(StorageKeys.authExpiry);
        if(value !== null && Date() < Date(value)) {
          // Valid, unexpired token
          this.setState({
            validAuth: true
          });
        }
      }
    }
  }

  render() {
    return (
      <View style={{flex:1}}>
        <HomeNav/>
        {this.state.validAuth ? (
          <HomeNav />
        ) : (
          <Clients />
        )}
      </View>
    );
    }
  }

  const styles = StyleSheet.create({
    row: {
    flex: 6,
    flexDirection: 'row',
    marginBottom: 20,
    paddingBottom: 0
  },

  caption: {
    marginLeft: 22,
    flex:3,
    flexDirection: 'row',
    paddingBottom: 0,
    //alignItems: 'flex-end'
  },
  captionText: {
    fontSize: 16,
    paddingBottom: 0
  },
    first_name: {
    marginRight: 20,
    flex:5,
    borderColor: '#D3D3D3',
    borderBottomWidth: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    height: 20,
    fontSize: 20,
    paddingRight: 10,

    textAlign: 'right',
    //backgroundColor: '#F7F7F5'
    }
    
  });


