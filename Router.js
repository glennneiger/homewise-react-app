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

import HomeScreen from './HomeScreen';
import Login from './Login';
import Registration from './Registration';
import ForgotPassword from './ForgotPassword';
import AllClients from './AllClients';
import Steps from './Steps';
import CalcScreens from './Calculator/CalcScreens'
import AgentProfile from './AgentProfile'


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
    screen: NewClient
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
    screen: Clients
  },
  CalcScreens:{
    screen: Calculators
  },
  Profile:{
    screen: AgentProfile
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
