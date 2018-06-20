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
  ART,
  KeyboardAvoidingView
} from 'react-native';

import PropTypes from 'prop-types';


import ROIScreen from './ROIScreen';
import MortgageScreen from './MortgageScreen';
import FixNFlipScreen from './FixNFlipScreen';


export default class CalcScreens extends Component {

  constructor(props){
    super(props);

    this.state = {
      currentScreen: 'ROIScreen',
      ROIScreen: true,
      Mortgage: false,
      FixNFlip: false
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
    console.disableYellowBox = true;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.otherStuff}>
          
          {this.state.ROIScreen?
            <View style={styles.headerTabs1selected}>
            <TouchableOpacity
            onPress = {() => {
              console.log(this.state);
              this._setROIScreen();}}>
                <Text style = {{color: '#fff'}}> ROI </Text>
            </TouchableOpacity> 
            </View>
            :
            <View style={styles.headerTabs1}>
            <TouchableOpacity
            onPress = {() => {
              console.log(this.state);
              this._setROIScreen();}}>
                <Text style = {{color: '#0091FF'}}> ROI </Text>
            </TouchableOpacity> 
            </View>
          }
          {this.state.Mortgage?
            <View style={styles.headerTabs2selected}>
            <TouchableOpacity
            onPress = {() => {
              console.log(this.state);
              this._setMortgageScreen();}}>
                <Text style = {{color: '#fff'}}> Mortgage </Text>
            </TouchableOpacity> 
            </View>
            :
            <View style={styles.headerTabs2}>
            <TouchableOpacity
            onPress = {() => {
              console.log(this.state);
              this._setMortgageScreen();}}>
                <Text style = {{color: '#0091FF'}}> Mortgage </Text>
            </TouchableOpacity> 
            </View>
          }
          {this.state.FixNFlip?
            <View style={styles.headerTabs3selected}>
            <TouchableOpacity
            onPress = {() => {
              console.log(this.state);
              this._setFixNFlipScreen();}}>
                <Text style = {{color: '#fff'}}> Fix & Flip </Text>
            </TouchableOpacity> 
            </View>
            :
            <View style={styles.headerTabs3}>
            <TouchableOpacity
            onPress = {() => {
              console.log(this.state);
              this._setFixNFlipScreen();}}>
                <Text style = {{color: '#0091FF'}}> Fix & Flip </Text>
            </TouchableOpacity> 
            </View>
          }
        </View>
        <View style={{flex: 9.2}}>
          {this.calcDisplay()}
        </View>
      </KeyboardAvoidingView>

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
      ROIScreen: true,
      Mortgage: false,
      FixNFlip: false
    });
    
  }

  _setMortgageScreen(){
    this.setState({
      currentScreen: 'MortgageScreen',
      ROIScreen: false,
      Mortgage: true,
      FixNFlip: false
    });
  }

  _setFixNFlipScreen(){
    this.setState({
      currentScreen: 'FixNFlipScreen',
      ROIScreen: false,
      Mortgage: false,
      FixNFlip: true
    });
  }


}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  headerTabs1:{
    flex:3,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#0091FF',
    borderWidth: 1,
    position: 'relative',
    top: 0,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    paddingTop:5,
    paddingBottom:5,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
  },
  headerTabs1selected:{
    flex:3,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#0091FF',
    borderWidth: 1,
    position: 'relative',
    top: 0,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    paddingTop: 5,
    paddingBottom:5,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    backgroundColor: '#0091FF'
  },
  headerTabs2:{
    flex:3,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#0091FF',
    borderWidth: 1,
    position: 'relative',
    top: 0,
    marginTop: 10,
    marginBottom: 10,
    paddingTop:5,
    paddingBottom:5,
  },
   headerTabs2selected:{
    flex:3,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#0091FF',
    borderWidth: 1,
    position: 'relative',
    top: 0,
    marginTop: 10,
    marginBottom: 10,
    paddingTop:5,
    paddingBottom:5,
    backgroundColor: '#0091FF'
  },
  headerTabs3:{
    flex:3,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#0091FF',
    borderWidth: 1,
    position: 'relative',
    top: 0,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    paddingTop:5,
    paddingBottom:5,
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
  },
  headerTabs3selected:{
    flex:3,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#0091FF',
    borderWidth: 1,
    position: 'relative',
    top: 0,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    paddingTop:5,
    paddingBottom:5,
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: '#0091FF'
  },



  otherStuff: {
    flex:0.9,
    flexDirection: 'row'
  },




});

