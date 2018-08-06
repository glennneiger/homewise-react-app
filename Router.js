import React, { Component } from 'react';
 import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import {
  StackNavigator, TabNavigator, createSwitchNavigator
} from 'react-navigation';
import Icon2 from 'react-native-vector-icons/Ionicons';


import HomeScreen from './HomeScreen';
import Login from './Login';
import Registration from './Registration';
import ForgotPassword from './ForgotPassword';
import AllClients from './AllClients';
import Steps from './Steps';
import CalcScreens from './Calculator/CalcScreens'
import FixNFlipScreen from './Calculator/FixNFlipScreen'
import MortgageScreen from './Calculator/MortgageScreen'
import ROIScreen from './Calculator/ROIScreen'
import AgentProfile from './AgentProfile'
import CompsPreview from './CompsPreview'
import AddStep from './AddStep'
import SingleStep from './SingleStep'



import NewClient from './NewClient'
import States from './States'

import ChangePassword from './ChangePassword';

import AuthLoadingScreen from './AuthLoadingScreen'


export const Clients = StackNavigator(
{
  AllClients: {
    screen: AllClients,
    navigationOptions: {
      gesturesEnabled: false,
    }
  },
  Steps:{
    screen: Steps,
    navigationOptions: {
      gesturesEnabled: false,
    }
  },
  NewClient:{
    screen: NewClient,
    navigationOptions: {
      headerTintColor: 'white',
      gesturesEnabled: false,
    }
  },
  AddStep:{
    screen: AddStep,
    navigationOptions: {
      gesturesEnabled: false,
    }
  },
  SingleStep:{
    screen: SingleStep,
    navigationOptions: {
      gesturesEnabled: false,
    }
  }
});

export const Calculators = StackNavigator(
{
  ROIScreen: {
    screen: ROIScreen,
    navigationOptions: {
      gesturesEnabled: false,
    }
  },
  MortgageScreen: {
    screen: MortgageScreen,
    navigationOptions: {
      gesturesEnabled: false,
    }
  },
  FixNFlipScreen: {
    screen: FixNFlipScreen,
    navigationOptions: {
      gesturesEnabled: false,
    }
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

export const AuthNav = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: Tabs,
    Auth: HomeNav,  
  },
  {
    initialRouteName: 'AuthLoading',
  }
);