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
  FlatList,
  KeyboardAvoidingView
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PropTypes from 'prop-types';
import Numeral from 'numeral';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker';



class AddStep extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: '',
      newStepName: '',
      newStepDate: new Date(),

    };
  }

  componentDidMount(){
    let id = 1;
    alert(id);

    this.setState({
        id: id,
      })
   }

   addStep(){
    let url = let url = ApiEndpoints.url + ApiEndpoints.addstepPath;
    const bearerToken = this.getTokenFromStorage();

    let id = this.state.id;
    let newStepName = this.state.newStepName;
    let newStepDate = this.state.newStepDate;

    fetch(url, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer' + bearerToken
        },
        body: JSON.stringify({
          id:id,
          newStepName: newStepName,
          newStepDate: newStepDate
        }),
      })
    .then((response) => response.json())
    .then((responseJson) => {
      //this.props.navigation.navigate('Steps');
    })
    .catch((error) => {
      console.error(error);
    });

   }


  back(){
    this.props.navigation.navigate('Steps');
  }



  static navigationOptions = ({ navigation }) => {
      return {
         header: null
      }
   }

  render() {

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.headerButtons}>
            <View style={{position: 'relative', alignItems: 'center', width: '100%', marginTop: 10, paddingBottom: 10}}> 
                  <TouchableOpacity
                      style={{
                          paddingHorizontal: 8,
                          paddingVertical: 3,
                          borderColor: '#0091FF',
                          backgroundColor: '#0091FF',
                          borderWidth: 0.5,
                          position: 'absolute',
                          top: 0,
                          borderRadius: 4,
                          left: 15,
                      }}
                      onPress = {
                        () => this.back()}>
                      <View style={{flexDirection: 'row'}}>
                          <Icon2 name="md-arrow-round-back" style={{fontSize: 17, color: '#fff', paddingTop: 3}} />
                          <Text style={{color: '#fff', fontSize: 18}}>Back</Text>
                      </View>
                  </TouchableOpacity>
                  <Text style={{color: '#0091FF', fontSize: 25, fontWeight: '600',}} > Add Step</Text>
              </View>
            </View>
            <View style={styles.body}>
              <View style={styles.caption}>
                <Text style={styles.captionText}>Task</Text>
              </View>
              <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    multiline = {true}
                    numberOfLines = {2}
                    maxLength = {60}
                    onChangeText = {(text)=> this.setState({newStepName: text})}
                    >
                  </TextInput>
              </View>
              <View style={styles.caption}>
                <Text style={styles.captionText}>Date</Text>
              </View>
              <View style={styles.rows}>
                <DatePicker
                  style={styles.datevalues}
                  showIcon= {true}
                  mode="date"
                  date = {this.state.newStepDate}
                  format="MM/DD/YYYY"
                  minDate="1900-01-01"
                  maxDate="2017-12-31"
                  confirmBtnText="Done"
                  cancelBtnText="Cancel"
                  customStyles={{
                  dateInput: {
                    borderWidth: 0
                  }
                  }}
                  onDateChange={(date) => {this.setState({newStepDate: date})}}
                  />
              }
              </View>
              <TouchableOpacity
                 style = {styles.submitButton}
                 onPress = {
                    () => this.addStep()}> 
                 <Text style = {styles.submitButtonText}> Add Step! </Text>
              </TouchableOpacity>
            </View>
            </ScrollView>
      </View>    
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'ios' ? 12 : 0,
  },
  headerButtons: {
    flex: 1,
    marginBottom: 30
  },
  body:{
    flex:9,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 30,
    paddingBottom: 0
  },
  caption: {
    marginLeft: 5,
    height:25,
    paddingBottom: 0,
    marginBottom: 5,
  },
  captionText: {
    fontSize: 25,
    paddingBottom: 0,
    color: '#0091FF'
  },
  values: {
    marginRight: 20,
    marginLeft: 5,
    marginBottom: 10,
    flex:1,

    borderColor: '#D3D3D3',
    borderBottomWidth: 1,
    borderRadius: 5,

    fontSize: 20,
    paddingRight: 5,
    paddingBottom: 5,

    textAlign: 'left',
  },
  dayLineButton: {
    width: '100%',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    flexDirection: 'row',
    position: 'relative',
  },
  submitButton: {
    marginRight: 35,
    marginLeft: 35,

    height: 50,
    
    paddingRight: 10,
    backgroundColor: 'rgb(65,147,237)',
    justifyContent:'center', 
    alignItems:'center'
  },
  submitButtonText:{
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  datevalues: {
    marginRight: 10,
    marginLeft: 10,

    flex:9.5,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    height: 35,
    alignItems: 'center',
    justifyContent:'center',
    marginBottom: 50,
    marginTop: 10

    //backgroundColor: '#F7F7F5'
  },

});



export default AddStep;