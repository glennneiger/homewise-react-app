import React, { Component } from 'react';
 import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import {
  StackNavigator, TabNavigator
} from 'react-navigation';
import Icon2 from 'react-native-vector-icons/Ionicons';


import HomeScreen from './HomeScreen';
import Login from './Login';
import Registration from './Registration';
import ForgotPassword from './ForgotPassword';
import AllClients from './AllClients';
import Steps from './Steps';
import CalcScreens from './Calculator/CalcScreens'
import AgentProfile from './AgentProfile'
import CompsPreview from './CompsPreview'


import NewClient from './NewClient'
import States from './States'

import ChangePassword from './ChangePassword';


export const Clients = StackNavigator(
{
  AllClients: {
    screen: AllClients,
  },
  Steps:{
    screen: Steps
  },
  NewClient:{
    screen: NewClient,
    navigationOptions: {
      headerTintColor: 'white'
    }
  }
});

export const Calculators = StackNavigator(
{
  CalcScreens: {
    screen: CalcScreens
  }
});


export const Tabs = TabNavigator({
  Clients: {
    screen: Clients,
    navigationOptions: {
      tabBarLabel: 'Clients',
      tabBarIcon: ({ tintColor }) => <Icon2 name="md-contacts" size= {35} color ={tintColor}></Icon2>,
    }
  },
  CalcScreens:{
    screen: Calculators,
    navigationOptions: {
      tabBarLabel: 'Calculators',
      tabBarIcon: ({ tintColor }) => <Icon2 name="md-calculator" size= {35} color ={tintColor}></Icon2>,
    },
  },
   CompsPreview: {
    screen: CompsPreview,
    navigationOptions: {
      tabBarLabel: 'Comps',
      tabBarIcon: ({ tintColor }) => <Icon2 name="md-build" size= {35} color = {tintColor}></Icon2>, 
    },
  },
  Profile:{
    screen: AgentProfile,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => <Icon2 name="md-contact" size= {35} color = {tintColor}></Icon2>,
    }
  }
});

export const HomeNav = StackNavigator(
    {
        HomeScreen: {
            screen: HomeScreen,
        },
        Login: {
            screen: Login,
        },
        Registration: {
            screen: Registration,
        },
        ForgotPassword:{
          screen: ForgotPassword,
        },
        ChangePassword:{
          screen: ChangePassword,
        }
    }
);
