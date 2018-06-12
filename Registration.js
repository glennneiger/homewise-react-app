/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 import DatePicker from 'react-native-datepicker'
 import React, { Component } from 'react';
 import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  View
} from 'react-native';

const {width, height} = Dimensions.get('window')

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      first_name:'',
      last_name:'',
      email:'',
      password:'',
      retypePass:'',
      mls_region: '',
      mls_id:'',
    }
  }
    login = (email, pass) => {
      alert('email: ' + email + ' password: ' + pass)
   }
   signUp(){
        const {email, password, users, date, first_name, last_name, retypePass } = this.state
        

        if(first_name == '' || last_name == '' || email == '' || password == '' || retypePass == '' || date == ''){
            alert('All Fields Required')
        }
        if(!_validateEmail(email)){
            alert('invalid email')
        }
        else if(password != retypePass){
            alert('Passwords Do Not Match')
        }
        else{
            let email = this.state.email
            let first_name = this.state.first_name
            let last_name = this.state.last_name
            let mls_region = this.state.mls_region
            let mls_id = this.state.mls_id
            let password = this.state.password

            console.log(mls_region[0])

            fetch('http://127.0.0.1:8000/agent/Registration/', 
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email:email,
                first_name:first_name,
                last_name:last_name,
                mls_region:mls_region,
                mls_id:mls_id,
                password:password
              }),
            }).then((response) => response.json())
                .then((responseJson) => {
                  alert(responseJson);
                })
                .catch((error) => {
                  console.error(error);
                });
        }

    }

    static navigationOptions = ({ navigation }) => {
    return {
       header: null
    }
 }

  render() {
    const { navigation } = this.props;
    return (
      <View style ={styles.header}>
      <View style={{flex:1}}>
        <ScrollView>
        <View style={{flex:1, alignItems:'center'}}>
          <Image style={{width: 70, height: 70, marginTop: 30, paddingBottom: 0}} 
              source={require('./Homewise.jpg')}/>
          <Text style={{fontSize: 20, fontWeight: 'bold', paddingTop: 10, paddingBottom: 20}}>Create an Account</Text>
        </View>
        <View style={{flex:9}}>
        <View style={styles.container}>
            <View style={styles.body}>
              <View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>First Name</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    placeholder = 'John'
                    onChangeText = {(text)=> this.setState({first_name: text})}>
                  </TextInput>
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>Last Name</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    placeholder = 'Doe'
                    onChangeText = {(text)=> this.setState({last_name: text})}>
                  </TextInput>
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>Email</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    placeholder = 'john.doe@gmail.com'
                    onChangeText = {(text)=> this.setState({email: text})}>
                  </TextInput>
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>Date</Text>
                </View>
                <View style={styles.rowdate}>
                  <DatePicker
                            style={{width: width, height: 25,borderRadius:7, marginTop:10}}
                            date={this.state.date}
                            showIcon= {false}
                            mode="date"
                            placeholder="select date"
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
                            onDateChange={(date) => {this.setState({date: date})}}
                        />
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>Password</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    onChangeText = {(text)=> this.setState({password: text})}>
                  </TextInput>
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>Retype Password</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    onChangeText = {(text)=> this.setState({retypePass: text})}>
                  </TextInput>
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>MLS Region</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    placeholder = 'Charlotte'
                    onChangeText = {(text)=> this.setState({mls_region: text})}>
                  </TextInput>
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>MLS ID</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    placeholder = '123'
                    onChangeText = {(text)=> this.setState({mls_id: text})}>
                  </TextInput>
                </View>
                <TouchableOpacity
                   style = {styles.submitButton}
                   onPress = {
                      () => this.login(this.state.email, this.state.password)
                   }>
                   <Text style = {styles.submitButtonText}> Submit </Text>
                </TouchableOpacity>
              </View>           
            </View>
        </View> 
        </View>
        </ScrollView>
      </View> 
      </View>    
    );
  }
}


const styles = StyleSheet.create({
  header: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  body: {
    flex:8,
    //backgroundColor: '#FFFBF8'
  },
  row: {
    flex:1,
    flexDirection: 'row',
    marginBottom: 20,
    paddingBottom: 0
  },
  rowdate: {
    flex:1,
    flexDirection: 'row',
    marginBottom: 20,
    paddingBottom: 0,
    alignItems: 'center'
  },
  caption: {
    marginLeft: 35,
    flex:3,
    flexDirection: 'row',
    paddingBottom: 0,
    //alignItems: 'flex-end'
  },
  captionText: {
    fontSize: 16,
    paddingBottom: 0
  },
  values: {
    marginRight: 35,
    marginLeft: 35,

    flex:9.5,
    borderColor: '#D3D3D3',
    borderBottomWidth: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    height: 25,
    fontSize: 18,
    paddingRight: 10,

    textAlign: 'right',
    //backgroundColor: '#F7F7F5'
  },
  submitButton: {
    marginRight: 35,
    marginLeft: 35,

    flex:9.5,
    borderColor: '#D3D3D3',
    height: 40,
    fontSize: 18,
    paddingRight: 10,
    backgroundColor: 'rgb(65,147,237)',
    justifyContent:'center', 
    alignItems:'center'
   },
   submitButtonText:{
      color: 'white',
   }
});



export default Registration;
