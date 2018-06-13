import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity, 
  LayoutAnimation, 
  UIManager, 
  Platform,
  ART
} from 'react-native';

import PropTypes from 'prop-types';

import styles from './stylesFixNFlip';

import ROIScreen from './ROIScreen';
import MortgageScreen from './MortgageScreen';
import FixNFlipScreen from './FixNFlipScreen';


export default class CalcScreens extends Component {

  constructor(props){
    super(props);

    this.state = {
      currentScreen: 'ROIScreen',
    };
  }

   static navigationOptions = {
        title: 'Calculators',
        headerTitleStyle :{textAlign: 'center',alignSelf:'center', color: '#fff'},
        headerStyle:{
            backgroundColor:'#0091FF',
        },
    };


  render () {
    return (
      <View style={styles.container}>
        <View style={styles.otherStuff}>
          <View style={styles.info}>
            <TouchableOpacity
            onPress = {() => {
              console.log(this.state);
              this._setROIScreen();}}>
                <Text style = {styles.submitButtonText}> ROI </Text>
            </TouchableOpacity>  
          </View>
          <View style={styles.info}>
            <TouchableOpacity
            onPress = {() => {
              console.log(this.state);
              this._setMortgageScreen();}}>
                <Text style = {styles.submitButtonText}> Mortgage </Text>
            </TouchableOpacity>  
          </View>
          <View style={styles.info}>
            <TouchableOpacity
            onPress = {() => this._setFixNFlipScreen()}>
                <Text style = {styles.submitButtonText}> Fix&Flip </Text>
            </TouchableOpacity>  
          </View>
        </View>
        <View style={{flex: 9}}>
          {this.calcDisplay()}
        </View>
      </View>

    );
  }

  calcDisplay() {
    if (this.state.currentScreen == 'ROIScreen'){
      return <ROIScreen />;
    }
    else if(this.state.currentScreen == 'MortgageScreen'){
      return <MortgageScreen />;
    }
    else if(this.state.currentScreen == 'FixNFlipScreen'){
      return <FixNFlipScreen />;
    }
    else{
      return <Text>Error</Text>;
    }
  }

  _setROIScreen(){
    this.setState({
      currentScreen: 'ROIScreen',
    });
    
  }

  _setMortgageScreen(){
    this.setState({
      currentScreen: 'MortgageScreen',
    });
  }

  _setFixNFlipScreen(){
    this.setState({
      currentScreen: 'FixNFlipScreen',
    });
  }


}