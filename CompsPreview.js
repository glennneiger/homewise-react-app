import React, { Component } from 'react';
 import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Image,
  Dimensions,
  AsyncStorage
} from 'react-native'
const {width, height} = Dimensions.get('window')


export default class CompsPreview extends Component{

  static navigationOptions = {
        title: 'Comps',
        headerTitleStyle :{textAlign: 'center',alignSelf:'center', color: '#fff'},
        headerStyle:{
            backgroundColor:'#0091FF',
        },
    };

  render() {
    return (
      <View style ={styles.header}>
      <View style={{flex:1}}>
        <View style={{flex:1, alignItems:'center'}}>
          <Image style={{width: 70, height: 70, marginTop: 40, paddingBottom: 0}} 
              source={require('./Homewise.jpg')}/>
          <Text style={{fontSize: 20, fontWeight: 'bold', paddingTop: 10, paddingBottom: 45}}>A.I. CMA Coming Soon</Text>
        </View>
        <View style ={{flex:3}}>
        <View style={styles.container}>
            <View style={styles.body}>
              <View>
                
                  <Text style={styles.captionText}>Placeholder Text</Text>
                
                
              
                  <Text style={styles.captionText}>Placeholder Text</Text>
                 
               
              
                  <Text style={styles.captionText}>Placeholder Text</Text>

                <TouchableOpacity
                   style = {styles.submitButton}
                   onPress = {
                      () => this.signUp()
                   }>
                   <Text style = {styles.submitButtonText}> Request in my City </Text>
                </TouchableOpacity>
              </View>           
            </View>
        </View> 
        </View>
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
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 12 : 0,
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
  rowmls: {
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
    fontSize: 32,
    paddingBottom: 35 ,
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
    marginRight: 20,
    flex:7,
    borderColor: '#D3D3D3',
    borderBottomWidth: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    height: 40,
    fontSize: 20,
    paddingRight: 10,

    textAlign: 'right',
    //backgroundColor: '#F7F7F5'
  },
  submitButton: {
    marginRight: 35,
    marginLeft: 35,
    marginTop: 15,
    marginBottom: 15,
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
