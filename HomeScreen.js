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
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Image source={require('./Homewise.jpg')} style={{width: 70, height: 70}}/>
                    <Text style={{color:'rgb(65,147,237)'}}>Beautiful, Private Sharing</Text>
                </View>
                <View style={{flex: 9, alignItems:'center'}}>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('Registration')} style={{width: width* 0.6, height: height* 0.09, backgroundColor:'rgb(65,147,237)', borderRadius: 10, marginTop: height * 0.06, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{color:'white', fontSize: 20, fontWeight:'bold'}}>Sign Up</Text>
                    </TouchableOpacity>
                    <Text style={{color:'rgb(65,147,237)', marginTop: height* 0.03}}>Already have a Homewise account?</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={{width: width* 0.6, height: height* 0.09, borderWidth:1, borderColor:'rgb(65,147,237)', borderRadius: 10, marginTop: height * 0.01, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{color:'rgb(65,147,237)', fontSize: 20, }}>Log In</Text>
                    </TouchableOpacity>
                    <Text style={{color:'rgb(65,147,237)', marginTop: height* 0.02}}>By using Homewise, you agree to Homewise's</Text>
                    <Text style={{color:'rgb(65,147,237)'}}>Terms of Use and Privacy Policy</Text>
                </View>
            </View>
        )
    }
}