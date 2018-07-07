import React, {Component} from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity} from 'react-native'
const {width, height} = Dimensions.get('window')
export default class HomeScreen extends Component{
    static navigationOptions = ({ navigation }) => {
    return {
       header: null
    }
 }

    render(){
        return(
            <View style={{width, height, backgroundColor: '#f6fbfc', alignItems: 'center'}}>
                <View style={{width: width * 0.7, height: height* 0.2, marginTop: height* 0.15, alignItems: 'center', justifyContent: 'center'}}>
                    <Image style={{width: 60, height: 70, marginTop: 30, paddingBottom: 0, marginBottom: 10}} 
              source={require('./Homewise.png')}/>
                </View>
                <Text style={{color:'rgb(65,147,237)', fontSize: 18, marginBottom: height * 0.1}}>A Personal Assistant at Your Fingertips</Text>
                
                <View style={{width:width, height: height* 0.55, alignItems:'center'}}>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('Registration')} style={{width: width* 0.6, height: height* 0.09, backgroundColor:'rgb(65,147,237)', borderRadius: 10, marginTop: height * 0.06, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{color:'white', fontSize: 20, fontWeight:'bold'}}>Sign Up</Text>
                    </TouchableOpacity>
                    <Text style={{color:'rgb(65,147,237)', marginTop: height* 0.03}}>Already have a HomeWise account?</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={{width: width* 0.6, height: height* 0.09, borderWidth:1, borderColor:'rgb(65,147,237)', borderRadius: 10, marginTop: height * 0.01, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{color:'rgb(65,147,237)', fontSize: 20, }}>Log In</Text>
                    </TouchableOpacity>
                    <Text style={{color:'rgb(65,147,237)', marginTop: height* 0.02}}>By using HomeWise, you agree to HomeWise's</Text>
                    <Text style={{color:'rgb(65,147,237)'}}>Terms of Use and Privacy Policy</Text>
                </View>
            </View>
        )
    }
}