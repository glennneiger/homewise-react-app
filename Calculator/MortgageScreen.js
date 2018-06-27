import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity, 
  LayoutAnimation, 
  UIManager, 
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PropTypes from 'prop-types';


import Numeral from 'numeral';

import styles from './styles';
import Row from './Row';


class MortgageScreen extends Component {

  constructor(props) {
    super(props);
    if( Platform.OS === 'android' ){
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }


    this.state = {
      introScreen: true,

      monthlyMortgage: 0,
      upfrontCosts: 0,

      listPrice: 0,
      downPayment: 0,
      downPaymentPercent: 20,
      closingCosts: 0,
      closingCostsPercent: 3,
      loanTerm: 30,
      interestRate: 4.25,
      rehabCosts: 0,

      // textLayoutHeightUpfront: 0,
      // updatedHeightUpfront: 0, 
      // expandUpfront: false,
      // arrowUpfront: '^',

      // textLayoutHeightIncome: 0,
      // updatedHeightIncome: 0, 
      // expandIncome: false,
      // arrowIncome: '^',

      // textLayoutHeightExpense: 0,
      // updatedHeightExpense: 0, 
      // expandExpense: false,
      // arrowExpense: '^',
    };
  }

    static navigationOptions = {
        title: 'Calculators',
        headerTitleStyle :{textAlign: 'center',alignSelf:'center', color: '#fff', fontSize: 22},
        headerStyle:{
            backgroundColor:'#0091FF',
        },
        headerLeft: null
    };


  _expand_collapse_function_upfront(){
    LayoutAnimation.configureNext( LayoutAnimation.Presets.easeInEaseOut );

    if( this.state.expandUpfront == false ){
      this.setState({ 
        updatedHeightUpfront: this.state.textLayoutHeightUpfront, 
        expandUpfront: true, 
        arrowUpfront: 'v'
      }); 
    }
    else{
      this.setState({ 
        updatedHeightUpfront: 0, 
        expandUpfront: false, 
        arrowUpfront: '^'
      });
    }
  }

  _expand_collapse_function_income(){
    LayoutAnimation.configureNext( LayoutAnimation.Presets.easeInEaseOut );

    if( this.state.expandIncome == false ){
      this.setState({ 
        updatedHeightIncome: this.state.textLayoutHeightIncome, 
        expandIncome: true, 
      }); 
    }
    else{
      this.setState({ 
        updatedHeightIncome: 0, 
        expandIncome: false, 
      });
    }
  }

  _expand_collapse_function_expense(){
    LayoutAnimation.configureNext( LayoutAnimation.Presets.easeInEaseOut );

    if( this.state.expandExpense == false ){
      this.setState({ 
        updatedHeightExpense: this.state.textLayoutHeightExpense, 
        expandExpense: true, 
      }); 
    }
    else{
      this.setState({ 
        updatedHeightExpense: 0, 
        expandExpense: false, 
      });
    }
  }

  setHeightUpfront(height){
    this.setState({ textLayoutHeightUpfront: height});
  }

  setHeightIncome(height){
    this.setState({ textLayoutHeightIncome: height});
  }

  setHeightExpense(height){
    this.setState({ textLayoutHeightExpense: height});
  }


