import React, { Component } from 'react';

import { AppRegistry, StyleSheet, FlatList, Text, View, Alert, Platform, TouchableOpacity, ScrollView } from 'react-native';
import PercentageCircle from 'react-native-percentage-circle';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { StackNavigator } from 'react-navigation';

import Steps from './Steps'

export default class AllClients extends Component {
 
  constructor(props){
    super(props);

    this.state = { 
      //true = Buyer, false = Listings
      client_type: true,
      BuyingClients: [],
      SellingClients: [],
      UpcomingTasks: []
    }
  }
  componentDidMount(){
    fetch('http://127.0.0.1:8000/agent/Clients/?client_type=B', 
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer f4ugvyVQxamd5ftLu4S0TtTV09Q5FZ'
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          BuyingClients: responseJson,
        })
        console.log(this.state.BuyingClients)
      })
      .catch((error) =>{
        console.error(error);
    });

    fetch('http://127.0.0.1:8000/agent/Clients/?client_type=S', 
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer f4ugvyVQxamd5ftLu4S0TtTV09Q5FZ'
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          SellingClients: responseJson,
        })

      })
      .catch((error) =>{
        console.error(error);
    });

    fetch('http://127.0.0.1:8000/agent/UpcomingSteps/', 
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer f4ugvyVQxamd5ftLu4S0TtTV09Q5FZ'
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          UpcomingTasks: responseJson.splice(2),
        })

      })
      .catch((error) =>{
        console.error(error);
    });  
    return true;
  }

  GetGridViewItem (email, client_type) {
    this.props.navigation.navigate('Steps', {
        email: email,
        client_type: client_type
    })
  }

  toggleClientType() {
    let client_type = !this.state.client_type;
    this.setState({
      client_type: client_type
    });
  }

  static navigationOptions = {
        title: 'Clients',
        headerTitleStyle :{textAlign: 'center',alignSelf:'center', color: '#fff'},
        headerStyle:{
            backgroundColor:'#0091FF',
        },
    };



 render() {
   return (

    <View style={styles.MainContainer}>
      <ScrollView>
      <Text style={{color: '#0091FF', fontSize: 20, fontWeight: '600', paddingTop: 15,}} >Upcoming Tasks</Text>
      <View style = {{flex: 4}}>
      <FlatList
        data = { this.state.UpcomingTasks }
        renderItem={({item}) =>
          //<View style={styles.GridViewBlockStyle}>
            <TouchableOpacity onPress={this.GetGridViewItem.bind(this, item.client.email, item.client.client_type)} style={styles.touchbutton1}>
                <View style={{flex: 1, paddingRight: 30}}>
                    <Text>{item.date}</Text>
                    <Text>{item.name} ({item.client.first_name} {item.client.last_name})</Text>
                </View>
                <View style={{width: 20, alignItems: 'center', justifyContent: 'center'}} >
                </View>
            </TouchableOpacity>
          }
      />
      </View>

      <View style = {{flex:6}}>
        {this.state.client_type?
          <View style={{flexDirection: 'row', justifyContent: 'center', paddingTop: 30, paddingBottom: 10}}>
            <TouchableOpacity style={[styles.tabButton, styles.tabButtonLeft, {backgroundColor: '#0091FF',marginRight: -1,}]} >
                <Text style={{color: '#fff', fontSize: 16}}>Buyers</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggleClientType.bind(this)} style={[styles.tabButton, styles.tabButtonRight, {backgroundColor: '#fff',marginLeft: -1,}]}>
                <Text style={{color: '#000', fontSize: 16}}>Listings</Text>
            </TouchableOpacity>
          </View>
          :
          <View style={{flexDirection: 'row', justifyContent: 'center', paddingTop: 30, paddingBottom: 10}}>
            <TouchableOpacity onPress={this.toggleClientType.bind(this)} style={[styles.tabButton, styles.tabButtonLeft, {backgroundColor: '#fff',marginRight: -1,}]} >
                <Text style={{color: '#000', fontSize: 16}}>Buyers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tabButton, styles.tabButtonRight, {backgroundColor: '#0091FF',marginLeft: -1,}]}>
                <Text style={{color: '#fff', fontSize: 16}}>Listings</Text>
            </TouchableOpacity>
          </View>
        }
        <View style={{flexDirection: 'row', justifyContent: 'center', paddingBottom: 20, paddingTop: 10}}>
            <TouchableOpacity onPress={() => Actions.info()} style={{flexDirection: 'row'}} >
                <View style={{width: 16, height: 16, backgroundColor: '#4CD964', paddingLeft: 1, alignItems: 'center', borderRadius: 8, marginRight: 5,}}>
                    <Icon2 name="md-add" style={{fontSize: 17, color: '#fff', marginTop: -0.5}} />
                </View>
                <Text style={{color: '#000', fontSize: 13}}>Add Client</Text>
            </TouchableOpacity>
        </View> 
        <FlatList
           data={ this.state.BuyingClients }
           renderItem={({item}) =>
            //<View style={styles.GridViewBlockStyle}>
              <TouchableOpacity style={styles.GridViewBlockStyle} onPress={this.GetGridViewItem.bind(this, item.email, item.client_type)}>
                <PercentageCircle radius={50} borderWidth={8} percent={item.steps_percentage} textStyle={{fontSize: 15, color: '#000'}} color={"#4CD964"}></PercentageCircle>  
                <Text style={{marginTop: 5,}} >{item.first_name} {item.last_name}</Text>
                <Text style={{marginTop: 5,fontSize: 8,color: '#666'}} >Commission</Text>
                <View style={{backgroundColor: '#4BD964', marginTop: 5, width: 70,height: 25, justifyContent: 'center', alignItems: 'center', padding: 3,borderRadius: 12,}}>
                    <Text style={{color: '#fff'}}>${item.commission_val}</Text>
                </View>
              </TouchableOpacity>
            }
          numColumns={2}
        />
      </View>
    </ScrollView>
  </View>
           
   );
 }
}

const styles = StyleSheet.create({

  MainContainer :{
    justifyContent: 'center',
    flex:1,
    padding: 10,
    paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
    backgroundColor: '#fff'
  },
  GridViewBlockStyle: {
    justifyContent: 'center',
    flex:1,
    alignItems: 'center',
    height: 200,
    margin: 0.1,
    borderWidth: 1,
    borderColor: '#FAFAFA',
    backgroundColor: '#fff'
  },
  GridViewInsideTextItemStyle: {
    color: '#fff',
    padding: 10,
    fontSize: 18,
    justifyContent: 'center',
  },
  tabButton: {
    width: 80,
    alignItems: 'center',
    padding: 5,
    borderColor: '#0091FF',
    borderWidth: 0.7,
  },
  tabButtonLeft: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderTopRightRadius: 1,
  },
  tabButtonRight: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    borderTopLeftRadius: 1,
  },
  touchbutton1: {
      width: '100%',
      padding: 10,
      borderBottomColor: '#ddd',
      borderBottomWidth: 1,
      flexDirection: 'row',
      position: 'relative',
  },

});
