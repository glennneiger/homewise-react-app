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
  View
} from 'react-native';

import HomeScreen from './HomeScreen';
import Login from './Login';
import Registration from './Registration';
import ForgotPassword from './ForgotPassword';
import AllClients from './AllClients';
import Steps from './Steps';
import AgentProfile from './AgentProfile'

import {Clients, HomeNav} from './Router';
import {Tabs} from './Router';

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
    }
  }
  render() {
    return (
      <View style={{flex:1}}>
        <Tabs/>
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