  render() {

    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView innerRef={ref => {this.scroll = ref}}>
              <View style={styles.otherStuff}>
                <View>
                  <TouchableOpacity
                  style={styles.idk}
                  onPress = {() => {
                    this.props.navigation.navigate('ROIScreen')
                    console.log(this.state);}}>
                      <Text style = {{color: '#0091FF'}}> ROI </Text>
                  </TouchableOpacity> 
                </View>
                <View>
                  <TouchableOpacity
                  style={styles.headerTabs2selected}
                  onPress = {() => {
                    console.log(this.state);}}>
                      <Text style = {{color: '#fff'}}> Mortgage </Text>
                  </TouchableOpacity> 
                </View>
                <View>
                  <TouchableOpacity
                  style={styles.headerTabs3}
                  onPress = {() => {
                    this.props.navigation.navigate('FixNFlipScreen')}}>
                      <Text style = {{color: '#0091FF'}}> Fix & Flip </Text>
                  </TouchableOpacity> 
                </View>
              </View>
          <View style={{backgroundColor: '#fff',flexDirection: 'row', justifyContent: 'flex-end'}}>

            <TouchableOpacity
              onPress = {
              () => this._reset()
              }>
              <Text style = {styles.submitButtonText}> Reset </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.header}>
            <View style={styles.headerValues}>
              <View style={styles.mortgage}>
                <Text style={styles.mortgageText}>${this.state.monthlyMortgage}</Text>
                <Text>Monthly Mortgage</Text>
                <Text></Text>
              </View>
              <View style={styles.mortgage}>
                <Text style={styles.mortgageText}>${this.state.upfrontCosts}</Text>
                <Text>Upfront Costs</Text>
                <Text></Text>
              </View>
            </View>
          </View>
          <View style={styles.body}> 
            <View style={styles.caption}>
              <Text style={styles.captionText}>Purchase Price</Text>
            </View>
            <View style={styles.row}>
              <TextInput
                style={styles.dollaSign}
                keyboardType = {'numeric'}
                value = '$'
                underlineColorAndroid='transparent'
                editable={false}>
              </TextInput>
              <TextInput
                style={styles.values}
                keyboardType = {'numeric'}
                returnKeyType = {'done'}
                placeholder = '0'
                underlineColorAndroid='transparent'
                value = {Numeral((this.state.listPrice).toString()).format('0,0')}
                onChangeText={(listPrice) => this._listPriceOnChangeText(listPrice)}>
              </TextInput>
              <TextInput
                style={styles.percentPlace}
                editable={false}>
              </TextInput>
            </View>

