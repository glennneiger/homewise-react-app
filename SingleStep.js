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
import { ApiEndpoints, StorageKeys } from './AppConfig'




class SingleStep extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: '1',
      name: '',
      name_copy: '',
      date: '',
      date_copy: '',
      complete: false,

      vendors: [
      {
        company_name: 'company1',
        phone_number: '123-456-7890',
        email: 'company1@gmail.com',
        website_link: 'www.company1.com'
      },
      {
        company_name: 'company2',
        phone_number: '000-000-0000',
        email: 'company2@gmail.com',
        website_link: 'www.company2.com'
      }
      ],

      editMode: false,
      updated: false
    };
  }

  getTokenFromStorage = async () => {
    const token = await AsyncStorage.getItem(StorageKeys.authToken);
    return token;
  }

  componentDidMount(){
    // Prepare fetch call arguments
    let id = this.props.navigation.getParam('id');
    let url = ApiEndpoints.url + ApiEndpoints.singlestepPath;
    const bearerToken = this.getTokenFromStorage();

    this.setState({
      id:id
    });

    // Make fetch calls
    fetch(url, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer' + bearerToken
        },
        body: JSON.stringify({
          id:id,
        }),
      })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        id: id,
        name: responseJson.name,
        name_copy: responseJson.name,
        date: responseJson.date,
        date_copy: responseJson.date,
        complete: responseJson.complete
      })
    })
    .catch((error) => {
      console.error(error);
    });
  }


  back(){
    //api call for UpdateStep
    //post id, name, date, complete
    let url = ApiEndpoints.url + ApiEndpoints.singlestepPath;
    const bearerToken = this.getTokenFromStorage();
    let id = this.state.id;
    let name = this.state.name_copy;
    let complete = this.state.complete;
    let date = this.state.date;

    fetch(url, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer' + bearerToken
        },
        body: JSON.stringify({
          id:id,
          name:name,
          complete:complete,
          date:date
        }),
      })
    .then((response) => response.json())
    .then((responseJson) => {

    })
    .catch((error) => {
      console.error(error);
    });
  }

  complete(){
    let complete = !this.state.complete;
    this.setState({
      complete: complete,
      updated: true
    });
  }

  editOnPress(){
    let editMode = !this.state.editMode;
    this.setState({
      editMode: editMode
    });
  }

  editNameOnChangeText(newName){
    this.setState({
      name_copy: newName,
    })
  }

  editDateOnChangeText(newDate){
    this.setState({
      date_copy: newDate,
    });
  }

  doneOnPress(){
    let name = this.state.name_copy;
    let date = this.state.date_copy;
    this.setState({
      name: name,
      date: date,
      updated: true,
      editMode: false
    });
  }

  cancelOnPress(){
    let name = this.state.name;
    let date = this.state.date;
    console.log(name)
    console.log(date)
    this.setState({
      name: name,
      name_copy: name,
      date_copy: date,
      editMode: false
    });
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
                {this.state.editMode?
                  <TouchableOpacity
                      style={{
                          paddingHorizontal: 8,
                          paddingVertical: 3,
                          borderColor: '#0091FF',
                          borderWidth: 0.5,
                          position: 'absolute',
                          top: 0,
                          borderRadius: 4,
                          left: 15,
                      }}
                      onPress = {
                        () => this.cancelOnPress()
                      }>
                      <Text style={{color: '#0091FF', fontSize: 18}}>Cancel</Text>
                  </TouchableOpacity>
                  :
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
                        () => this.back()
                      }>
                      <View style={{flexDirection: 'row'}}>
                          <Icon2 name="md-arrow-round-back" style={{fontSize: 17, color: '#fff', paddingTop: 3}} />
                          <Text style={{color: '#fff', fontSize: 18}}>Back</Text>
                      </View>
                  </TouchableOpacity>
                }
                {this.state.editMode?
                  <TouchableOpacity
                      style={{
                          paddingHorizontal: 8,
                          paddingVertical: 3,
                          borderColor: '#0091FF',
                          borderWidth: 0.5,
                          position: 'absolute',
                          top: 0,
                          borderRadius: 4,
                          right: 15,
                      }}
                      onPress = {
                        () => this.doneOnPress()
                      }>
                      <Text style={{color: '#0091FF', fontSize: 18}}>Done</Text>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity
                      style={{
                          paddingHorizontal: 8,
                          paddingVertical: 3,
                          borderColor: '#0091FF',
                          borderWidth: 0.5,
                          position: 'absolute',
                          top: 0,
                          borderRadius: 4,
                          right: 15,
                      }}
                      onPress = {
                        () => this.editOnPress()
                      }>
                      <Text style={{color: '#0091FF', fontSize: 18}}>Edit</Text>
                  </TouchableOpacity>
                }
              </View>
            </View>
            <View style={styles.body}>
              <View style={styles.caption}>
                <Text style={styles.captionText}>Task</Text>
              </View>
              <View style={styles.row}>
                  {this.state.editMode?
                    <TextInput
                      style={styles.valuesEdit}
                      keyboardType = {'default'}
                      returnKeyType = {'done'}
                      placeholder = '0'
                      value = {this.state.name_copy}
                      editable = {true}
                      multiline = {true}
                      numberOfLines = {2}
                      underlineColorAndroid='transparent'
                      onChangeText={(newName) => this.editNameOnChangeText(newName)}>
                    </TextInput>
                    :
                    <TextInput
                      style={styles.values}
                      keyboardType = {'default'}
                      returnKeyType = {'done'}
                      placeholder = '0'
                      value = {this.state.name}
                      editable = {false}
                      multiline = {true}
                      numberOfLines = {2}
                      underlineColorAndroid='transparent'>
                    </TextInput>

                  }
                  
              </View>
              <View style={styles.caption}>
                <Text style={styles.captionText}>Date</Text>
              </View>
              <View style={styles.row}>
                  {this.state.editMode?
                    <DatePicker
                        style={styles.datevaluesstep}
                        showIcon= {true}
                        mode="date"
                        date = {this.state.date_copy}
                        format="MM/DD/YYYY"
                        minDate="2000-01-01"
                        maxDate="2050-12-31"
                        confirmBtnText="Done"
                        cancelBtnText="Cancel"
                        customStyles={{
                          dateInput: {
                            borderWidth: 0,
                          },
                          dateText: {
                            fontSize: 20
                          }
                        }}
                        onDateChange={(date)=> this.editDateOnChangeText(date)}
                    />
                  :
                    <TextInput
                      style={styles.values}
                      keyboardType = {'numeric'}
                      returnKeyType = {'done'}
                      placeholder = '0'
                      editable = {false}
                      value = {this.state.date}
                      underlineColorAndroid='transparent'
                      onChangeText={(downPayment) => this._downPaymentOnChangeText(downPayment)}>
                    </TextInput>
                  }
              </View>

              <View style={styles.caption}>
                <Text style={styles.captionText}>HomeWise Preferred Vendors</Text>
              </View>
              <View>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  style={{paddingTop: 5, paddingBottom: 30}}
                  data={this.state.vendors}
                  scrollEnabled={false}
                  ListEmptyComponent = { <Text> No Vendors </Text> }
                  renderItem={({item, index}) =>
                      <TouchableOpacity style={styles.dayLineButton} activeOpacity = { 1 }>
                          <View style={{flex: 1, paddingTop: 10, paddingBottom: 10, paddingHorizontal: 0, marginLeft: 5}}>
                              <Text style={{fontSize: 20, fontWeight: 'bold'}} selectable={true}>{item.company_name}</Text>
                              <Text style={{fontSize: 18, color: '#707070'}} selectable={true}>{item.phone_number}</Text>
                              <Text style={{fontSize: 18, color: '#707070'}} selectable={true}>{item.email}</Text>
                              <Text style={{fontSize: 18, color: '#707070'}} selectable={true}>{item.website_link}</Text>
                          </View>
                          {index == 0 &&
                              <View style={{position: 'absolute', width: '100%', height: 1, backgroundColor: '#ddd', left: 0, top: 0,}} />
                          }
                      </TouchableOpacity>
                  }
                   />
              </View>
              <TouchableOpacity
                 style = {this.state.complete? styles.submitButtonNotComplete : styles.submitButtonComplete}
                 onPress = {
                      () => this.complete()
                   }>
                {this.state.complete?
                  <Text style = {styles.submitButtonText}> Step Not Complete </Text>
                  :
                  <Text style = {styles.submitButtonText}> Step Complete </Text>
                }
                
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
    marginBottom: 40
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
    flex:1,
    borderColor: '#D3D3D3',

    fontSize: 20,
    paddingRight: 5,
    paddingBottom: 5,

    textAlign: 'left',
  },
  valuesEdit: {
    marginRight: 20,
    marginLeft: 5,
    flex:1,
    borderColor: '#D3D3D3',
    borderBottomWidth: 2,
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
  datevaluesstep: {
    marginRight: 0,
    marginLeft: 5,

    borderColor: '#D3D3D3',
    borderRadius: 5,
    borderWidth: 1,
    height: 35,
    width: 200,
    alignItems: 'center',
    justifyContent:'center',

    //backgroundColor: '#F7F7F5'
  },
  submitButtonComplete: {
    marginRight: 35,
    marginLeft: 35,

    height: 50,
    
    paddingRight: 10,
    backgroundColor: '#20BF55',
    //'#04E762',
    justifyContent:'center', 
    alignItems:'center'
  },
  submitButtonNotComplete: {
    marginRight: 35,
    marginLeft: 35,

    height: 50,
    
    paddingRight: 10,
    backgroundColor: 'red',
    //'#04E762',
    justifyContent:'center', 
    alignItems:'center'
  },
  submitButtonText:{
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },

});



export default SingleStep;