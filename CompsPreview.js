import React, { Component } from 'react';
 import {
  Platform,
  StyleSheet,
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
			<View style={{width, height, backgroundColor: 'white', alignSelf: 'center'}}>
                <View style={{width: width * 0.7, height: height* 0.3, marginTop: height* 0.15, marginLeft: width* 0.08}}>
                    <Image source={require('./logo.png')} style={{width: width * 0.8, height: height* 0.2}}/>
                    <Text style={{color:'rgb(65,147,237)',  width: width * 0.7, height: height* 0.3, marginLeft: width * 0.1, justifyContent: 'center', fontSize: 22}}> A.I CMA Coming Soon</Text>
                </View>
            </View>
			);
		}
	}