                <View style={styles.caption}>
                  <Text style={styles.captionText}>Down Payment</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.dollaSign}
                    keyboardType = {'numeric'}
                    value = '$'
                    underlineColorAndroid='transparent'
                    editable={false}>
                  </TextInput>
                  <TextInput
                    style={styles.values}
                    keyboardType = {'numeric'}
                    returnKeyType = {'done'}
                    placeholder = '0'
                    value = {(this.state.downPayment).toString()}
                    underlineColorAndroid='transparent'
                    onChangeText={(downPayment) => this._downPaymentOnChangeText(downPayment)}>
                  </TextInput>
                  <TextInput
                    style={styles.percentValue}
                    returnKeyType = {'done'}
                    placeholder = '0'
                    keyboardType ={'numeric'}
                    underlineColorAndroid='transparent'
                    value = {(this.state.downPaymentPercent).toString()}
                    onChangeText={(downPaymentPercent) => this._downPaymentPercentOnChangeText(downPaymentPercent)}>
                  </TextInput>
                  <TextInput
                    style={styles.percentSign}
                    keyboardType = {'numeric'}
                    value = '%'
                    underlineColorAndroid='transparent'
                    editable={false}>
                  </TextInput>
                </View>


                <View style={styles.caption}>
                  <Text style={styles.captionText}>Closing Costs</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.dollaSign}
                    keyboardType = {'numeric'}
                    value = '$'
                    underlineColorAndroid='transparent'
                    editable={false}>
                  </TextInput>
                  <TextInput
                    style={styles.values}
                    keyboardType = {'numeric'}
                    returnKeyType = {'done'}
                    placeholder = '0'
                    value = {(this.state.closingCosts).toString()}
                    underlineColorAndroid='transparent'
                    onChangeText={(closingCosts) => this._closingCostsOnChangeText(closingCosts)}>
                  </TextInput>
                  <TextInput
                    style={styles.percentValue}
                    returnKeyType = {'done'}
                    placeholder = '0'
                    keyboardType ={'numeric'}
                    underlineColorAndroid='transparent'
                    value = {(this.state.closingCostsPercent).toString()}
                    onChangeText={(closingCostsPercent) => this._closingCostsPercentOnChangeText(closingCostsPercent)}>
                  </TextInput>
                  <TextInput
                    style={styles.percentSign}
                    keyboardType = {'numeric'}
                    value = '%'
                    underlineColorAndroid='transparent'
                    editable={false}>
                  </TextInput>
                </View>                

            <Row caption="Interest Rate" sign='%' value={(this.state.interestRate).toString()}  update={(interestRate) => this.setState({interestRate})}/>
            <Row caption="Loan Term (Years)" sign='' value={Numeral((this.state.loanTerm).toString()).format('0,0.[00]')} update={(loanTerm) => this.setState({loanTerm})}/>
            <Row caption="Rehab Costs" sign='$' value={Numeral((this.state.rehabCosts).toString()).format('0,0.[00]')} update={(rehabCosts) => this.setState({rehabCosts})}/>
          </View>
          <TouchableOpacity
                   style = {styles.submitButton2}
                   onPress = {
                      () => this._calculateMortgage(Numeral(this.state.listPrice).value())
                   }>
                   <Text style = {styles.submitButtonText2}> Calculate </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    );
  }

  _onClick(){
    this.props.toggle_mortgage_screen();
    console.log(this.state);
  }  

  _reset(){
    this.setState({
      monthlyMortgage: 0,
      upfrontCosts: 0,

      listPrice: 0,
      downPayment: 0,
      downPaymentPercent: 20,
      closingCosts: 0,
      closingCostsPercent: 3,
      loanTerm: 30,
      interestRate: 4,
      rehabCosts: 0,
    });
  } 

  _listPriceOnChangeText(listPrice){
    let downPayment;
    let closingCosts;

    downPayment = Numeral(listPrice).value() * (Number.parseFloat(this.state.downPaymentPercent)/100);
    closingCosts = Numeral(listPrice).value() * (Number.parseFloat(this.state.closingCostsPercent)/100);

    this.setState({
      listPrice: Numeral((listPrice).toString()).format('0,0.[00]'),
      downPayment: Numeral((downPayment).toString()).format('0,0.[00]'),
      closingCosts: Numeral((closingCosts).toString()).format('0,0.[00]'),

      introScreen: false,
    }); 
  }

  _downPaymentOnChangeText(downPayment){

    let downPaymentVal = Numeral(downPayment).value();
    let downPaymentPercent = (downPaymentVal / Numeral(this.state.listPrice).value()) * 100;
    console.log('listPrice ' + this.state.listPrice);
    console.log('downPayment ' + downPaymentVal);
    console.log('downPaymentPercent ' + downPaymentPercent);

    this.setState({
      downPayment: Numeral((downPayment).toString()).format('0,0'),
      downPaymentPercent: +(downPaymentPercent.toFixed(2))
    });
  }

  _downPaymentPercentOnChangeText(downPaymentPercent){

    let downPayment = Numeral(this.state.listPrice).value() * (Number.parseFloat(downPaymentPercent)/100);

    this.setState({
      downPayment: Numeral((downPayment).toString()).format('0,0.[00]'),
      downPaymentPercent: downPaymentPercent
    })
  }

  _closingCostsOnChangeText(closingCosts){

    let closingCostsVal = Numeral(closingCosts).value();
    let closingCostsPercent = (closingCostsVal / Numeral(this.state.listPrice).value()) * 100;


    this.setState({
      closingCosts: Numeral((closingCosts).toString()).format('0,0.[00]'),
      closingCostsPercent: +(closingCostsPercent.toFixed(2))
    });
  }

  _closingCostsPercentOnChangeText(closingCostsPercent){

    let closingCosts = Numeral(this.state.listPrice).value() * (Number.parseFloat(closingCostsPercent)/100);

    this.setState({
      closingCosts: Numeral((closingCosts).toString()).format('0,0.[00]'),
      closingCostsPercent: closingCostsPercent
    })
  }



  _calculateMortgage(listPrice){
    let downPayment = Numeral(this.state.downPayment).value();
    let closingCosts = Numeral(this.state.closingCosts).value();

    let loanTerm = Numeral(this.state.loanTerm).value() * 12;
    let interestRate = Number.parseFloat(this.state.interestRate)/100;
    let rehabCosts = Numeral(this.state.rehabCosts).value();

    let interestRateVal = 1 + (interestRate/12);

    let monthlyMortgage = ((listPrice - downPayment) * (interestRate/12) * 
      Math.pow(interestRateVal,loanTerm))/(Math.pow(interestRateVal,loanTerm) - 1);

    let monthlyMortgageRound = Numeral((Math.round(monthlyMortgage)).toString()).format('0,0');

    let upfrontCosts = Numeral((Math.round(downPayment + closingCosts + rehabCosts)).toString()).format('0,0');

    this.scroll.props.scrollToPosition(0, 0)

    this.setState({
      monthlyMortgage: monthlyMortgageRound,

      downPayment: downPayment,
      closingCosts: closingCosts,
      upfrontCosts: upfrontCosts,

      introScreen: false,
    });     
  }
}



export default MortgageScreen;