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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PropTypes from 'prop-types';
import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';
import Numeral from 'numeral';




import styles from './styles';
import Row from './Row';


class ROIScreen extends Component {

  constructor(props) {
    super(props);
    if( Platform.OS === 'android' ){
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }


    this.state = {
      introScreen: true,

      roi: 0,
      roiColor: {fontSize: 50, color: 'rgb(65,147,237)', fontWeight: 'bold'},
      monthlyCashFlow: 0,
      capRate: 0,
      capRateColor: {fontSize: 30, color: 'black', fontWeight: 'bold'},
      monthlyMortgage: 0,

      listPrice: 0,
      rent: 0,
      downPayment: 0,
      downPaymentPercent: 20,
      closingCosts: 0,
      closingCostsPercent: 3,
      loanTerm: 30,
      interestRate: 4.25,
      vacancyRate: 5,
      monthlyPropertyTax: 0,
      propertyTax: 0,
      insurance: 0,
      
      hoa: 0,
      maintenance: 0,
      managementFee: 0,
      managementFeePercent: 8,
      rehabCosts: 0,

      upfrontCosts: 0,
      monthlyIncome: 0,

      textLayoutHeightUpfront: 0,
      updatedHeightUpfront: 0, 
      expandUpfront: false,
      arrowUpfront: '^',

      textLayoutHeightIncome: 0,
      updatedHeightIncome: 0, 
      expandIncome: false,
      arrowIncome: '^',

      textLayoutHeightExpense: 0,
      updatedHeightExpense: 0, 
      expandExpense: false,
      arrowExpense: '^',
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

  // componentWillMount(){
  //   this.props.toggle_roi_screen();
  // }


  render() {

    let roiString = this.state.roi.toString() + '%';

    return (

          <View style={styles.container}>
            <KeyboardAwareScrollView innerRef={ref => {this.scroll = ref}}>
              <View style={styles.otherStuff}>
                <View>
                  <TouchableOpacity
                  style={styles.headerTabs1selected}
                  onPress = {() => {
                    console.log(this.state);}}>
                      <Text style = {{color: '#fff'}}> ROI </Text>
                  </TouchableOpacity> 
                </View>
                <View>
                  <TouchableOpacity
                  style={styles.headerTabs2}
                  onPress = {() => {
                    this.props.navigation.navigate('MortgageScreen')}}>
                      <Text style = {{color: '#0091FF'}}> Mortgage </Text>
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
              <View style={{backgroundColor: '#f6fbfc',flexDirection: 'row', justifyContent: 'flex-end'}}>
               <TouchableOpacity
                  onPress = {
                  () => this._reset()
                  }>
                  <Text style = {styles.submitButtonText}> Reset </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.header}>
                <AnimatedGaugeProgress
                  size={300}
                  width={15}
                  fill={Number.parseInt(this.state.roi, 10)}
                  rotation={90}
                  cropDegree={180}
                  tintColor="#0091FF"
                  backgroundColor= '#e7e7e7'
                  stroke={[2, 2]} 
                  strokeCap="circle">
                  <View style = {styles.textView}> 
                      <Text style={{fontSize: 50, color: 'rgb(65,147,237)', fontWeight: 'bold'}}>{this.state.roi}%</Text>
                  <Text style = {{color:'black', fontSize: 18, marginBottom: 45}}>1 Year Cash-on-Cash Return</Text>
                  </View>
                </AnimatedGaugeProgress>
                <View style={styles.roiheadervalues}>
                  <View style={styles.info}>
                    <Text style={styles.infoText}>${this.state.monthlyMortgage}</Text>
                    <Text style={styles.subTextFixNFlip}>Monthly</Text>
                    <Text style={styles.subTextFixNFlip}>Mortgage</Text>
                  </View>
                  <View style={styles.info}>
                    <Text style={this.state.capRateColor}>{this.state.capRate}%</Text>
                    <Text style={styles.subTextFixNFlip}>Cap Rate</Text>
                    <Text> </Text>
                  </View>
                  <View style={styles.info}>
                    <Text style={styles.infoText}>${this.state.monthlyCashFlow}</Text>
                    <Text style={styles.subTextFixNFlip}>Monthly</Text>
                    <Text style={styles.subTextFixNFlip}>Cash Flow</Text>
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
                    value = {this.state.downPayment.toString()}
                    underlineColorAndroid='transparent'
                    onChangeText={(downPayment) => this._downPaymentOnChangeText(downPayment)}>
                  </TextInput>
                  <TextInput
                    style={styles.percentValue}
                    returnKeyType = {'done'}
                    keyboardType ={'numeric'}
                    placeholder = '0'
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
                    value = {Numeral((this.state.closingCosts).toString()).format('0,0')}
                    onChangeText={(closingCosts) => this._closingCostsOnChangeText(closingCosts)}>
                  </TextInput>
                  <TextInput
                    style={styles.percentValue}
                    returnKeyType = {'done'}
                    keyboardType ={'numeric'}
                    placeholder = '0'
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


                <Row caption="Interest Rate" sign='%' value={(this.state.interestRate).toString()} update={(interestRate) => this.setState({interestRate})}/>
                <Row caption="Loan Term (Years)" sign='' value={Numeral((this.state.loanTerm).toString()).format('0,0.[00]')} update={(loanTerm) => this.setState({loanTerm})}/>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>Annual Property Tax</Text>
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
                    value = {(this.state.propertyTax).toString()}
                    onChangeText={(propertyTax) => this._monthlyPropertyTaxOnChangeText(propertyTax)}>
                  </TextInput>
                  <TextInput
                    style={styles.percentPlace}
                    editable={false}>
                  </TextInput>
                  </View>

                   <View style={styles.caption}>
                  <Text style={styles.captionText}>Rehab Costs</Text>
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
                    value = {Numeral((this.state.rehabCosts).toString()).format('0,0.[00]')}
                    onChangeText={(rehabCosts) => this.setState({rehabCosts})}>
                  </TextInput>
                  <TextInput
                    style={styles.percentPlace}
                    editable={false}>
                  </TextInput>
                </View>

              



                <View style={styles.headerRow}>
                  <Text style={styles.headerRowText}>Monthly Rent Income</Text>
                </View>                  
                <View style={styles.caption}>
                  <Text style={styles.captionText}>Rent</Text>
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
                    value = {(this.state.rent).toString()}
                    onChangeText={(rent) => this._rentOnChangeText(rent)}>
                  </TextInput>
                  <TextInput
                    style={styles.percentPlace}
                    editable={false}>
                  </TextInput>
                </View>

                <Row caption="Vacancy Rate" sign='%' value={(this.state.vacancyRate).toString()} update={(vacancyRate) => this.setState({vacancyRate})}/>

                <View style={styles.caption}>
                  <Text style={styles.captionText}>Property Management Fee</Text>
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
                    value = {(this.state.managementFee).toString()}
                    underlineColorAndroid='transparent'
                    onChangeText={(managementFee) => this._managementFeeOnChangeText(managementFee)}>
                  </TextInput>
                  <TextInput
                    style={styles.percentValue}
                    returnKeyType = {'done'}
                    keyboardType ={'numeric'}
                    placeholder = '0'
                    underlineColorAndroid='transparent'
                    value = {(this.state.managementFeePercent).toString()}
                    onChangeText={(managementFeePercent) => this._managementFeePercentOnChangeText(managementFeePercent)}>
                  </TextInput>
                  <TextInput
                    style={styles.percentSign}
                    keyboardType = {'numeric'}
                    value = '%'
                    underlineColorAndroid='transparent'
                    editable={false}>
                  </TextInput>
                </View>  
                <View style={styles.headerRow}>
                  <Text style={styles.headerRowText}>Monthly Expenses</Text>
                </View> 
                
                
                <Row caption="Monthly Insurance" sign='$' value={Numeral((this.state.insurance).toString()).format('0,0.[00]')} update={(insurance) => this.setState({insurance})}/>
                <Row caption="Monthly HOA" sign='$' value={Numeral((this.state.hoa).toString()).format('0,0.[00]')} update={(hoa) => this.setState({hoa})}/>
                <Row caption="Monthly Maintenance" sign='$' value={Numeral((this.state.maintenance).toString()).format('0,0.[00]')} update={(maintenance) => this.setState({maintenance})}/>

                 <View style={styles.caption}>
                  <Text style={styles.captionText}>Monthly Property Tax</Text>
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
                    value = {Numeral((this.state.monthlyPropertyTax).toString()).format('0,0')}
                    editable = {false}>
                  </TextInput>
                  <TextInput
                    style={styles.percentPlace}
                    editable={false}>
                  </TextInput>
                  </View>

              </View>
              <TouchableOpacity
                   style = {styles.submitButton2}
                   onPress = {
                      () => this._calculateROI(Numeral(this.state.listPrice).value(), Numeral(this.state.rent).value())
                   }>
                   <Text style = {styles.submitButtonText2}> Calculate </Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
          </View>    
    );
  }

  _onClick(listPrice){
    this.setState({
      roi: listPrice
    });
  }

  _reset(){
    this.setState({
      introScreen: true,
      roi: 0,
      roiColor: {fontSize: 50, color: 'rgb(65,147,237)', fontWeight: 'bold'},
      monthlyCashFlow: 0,
      capRate: 0,
      capRateColor: {fontSize: 30, color: 'black', fontWeight: 'bold'},
      monthlyMortgage: 0,

      listPrice: 0,
      rent: 0,
      downPayment: 0,
      closingCosts: 0,
      loanTerm: 30,
      interestRate: 4.25,
      vacancyRate: 5,
      monthlyPropertyTax: 0,
      propertyTax: 0,
      insurance: 0,
      
      hoa: 0,
      maintenance: 0,
      managementFee: 0,
      managementFeePercent: 8,
      rehabCosts: 0,

      upfrontCosts: 0,
      monthlyIncome: 0,
    });
  } 

  _listPriceOnChangeText(listPrice){
    let downPayment;
    let closingCosts;
    let propertyTax; 
    let insurance;
    let maintenance;
    let managementFee;

    downPayment = Numeral(listPrice).value() * (Number.parseFloat(this.state.downPaymentPercent)/100);
    closingCosts = Numeral(listPrice).value() * (Number.parseFloat(this.state.closingCostsPercent)/100);




    this.setState({
      listPrice: listPrice,
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
      downPayment: Numeral((downPayment).toString()).format('0,0.[00]'),
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
      closingCosts: closingCosts,
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

  _managementFeeOnChangeText(managementFee){

    let managementFeeVal = Numeral(managementFee).value();
    let managementFeePercent = (managementFeeVal / Numeral(this.state.rent).value()) * 100;


    this.setState({
      managementFee: Numeral((managementFee).toString()).format('0,0.[00]'),
      managementFeePercent: +(managementFeePercent.toFixed(2))
    });
  }

  _managementFeePercentOnChangeText(managementFeePercent){

    let managementFee = Numeral(this.state.rent).value() * (Number.parseFloat(managementFeePercent)/100);

    this.setState({
      managementFee: Numeral((managementFee).toString()).format('0,0.[00]'),
      managementFeePercent: managementFeePercent
    })
  }

  _monthlyPropertyTaxOnChangeText(propertyTax){
    let monthlyPropertyTax = Numeral(propertyTax).value() / 12;

    this.setState({
      monthlyPropertyTax: Numeral((monthlyPropertyTax).toString()).format('0,0.[00]'),
      propertyTax: Numeral((propertyTax).toString()).format('0,0.[00]')
    })
  }

  _rentOnChangeText(rent){

    let managementFee = (Number.parseFloat(this.state.managementFeePercent)/100) * Numeral(rent).value();

    this.setState({
      rent: Numeral((rent).toString()).format('0,0.[00]'),
      managementFee: Numeral((managementFee).toString()).format('0,0.[00]')
    });
  }

  _calculateROI(listPrice,rent){

   let downPayment = Numeral(this.state.downPayment).value();
    let closingCosts = Numeral(this.state.closingCosts).value();
    let propertyTax = Numeral(this.state.propertyTax).value();
    let insurance = Numeral(this.state.insurance).value();
    let maintenance = Numeral(this.state.maintenance).value();
    let managementFee = Numeral(this.state.managementFee).value();


    let loanTerm = Numeral(this.state.loanTerm).value() * 12;
    let interestRate = Number.parseFloat(this.state.interestRate)/100;
    let vacancyRate = Number.parseFloat(this.state.vacancyRate)/100;
    let rehabCosts = Numeral(this.state.rehabCosts).value();


    let monthlyHOA = Numeral(this.state.hoa).value();

    let interestRateVal = 1 + (interestRate/12);

    let monthlyMortgage = ((listPrice - downPayment) * (interestRate/12) * 
      Math.pow(interestRateVal,loanTerm))/(Math.pow(interestRateVal,loanTerm) - 1);

    let monthlyCashFlow = (rent * (1 - vacancyRate)) - monthlyMortgage - managementFee
      - (propertyTax/12) - (insurance) - monthlyHOA - (maintenance);
    console.log('rent ' + rent);
    console.log('vacancy rate ' + vacancyRate);
    console.log('monthly mortgage ' + monthlyMortgage);
    console.log('managment fee' + managementFee);
    console.log('property tax' + propertyTax);
    console.log(' ' + insurance + ' ' + monthlyHOA + ' ' + maintenance);


    let capRate = ((monthlyCashFlow * 12)/Number.parseFloat(listPrice)*100);
    capRate = capRate || 0;
    //console.log('cap rate ' + capRate);

    let capRateColor = {fontSize: 30, color: 'black', fontWeight: 'bold'};
    if(capRate >= 8){
      capRateColor = {fontSize: 30, color: '#006400', fontWeight: 'bold'};
    }
    else if(capRate >= 6 && capRate < 8){
      capRateColor = {fontSize: 30, color: '#32CD32', fontWeight: 'bold'};
    }
    else if(capRate >= 4 && capRate < 6){
      capRateColor = {fontSize: 30, color: '#d6d602', fontWeight: 'bold'};
    }
    else if(capRate > 0 && capRate < 4){
      capRateColor = {fontSize: 30, color: '#FFA500', fontWeight: 'bold'};
    }
    else if(capRate <= 0){
      capRateColor = {fontSize: 30, color: '#FF0000', fontWeight: 'bold'};
    }
    else{
      capRateColor = {fontSize: 30, color: 'black', fontWeight: 'bold'};
    }

    let roi = ((monthlyCashFlow * 12)/(downPayment + closingCosts + rehabCosts)) * 100;
    roi = roi || 0;
    //console.log('roi' + roi);
    let roiColor = {fontSize: 50, color: 'rgb(65,147,237)', fontWeight: 'bold'};

    let upfrontCosts = downPayment + closingCosts + rehabCosts;

    let monthlyIncome = rent * (1 - vacancyRate);




   this.scroll.props.scrollToPosition(0, 0)

    this.setState({
      roi: +(roi.toFixed(2)),
      roiColor: roiColor,
      monthlyCashFlow: Numeral((Math.round(monthlyCashFlow)).toString()).format('0,0'),
      monthlyMortgage: Numeral((Math.round(monthlyMortgage)).toString()).format('0,0'),
      capRate: +(capRate.toFixed(2)),
      capRateColor: capRateColor,
      downPayment: downPayment,
      closingCosts: closingCosts,
      propertyTax: propertyTax,
      insurance: insurance,
      maintenance: maintenance,
      managementFee: managementFee,
      introScreen: false,
      upfrontCosts: upfrontCosts,
      monthlyIncome: Math.round(monthlyIncome)
    });   
  }
}



export default ROIScreen;