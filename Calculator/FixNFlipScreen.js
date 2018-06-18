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
  ART,
  KeyboardAvoidingView
} from 'react-native';
import PropTypes from 'prop-types';
import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';

import Numeral from 'numeral';


import styles from './styles';
import Row from './Row';


class FixNFlipScreen extends Component {

  constructor(props) {
    super(props);
    if( Platform.OS === 'android' ){
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }


    this.state = {
      introScreen: true,

      roi: 0,
      roiAnnualized: 0,
      totalProjectedPreTaxProfits: 0,
      totalCashInvested: 0,
      monthlyHoldingCosts: 0,
      totalProjectedPreTaxProfitsHalf: 0,
      totalProjectedPreTaxProfitsDouble: 0,     
      monthlyMortgage: 0,

      monthlyExpenses: 0,

      listPrice: 0,
      downPayment: 0,
      downPaymentPercent: 20,
      loanTerm: 30,
      interestRate: 4,
      annualPropertyTaxes: 0,
      purchaseClosingCosts: 0,
      purchaseClosingCostsPercent: 3,

      exteriorRepairs: 0,
      interiorRepairs: 0,
      
      electric: 0,
      gas: 0,
      water: 0,
      sewer: 0,
      garbage: 0,
      hoa: 0,
      insurance: 0,
      other: 0,
      monthlyPropertyTaxes: 0,

      arv: 0,
      realEstateAgentFee: 0,
      otherMiscClosingCosts: 0,
      numberOfDaysHeld: 0,
      halfDaysHeld: 0,
      doubleDaysHeld: 0

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

  // componentWillMount(){
  //   this.props.toggle_roi_screen();
  // }

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
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

        <ScrollView ref='_scrollView'>
          <View style={{backgroundColor: '#fff',flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TouchableOpacity
              onPress = {
              () => this._reset()
              }>
              <Text style = {styles.submitButtonText}> Reset </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headerFixNFlip}>
              <AnimatedGaugeProgress
                size={300}
                width={15}
                fill={Number.parseInt(this.state.roi, 10)}
                rotation={90}
                cropDegree={180}
                tintColor="#0091FF"
                backgroundColor="#e7e7e7"
                stroke={[2, 2]} 
                strokeCap="circle">
                <View style={styles.textView}>
                  <View style={{backgroundColor: '#4BD964', marginTop: 15, marginBottom: 10, width: 110,height: 40, justifyContent: 'center', alignItems: 'center', padding: 7,borderRadius: 12,}}>
                    <Text style={{color: '#fff', fontSize: 17}}>{this.state.roi}%</Text>
                  </View>
                  <Text style = {{color:'black', fontSize: 18, marginBottom: 25}}>ROI</Text>
                  </View>
              </AnimatedGaugeProgress>
              <View style={styles.fnfheaderval1}>
                <View style={styles.fnfinfo}>
                  <Text style={styles.infoTextFixNFlip}>{this.state.roiAnnualized}%</Text>
                  <Text style={styles.subTextFixNFlip}>ROI</Text>
                  <Text style={styles.subTextFixNFlip}>Annualized</Text>
                </View>
                <View style={styles.fnfinfo}>
                  <Text style={styles.infoTextFixNFlip}>${this.state.totalCashInvested}</Text>
                  <Text style={styles.subTextFixNFlip}>Total Cash</Text>
                  <Text style={styles.subTextFixNFlip}>Invested</Text>
                </View>
                <View style={styles.fnfinfo}>
                  <Text style={styles.infoTextFixNFlip}>${this.state.monthlyHoldingCosts}</Text>
                  <Text style={styles.subTextFixNFlip}>Monthly</Text>
                  <Text style={styles.subTextFixNFlip}>Holding Costs</Text>
                </View>                
              </View>
              <View style={styles.fnfheaderval2}>
                <View style={styles.fnfinfo}>
                  <Text style={styles.infoTextFixNFlip}>${this.state.totalProjectedPreTaxProfitsHalf}</Text>
                  <Text style={styles.subTextFixNFlip}>Profits</Text>
                  <Text style={styles.subTextFixNFlip}>{this.state.halfDaysHeld} Days</Text>
                </View>
                <View style={styles.fnfinfo}>
                  <Text style={styles.infoTextFixNFlip}>${this.state.totalProjectedPreTaxProfits}</Text>
                  <Text style={styles.subTextFixNFlip}>Profits</Text>
                  <Text style={styles.subTextFixNFlip}>{this.state.numberOfDaysHeld} Days</Text>
                </View>
                <View style={styles.fnfinfo}>
                  <Text style={styles.infoTextFixNFlip}>${this.state.totalProjectedPreTaxProfitsDouble}</Text>
                  <Text style={styles.subTextFixNFlip}>Profits</Text>
                  <Text style={styles.subTextFixNFlip}>{this.state.doubleDaysHeld} Days</Text>
                </View>                
              </View>
            </View>
          <View style={styles.body}> 
            <View style={styles.headerRow}>
              <Text style={styles.headerRowText}>Purchase Details</Text>
            </View>

            <View style={styles.caption}>
              <Text style={styles.captionText}>Purchase Price</Text>
            </View>
            <View style={styles.row}>
              <TextInput
                style={styles.dollaSign}
                keyboardType = {'numeric'}
                value = '$'
                editable={false}>
              </TextInput>
              <TextInput
                style={styles.values}
                keyboardType = {'numeric'}
                returnKeyType = {'done'}
                placeholder = '0'
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
                editable={false}>
              </TextInput>
              <TextInput
                style={styles.values}
                keyboardType = {'numeric'}
                returnKeyType = {'done'}
                placeholder = '0'
                value = {Numeral((this.state.downPayment).toString()).format('0,0')}
                onChangeText={(downPayment) => this._downPaymentOnChangeText(downPayment)}>
              </TextInput>
              <TextInput
                style={styles.percentValue}
                returnKeyType = {'done'}
                placeholder = '0'
                value = {(this.state.downPaymentPercent).toString()}
                onChangeText={(downPaymentPercent) => this._downPaymentPercentOnChangeText(downPaymentPercent)}>
              </TextInput>
              <TextInput
                style={styles.percentSign}
                keyboardType = {'numeric'}
                value = '%'
                editable={false}>
              </TextInput>
            </View>


            <Row caption="Interest Rate" sign='%' value={(this.state.interestRate).toString()} update={(interestRate) => this.setState({interestRate})}/>
            <Row caption="Loan Term (Years)" sign='' value={Numeral((this.state.loanTerm).toString()).format('0,0')} update={(loanTerm) => this.setState({loanTerm})}/>

            <View style={styles.caption}>
              <Text style={styles.captionText}>Annual Property Taxes</Text>
            </View>
            <View style={styles.row}>
              <TextInput
                style={styles.dollaSign}
                keyboardType = {'numeric'}
                value = '$'
                editable={false}>
              </TextInput>
              <TextInput
                style={styles.values}
                keyboardType = {'numeric'}
                returnKeyType = {'done'}
                placeholder = '0'
                value = {Numeral((this.state.annualPropertyTaxes).toString()).format('0,0')}
                onChangeText={(annualPropertyTaxes) => this._annualPropertyTaxesOnChangeText(annualPropertyTaxes)}>
              </TextInput>
              <TextInput
                style={styles.percentPlace}
                editable={false}>
              </TextInput>
            </View>


            <View style={styles.caption}>
              <Text style={styles.captionText}>Purchase Closing Costs</Text>
            </View>
            <View style={styles.row}>
              <TextInput
                style={styles.dollaSign}
                keyboardType = {'numeric'}
                value = '$'
                editable={false}>
              </TextInput>
              <TextInput
                style={styles.values}
                keyboardType = {'numeric'}
                returnKeyType = {'done'}
                placeholder = '0'
                value = {Numeral((this.state.purchaseClosingCosts).toString()).format('0,0')}
                onChangeText={(purchaseClosingCosts) => this._closingCostsOnChangeText(purchaseClosingCosts)}>
              </TextInput>
              <TextInput
                style={styles.percentValue}
                returnKeyType = {'done'}
                placeholder = '0'
                value = {(this.state.purchaseClosingCostsPercent).toString()}
                onChangeText={(purchaseClosingCostsPercent) => this._closingCostsPercentOnChangeText(purchaseClosingCostsPercent)}>
              </TextInput>
              <TextInput
                style={styles.percentSign}
                keyboardType = {'numeric'}
                value = '%'
                editable={false}>
              </TextInput>
            </View>   



            <View style={styles.headerRow}>
              <Text style={styles.headerRowText}>Estimated Repair Costs</Text>
            </View>
            <Row caption="Exterior Repairs" sign='$' value={Numeral((this.state.exteriorRepairs).toString()).format('0,0')} update={(exteriorRepairs) => this.setState({exteriorRepairs})}/>
            <Row caption="Interior Repairs" sign='$' value={Numeral((this.state.interiorRepairs).toString()).format('0,0')} update={(interiorRepairs) => this.setState({interiorRepairs})}/>

            <View style={styles.headerRow}>
              <Text style={styles.headerRowText}>Estimated Repair Costs</Text>
            </View>
            <Row caption="Electric" sign='$' value={(this.state.electric).toString()} update={(electric) => this.setState({electric})}/>
            <Row caption="Gas" sign='$' value={(this.state.gas).toString()} update={(gas) => this.setState({gas})}/>
            <Row caption="Water" sign='$' value={(this.state.water).toString()} update={(water) => this.setState({water})}/>
            <Row caption="Sewer" sign='$' value={(this.state.sewer).toString()} update={(sewer) => this.setState({sewer})}/>
            <Row caption="Garbage" sign='$' value={(this.state.garbage).toString()} update={(garbage) => this.setState({garbage})}/>
            <Row caption="HOA" sign='$' value={(this.state.hoa).toString()} update={(hoa) => this.setState({hoa})}/>
            <Row caption="Insurance" sign='$' value={(this.state.insurance).toString()} update={(insurance) => this.setState({insurance})}/>
            <Row caption="Other" sign='$' value={(this.state.other).toString()} update={(other) => this.setState({other})}/>
            <Row caption="Monthly Property Tax" sign='$' value={(this.state.monthlyPropertyTaxes).toString()} update={(monthlyPropertyTaxes) => this.setState({monthlyPropertyTaxes})}/>

            <View style={styles.headerRow}>
              <Text style={styles.headerRowText}>Sale Details</Text>
            </View>
            <Row caption="Sales Price After Fix Up (ARV)" sign='$' value={Numeral((this.state.arv).toString()).format('0,0')} update={(arv) => this.setState({arv})}/>
            <Row caption="Real Estate Agent Fee" sign='$' value={Numeral((this.state.realEstateAgentFee).toString()).format('0,0')} update={(realEstateAgentFee) => this.setState({realEstateAgentFee})}/>
            <Row caption="Other Miscellaneous Closing Costs" sign='$' value={Numeral((this.state.otherMiscClosingCosts).toString()).format('0,0')} update={(otherMiscClosingCosts) => this.setState({otherMiscClosingCosts})}/>
            <Row caption="Number of Days Held (Days)" sign='' value={Numeral((this.state.numberOfDaysHeld).toString()).format('0,0')} update={(numberOfDaysHeld) => this.setState({numberOfDaysHeld})}/>
          </View>
          <TouchableOpacity
                   style = {styles.submitButton2}
                   onPress = {
                      () => this._calculate()
                   }>
                   <Text style = {styles.submitButtonText2}> Calculate </Text>
          </TouchableOpacity>
        </ScrollView>        
      </KeyboardAvoidingView>      
    );
  }

  _onClick(){
    this.props.toggle_fixnflip_screen();
    console.log(this.state);
  }  

    _reset(){
    this.setState({
      roi: 0,
      roiAnnualized: 0,
      totalProjectedPreTaxProfits: 0,
      totalCashInvested: 0,
      monthlyHoldingCosts: 0,
      totalProjectedPreTaxProfitsHalf: 0,
      totalProjectedPreTaxProfitsDouble: 0,     
      monthlyMortgage: 0,

      monthlyExpenses: 0,

      listPrice: 0,
      downPayment: 0,
      downPaymentPercent: 20,
      loanTerm: 30,
      interestRate: 4,
      annualPropertyTaxes: 0,
      purchaseClosingCosts: 0,
      purchaseClosingCostsPercent: 3,

      exteriorRepairs: 0,
      interiorRepairs: 0,
      
      electric: 0,
      gas: 0,
      water: 0,
      sewer: 0,
      garbage: 0,
      hoa: 0,
      insurance: 0,
      other: 0,
      monthlyPropertyTaxes: 0,

      arv: 0,
      realEstateAgentFee: 0,
      otherMiscClosingCosts: 0,
      numberOfDaysHeld: 0,
      halfDaysHeld: 0,
      doubleDaysHeld: 0
    });
  } 

  _listPriceOnChangeText(listPrice){
    let downPayment;
    let purchaseClosingCosts;

    downPayment = Numeral(listPrice).value() * (Number.parseFloat(this.state.downPaymentPercent)/100);
    purchaseClosingCosts = Numeral(listPrice).value() * (Number.parseFloat(this.state.purchaseClosingCostsPercent)/100);

    this.setState({
      listPrice: listPrice,
      downPayment: downPayment,
      purchaseClosingCosts: purchaseClosingCosts,

      introScreen: false,
    }); 
  } 

  _annualPropertyTaxesOnChangeText(annualPropertyTaxes){
    let monthlyPropertyTaxes = Numeral(annualPropertyTaxes).value()/12;

    this.setState({
      annualPropertyTaxes: annualPropertyTaxes,
      monthlyPropertyTaxes: monthlyPropertyTaxes
    }); 
  }

  _downPaymentOnChangeText(downPayment){

    let downPaymentVal = Numeral(downPayment).value();
    let downPaymentPercent = (downPaymentVal / Numeral(this.state.listPrice).value()) * 100;
    console.log('listPrice ' + this.state.listPrice);
    console.log('downPayment ' + downPaymentVal);
    console.log('downPaymentPercent ' + downPaymentPercent);

    this.setState({
      downPayment: downPayment,
      downPaymentPercent: +(downPaymentPercent.toFixed(2))
    });
  }

  _downPaymentPercentOnChangeText(downPaymentPercent){

    let downPayment = Numeral(this.state.listPrice).value() * (Number.parseFloat(downPaymentPercent)/100);

    this.setState({
      downPayment: downPayment,
      downPaymentPercent: downPaymentPercent
    })
  }

  _closingCostsOnChangeText(purchaseClosingCosts){

    let purchaseClosingCostsVal = Numeral(purchaseClosingCosts).value();
    let purchaseClosingCostsPercent = (purchaseClosingCosts / Numeral(this.state.listPrice).value()) * 100;


    this.setState({
      purchaseClosingCosts: purchaseClosingCosts,
      purchaseClosingCostsPercent: +(purchaseClosingCostsPercent.toFixed(2))
    });
  }

  _closingCostsPercentOnChangeText(purchaseClosingCostsPercent){

    let purchaseClosingCosts = Numeral(this.state.listPrice).value() * (Number.parseFloat(purchaseClosingCostsPercent)/100);

    this.setState({
      purchaseClosingCosts: purchaseClosingCosts,
      purchaseClosingCostsPercent: purchaseClosingCostsPercent
    })
  }

  _calculate(){
    let listPrice = Numeral(this.state.listPrice).value();
    let downPayment = Numeral(this.state.downPayment).value();
    let loanTerm = Numeral(this.state.loanTerm).value() * 12;
    let interestRate = Number.parseFloat(this.state.interestRate)/100;
    let annualPropertyTaxes = Numeral(this.state.annualPropertyTaxes).value();
    let purchaseClosingCost = Numeral(this.state.purchaseClosingCosts).value();

    let repairs = Numeral(this.state.interiorRepairs).value() + Numeral(this.state.exteriorRepairs).value();

    let monthlyExpenses = Number.parseFloat(this.state.electric) + Number.parseFloat(this.state.gas) + Number.parseFloat(this.state.water)
      + Number.parseFloat(this.state.sewer) + Number.parseFloat(this.state.garbage) + Number.parseFloat(this.state.hoa)
      + Number.parseFloat(this.state.insurance) + Number.parseFloat(this.state.other) + Number.parseFloat(this.state.monthlyPropertyTaxes);

    let arv = Numeral(this.state.arv).value();
    let realEstateAgentFee = Numeral(this.state.realEstateAgentFee).value();
    let otherMiscClosingCosts = Numeral(this.state.otherMiscClosingCosts).value();

    let numberOfDaysHeld = Numeral(this.state.numberOfDaysHeld).value();

    //Monthly Mortgage
    let interestRateVal = 1 + (interestRate/12);
    let monthlyMortgage = ((listPrice - downPayment) * (interestRate/12) * 
      Math.pow(interestRateVal,loanTerm))/(Math.pow(interestRateVal,loanTerm) - 1);

    //Monthly Holding Costs
    let monthlyHoldingCosts = monthlyMortgage + monthlyExpenses;

    //Total Cash Invested
    let totalCashInvested = purchaseClosingCost + repairs + downPayment + (monthlyHoldingCosts * (numberOfDaysHeld / 30));

    //Total Projected Pre-Tax Profits
    let profitshelper = arv - realEstateAgentFee - otherMiscClosingCosts - listPrice - purchaseClosingCost
      - repairs;
    let totalProjectedPreTaxProfits = profitshelper - (monthlyHoldingCosts * (numberOfDaysHeld / 30));

    //Total Projected Profits for half the days
    let halfDaysHeld = Math.round((numberOfDaysHeld/2));
    let totalProjectedPreTaxProfitsHalf = profitshelper - (monthlyHoldingCosts * (halfDaysHeld / 30));

    //Total Projected Profits for 2 times the days
    let doubleDaysHeld = numberOfDaysHeld * 2;
    let totalProjectedPreTaxProfitsDouble = profitshelper - (monthlyHoldingCosts * (doubleDaysHeld / 30));

    //ROI
    let roi = (totalProjectedPreTaxProfits/totalCashInvested) * 100;

    //ROI Annualized 
    let roiAnnualized = roi * (365/numberOfDaysHeld);

    // roi = roi * 100;
    // roiAnnualized = roiAnnualized * 100;

    this.refs._scrollView.scrollTo({x: 0, y: 0, animated: true});


    this.setState({
      roi: +(roi.toFixed(2)),
      roiAnnualized: +(roiAnnualized.toFixed(2)),
      monthlyExpenses: Numeral((Math.round(monthlyExpenses)).toString()).format('0,0'),
      totalProjectedPreTaxProfits: Numeral((Math.round(totalProjectedPreTaxProfits)).toString()).format('0,0'),
      totalCashInvested: Numeral((Math.round(totalCashInvested)).toString()).format('0,0'),
      monthlyHoldingCosts: Numeral((Math.round(monthlyHoldingCosts)).toString()).format('0,0'),
      totalProjectedPreTaxProfitsHalf: Numeral((Math.round(totalProjectedPreTaxProfitsHalf)).toString()).format('0,0'),
      totalProjectedPreTaxProfitsDouble: Numeral((Math.round(totalProjectedPreTaxProfitsDouble)).toString()).format('0,0'),
      monthlyMortgage: +(monthlyMortgage.toFixed(2)),
      doubleDaysHeld: doubleDaysHeld,
      halfDaysHeld: halfDaysHeld
    });
    console.log(this.state);   
  }
}


export default FixNFlipScreen;
