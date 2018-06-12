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
import { Dropdown } from 'react-native-material-dropdown';
import States from './States'

const {width, height} = Dimensions.get('window')

class NewClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name:'',
      last_name:'',
      email:'',
      phone_number:'',
      street_address:'',
      city: '',
      states:'',
      zip_code:'',
      est_house_commish: '',
      commission:'',
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
          <Text style={{fontSize: 20, fontWeight: 'bold', paddingTop: 10, paddingBottom: 20}}>Add Client</Text>
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
                  <Text style={styles.captionText}>Phone Number</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    placeholder = '1-800-HomeWise'
                    onChangeText = {(text)=> this.setState({phone_number: text})}>
                  </TextInput>
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>Street Address</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    placeholder = '24 Quiet Road'
                    onChangeText = {(text)=> this.setState({street_address: text})}>
                  </TextInput>
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>City</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    placeholder = 'Charlotte'
                    onChangeText = {(text)=> this.setState({city: text})}>
                  </TextInput>
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>State</Text>
                </View>
                <View>
                  <Dropdown
                    data = {States}
                    containerStyle = {styles.rowdate}
                    onChangeText = {(text)=> this.setState({states: text})}>
                  </Dropdown>
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>Zip Code</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    placeholder = '00000'
                    onChangeText = {(text)=> this.setState({zip_code: text})}>
                  </TextInput>
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>Estimated House Commission</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    placeholder = '000000'
                    onChangeText = {(text)=> this.setState({est_house_commish: text})}>
                  </TextInput>
                </View>
                <View style={styles.caption}>
                  <Text style={styles.captionText}>Commission</Text>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.values}
                    keyboardType = {'default'}
                    returnKeyType = {'done'}
                    placeholder = '00000'
                    onChangeText = {(text)=> this.setState({commission: text})}>
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
    marginTop: 0,
    marginBottom: 40,
    marginLeft: 35,
    marginRight: 35,
    height: 20,
    justifyContent: 'center'
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

export default NewClient;