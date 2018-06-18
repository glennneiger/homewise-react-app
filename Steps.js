import React, { Component } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  ScrollView,
  FlatList,
  Platform,
  AsyncStorage
} from 'react-native';
//import { Actions } from 'react-native-router-flux';
//import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import PercentageCircle from 'react-native-percentage-circle';
import DatePicker from 'react-native-datepicker';
import Numeral from 'numeral';

import { ApiEndpoints, StorageKeys } from './AppConfig'

export default class Steps extends Component{
    constructor() {
        super();

        this.state= {
            id: '',
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            client_type: '',
            address: '',
            city: '',
            state: '',
            zipcode: '',
            steps_percentage: 0,
            commission_val: 0,
            total_steps: 0,
            total_steps_copy: 0,
            steps_complete: 0,
            steps_complete_copy: 0,
            steps: [],
            stepscopy: [],
            steps_deleted: [],
            editMode: false,
            addStep: false,
            addStepButton: true,


            newStepName: '',
            newStepDate: '',

            icon: true,

            currentChecked: -1,

            refresh: true,

            
        }
    }

  getTokenFromStorage = async () => {
    const token = await AsyncStorage.getItem(StorageKeys.authToken);
    return token;
  }

  // Async function to fetch web data and set state
  fetchWebtoState = async (url, stateField) => {
    // Get Bearer Token
    const bearerToken = await this.getTokenFromStorage();
    // Build fetch arguments
    let headerData = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + bearerToken 
    };
    // Fetch data
    fetch(url, {
      'method': 'GET',
      'headers': headerData
    })
    .then((response) => {
      if (!response.ok) {
        // Handle error
        alert('Error in response')
      } else {
        response.json().then((data) => {
          // Set corresponding state field
          this.setState({
            [stateField]: data
          })
        })
      }
    });
  }

    // Reused transition functions

    getClientStateTransition = function(parent, responseJson) {
        parent.setState({
            id: responseJson[0].id,
            first_name: responseJson[0].first_name,
            last_name: responseJson[0].last_name,
            email: responseJson[0].email,
            client_type: responseJson[0].client_type,
            phone_number: responseJson[0].phone_number,
            address: responseJson[0].address,
            city: responseJson[0].city,
            state: responseJson[0].state,
            zipcode: responseJson[0].zipcode,
            steps_percentage: responseJson[0].steps_percentage,
            total_steps: responseJson[0].total_steps,
            steps_complete: responseJson[0].steps_complete,
            commission_val: responseJson[0].commission_val,
            total_steps_copy: responseJson[0].total_steps,
            steps_complete_copy: responseJson[0].steps_complete,
        });
    }

    clientStepsStateTransition = function(parent, responseJson) {
        parent.setState({
            steps: responseJson,
            stepscopy: responseJson
        });
    }

    // Build URLs for fetch calls
    getClientURL = ApiEndpoints.url + ApiEndpoints.getclientPath;
    clientStepsURL = ApiEndpoints.url + ApiEndpoints.clientstepsPath;

  // Async function to POST web data from state, and subsequently set state
  pushStatetoWeb = async (url, bodyData, callback) => {
    // Get Bearer Token
    const bearerToken = await this.getTokenFromStorage();
    // Build fetch arguments
    let headerData = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + bearerToken 
    };
    // Fetch data
    fetch(url, {
      'method': 'POST',
      'headers': headerData,
      'body': JSON.stringify(bodyData)
    })
    .then((response) => {
      if (!response.ok) {
        // Handle error
        alert('Error in response')
        alert(response.status);
        alert(response.statusText)
      } else {
        response.json().then((data) => {
            // Trigger refresh hook
            //hook = this.props.navigation.getParam('refresh_hook', () => {alert('No refresh hook found')});
            //hook();
            this.props.navigation.state.params.refresh();
            // Go to callback function
            callback(this, data);
        })
      }
    });
  }

    componentDidMount(){
        // Prepare fetch call arguments
        let getClientBody = {
            email: this.props.navigation.getParam('email'),
            client_type: this.props.navigation.getParam('client_type')
        };
        let clientStepsBody = {
            email: this.props.navigation.getParam('email'),
            client_type: this.props.navigation.getParam('client_type')
        };

        // Make async fetch calls
        this.pushStatetoWeb(this.getClientURL, getClientBody, this.getClientStateTransition);
        this.pushStatetoWeb(this.clientStepsURL, clientStepsBody, this.clientStepsStateTransition);

        console.log('stepscopy')
        console.log(this.state.stepscopy)
        console.log(this.state.steps)
        return true;
    }

    percentColor(){
        let percentage = this.state.steps_percentage;


        if(percentage <= 25){
            return "#FF0000" 
        }
        else if(percentage > 25 && percentage <= 50){
            return "#FFE150"
        }
        else if(percentage > 50 && percentage <= 75){
            return "#32CD32"
        }
        else{
            return "#006400"
        }
    
    }

    back(){
        // Save current completion state for tasks
        let postURL = ApiEndpoints.url + ApiEndpoints.updatestepsPath;
        let postBody = {
            steps:this.state.steps,
            id: this.state.id,
            steps_complete: this.state.steps_complete,
            steps_percentage: this.state.steps_percentage,
            steps_deleted: this.state.steps_deleted,
            total_steps: this.state.total_steps
        };
        let stateTransition = function(parent, data) {
            parent.setState({
                steps_deleted: []
            })
        }
        this.pushStatetoWeb(postURL, postBody, stateTransition);

        //navigate
        this.props.navigation.navigate('AllClients');
    }

    changeCurrentChecked(id) {
        let stepscopy = JSON.parse(JSON.stringify(this.state.steps))
        for (var i = 0; i < stepscopy.length; i++) {
            if(stepscopy[i].id == id){
                let x = !stepscopy[i].complete; 
                stepscopy[i].complete = x;
                this.setState({
                    steps: stepscopy,
                    stepscopy: stepscopy
                });
                console.log(this.state.steps);
                if(x){
                    steps_complete_updated = this.state.steps_complete + 1;
                    console.log('total steps ' + this.state.total_steps)
                    console.log(steps_complete_updated)
                    steps_percentage_updated = Math.round((steps_complete_updated / this.state.total_steps) * 100)
                    this.setState({
                        steps_complete: steps_complete_updated,
                        steps_percentage: steps_percentage_updated
                    })
                }
                else{
                    steps_complete_updated = this.state.steps_complete - 1;
                    console.log(steps_complete_updated)
                    steps_percentage_updated = Math.round((steps_complete_updated / this.state.total_steps) * 100)
                    this.setState({
                        steps_complete: steps_complete_updated,
                        steps_percentage: steps_percentage_updated
                    })
                }

            }
        }
    }


    preAddStep(){
        let steps = this.state.steps
        let id = this.state.id
        let steps_complete = this.state.steps_complete
        let steps_percentage = this.state.steps_percentage
        let steps_deleted = this.state.steps_deleted
        let total_steps = this.state.total_steps
        console.log('steps_complete ' + steps_complete)
        console.log(steps_percentage)
        console.log(steps_deleted)
        console.log(total_steps)
        this.setState({
            addStep: true,
            addStepButton: false
        })

        let postURL = ApiEndpoints.url + ApiEndpoints.updatestepsPath;
        let postBody = {
            steps:steps,
            id: id,
            steps_complete: steps_complete,
            steps_percentage: steps_percentage,
            steps_deleted: steps_deleted,
            total_steps: total_steps
        };
        let stateTransition = function(parent, data) {
            parent.setState({
                steps_deleted: []
            })
        }
        this.pushStatetoWeb(postURL, postBody, stateTransition);


        /*fetch('http://127.0.0.1:8000/agent/UpdateSteps/', 
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer c2rGxk6dRTlhYgvz9WyZaT9P1K9yiG'
              },
              body: JSON.stringify({
                steps:steps,
                id: id,
                steps_complete: steps_complete,
                steps_percentage: steps_percentage,
                steps_deleted: steps_deleted,
                total_steps: total_steps
              }),
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        steps_deleted: []
                    })
                })
                .catch((error) => {
                  console.error(error);
                });*/

    }

    postAddStep(){
        let id = this.state.id
        
        let newStepName = this.state.newStepName
        let newStepDate = this.state.newStepDate
        let total_steps = this.state.total_steps + 1
        let steps_percentage = Math.round(((this.state.steps_complete)/total_steps) * 100)

        let postURL = ApiEndpoints.url + ApiEndpoints.addstepPath;
        let postBody = {
            id: id,
            newStepName: newStepName,
            newStepDate: newStepDate,
            total_steps: total_steps,
            steps_percentage: steps_percentage      
        };

        let stateTransition = function(parent, data) {
            // Prepare fetch call arguments
            let refreshPostBody = {
                email: parent.state.email,
                client_type: parent.state.client_type
            };

            // Refresh clients
            parent.pushStatetoWeb(parent.getClientURL, refreshPostBody, parent.getClientStateTransition);

            // Refresh steps
            parent.pushStatetoWeb(parent.clientStepsURL, refreshPostBody, parent.clientStepsStateTransition);

        }

        this.pushStatetoWeb(postURL, postBody, stateTransition);

        /*fetch('http://127.0.0.1:8000/agent/AddStep/', 
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer c2rGxk6dRTlhYgvz9WyZaT9P1K9yiG'
              },
              body: JSON.stringify({
                id: id,
                newStepName: newStepName,
                newStepDate: newStepDate,
                total_steps: total_steps,
                steps_percentage: steps_percentage
              }),
            }).then((response) => response.json())
                .then((responseJson) => {
                  fetch('http://127.0.0.1:8000/agent/GetClient/', 
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer c2rGxk6dRTlhYgvz9WyZaT9P1K9yiG'
            },
            body: JSON.stringify({
                email:this.state.email,
                client_type:this.state.client_type
            }),
        }).then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson[0])
            this.setState({
                id: responseJson[0].id,
                first_name: responseJson[0].first_name,
                last_name: responseJson[0].last_name,
                email: responseJson[0].email,
                client_type: responseJson[0].client_type,
                phone_number: responseJson[0].phone_number,
                address: responseJson[0].address,
                city: responseJson[0].city,
                state: responseJson[0].state,
                zipcode: responseJson[0].zipcode,
                steps_percentage: responseJson[0].steps_percentage,
                total_steps: responseJson[0].total_steps,
                steps_complete: responseJson[0].steps_complete,
                commission_val: responseJson[0].commission_val,
                total_steps_copy: responseJson[0].total_steps,
                steps_complete_copy: responseJson[0].steps_complete,

            })

            fetch('http://127.0.0.1:8000/agent/ClientSteps/', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer c2rGxk6dRTlhYgvz9WyZaT9P1K9yiG'
                },
                body: JSON.stringify({
                    email:this.state.email,
                    client_type:this.state.client_type
                }),
            }).then((response) => response.json())
              .then((responseJson) => {
                console.log(responseJson[0])
                this.setState({
                    steps: responseJson,
                    stepscopy: responseJson
                })

              })
              .catch((error) =>{
                console.error(error);
            })

          })
          .catch((error) =>{
            console.error(error);
        })
                })
                .catch((error) => {
                  console.error(error);
                });*/
        

        
        console.log(this.state.refresh)
        let refresh = !this.state.refresh
        
        this.setState({
            refresh: refresh,
            addStep: false,
            addStepButton: true
        });
        console.log(this.state.refresh)
    }

    addStepCancel(){
        console.log(this.state.newStepDate)
        this.setState({
            addStep: false,
            addStepButton: true,
            steps_deleted: []
        })   
    }

    preEdit(){
        let steps = this.state.steps
        let id = this.state.id
        let steps_complete = this.state.steps_complete
        let steps_percentage = this.state.steps_percentage
        let steps_deleted = []
        let total_steps = this.state.total_steps
        let editMode = !this.state.editMode
        let addStepButton = !this.state.addStepButton
        console.log(steps_percentage)

        this.setState({
            editMode: editMode,
            addStepButton: addStepButton,
            steps_complete_copy: steps_complete,
            total_steps_copy: total_steps,
            steps_deleted: []

        })

        let postURL = ApiEndpoints.url + ApiEndpoints.updatestepsPath;
        let postBody = {
            steps:steps,
            id: id,
            steps_complete: steps_complete,
            steps_percentage: steps_percentage,
            steps_deleted: steps_deleted,
            total_steps: total_steps
        }
        let stateTransition = function(parent, data) {
            parent.setState({
                steps_deleted: []
            });
        }

        this.pushStatetoWeb(postURL, postBody, stateTransition);

        /*fetch('http://127.0.0.1:8000/agent/UpdateSteps/', 
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer c2rGxk6dRTlhYgvz9WyZaT9P1K9yiG'
              },
              body: JSON.stringify({
                steps:steps,
                id: id,
                steps_complete: steps_complete,
                steps_percentage: steps_percentage,
                steps_deleted: steps_deleted,
                total_steps: total_steps
              }),
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        steps_deleted: []
                    })
                })
                .catch((error) => {
                  console.error(error);
                });*/
    };

    editModeChangeName(index, name){
        let stepscopy = JSON.parse(JSON.stringify(this.state.stepscopy))
        // for (var i = 0; i < stepscopy.length; i++) {
        //     if(stepscopy[i].id == id){
        //         stepscopy[i].name = name;
        //         this.setState({
        //             stepscopy: stepscopy
        //         });
        //         console.log(this.state.stepscopy);
        //         break;
        //     }
        // }

        stepscopy[index].name = name;
        console.log(stepscopy[index].name)
        this.setState({
            stepscopy: stepscopy
        });
        console.log(stepscopy[index].name)
        console.log(this.state.stepscopy)
    }

    editModeChangeDate(index, date){
        let stepscopy = JSON.parse(JSON.stringify(this.state.stepscopy))
        // for (var i = 0; i < stepscopy.length; i++) {
        //     if(stepscopy[i].id == id){
        //         stepscopy[i].name = name;
        //         this.setState({
        //             stepscopy: stepscopy
        //         });
        //         console.log(this.state.stepscopy);
        //         break;
        //     }
        // }

        stepscopy[index].date = date;
        console.log(stepscopy[index].date)
        this.setState({
            stepscopy: stepscopy,
        });
        console.log(stepscopy[index].date)
        console.log(this.state.stepscopy)
    }

    editModeDone(){
        let editMode = !this.state.editMode;
        let addStepButton = !this.state.addStepButton;
        let newSteps = this.state.stepscopy;
        let steps_deleted = this.state.steps_deleted;
        let id = this.state.id
        let steps_complete_copy = this.state.steps_complete_copy
        let total_steps_copy = this.state.total_steps_copy
        let steps_percentage = Math.round((steps_complete_copy/total_steps_copy) * 100)


        this.setState({
            steps: newSteps,
            editMode: editMode,
            addStepButton: addStepButton,
            steps_complete: steps_complete_copy,
            total_steps: total_steps_copy,
            steps_percentage: steps_percentage

        });
        console.log('newSteps')
        console.log(newSteps)
        console.log('deletedSteps')
        console.log(steps_deleted)

        let postURL = ApiEndpoints.url + ApiEndpoints.updatestepsPath;
        let postBody = {
            steps: newSteps,
            steps_deleted: steps_deleted,
            id: id,
            steps_complete: steps_complete_copy,
            total_steps: total_steps_copy,
            steps_percentage: steps_percentage    
        };
        let stateTransition = function(parent, data) {
            // Prepare fetch call arguments
            let refreshPostBody = {
                email: parent.state.email,
                client_type: parent.state.client_type
            };

            // Refresh clients
            parent.pushStatetoWeb(parent.getClientURL, refreshPostBody, parent.getClientStateTransition);

            // Refresh steps
            parent.pushStatetoWeb(parent.clientStepsURL, refreshPostBody, parent.clientStepsStateTransition);

        }

        this.pushStatetoWeb(postURL, postBody, stateTransition);

        /*fetch('http://127.0.0.1:8000/agent/UpdateSteps/', 
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer c2rGxk6dRTlhYgvz9WyZaT9P1K9yiG'
              },
              body: JSON.stringify({
                steps: newSteps,
                steps_deleted: steps_deleted,
                id: id,
                steps_complete: steps_complete_copy,
                total_steps: total_steps_copy,
                steps_percentage: steps_percentage
              }),
            }).then((response) => response.json())
                .then((responseJson) => {
                fetch('http://127.0.0.1:8000/agent/GetClient/', 
                {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer c2rGxk6dRTlhYgvz9WyZaT9P1K9yiG'
                },
                body: JSON.stringify({
                    email:this.state.email,
                    client_type:this.state.client_type
                }),
        }).then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson[0])
            this.setState({
                id: responseJson[0].id,
                first_name: responseJson[0].first_name,
                last_name: responseJson[0].last_name,
                email: responseJson[0].email,
                client_type: responseJson[0].client_type,
                phone_number: responseJson[0].phone_number,
                address: responseJson[0].address,
                city: responseJson[0].city,
                state: responseJson[0].state,
                zipcode: responseJson[0].zipcode,
                steps_percentage: responseJson[0].steps_percentage,
                total_steps: responseJson[0].total_steps,
                steps_complete: responseJson[0].steps_complete,
                commission_val: responseJson[0].commission_val,
                total_steps_copy: responseJson[0].total_steps,
                steps_complete_copy: responseJson[0].steps_complete,

            })

            fetch('http://127.0.0.1:8000/agent/ClientSteps/', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer c2rGxk6dRTlhYgvz9WyZaT9P1K9yiG'
                },
                body: JSON.stringify({
                    email:this.state.email,
                    client_type:this.state.client_type
                }),
            }).then((response) => response.json())
              .then((responseJson) => {
                console.log(responseJson[0])
                this.setState({
                    steps: responseJson,
                    stepscopy: responseJson,
                    steps_deleted: []
                })

              })
              .catch((error) =>{
                console.error(error);
            })

          })
          .catch((error) =>{
            console.error(error);
        })
                })
                .catch((error) => {
                  console.error(error);
                });*/

        

    }

    editModeCancel(){
        let editMode = !this.state.editMode
        let addStepButton = !this.state.addStepButton
        let oldSteps = this.state.steps;
        let steps_complete = this.state.steps_complete;
        let total_steps = this.state.total_steps;

        this.setState({
            editMode: editMode,
            addStepButton: addStepButton,
            stepscopy: oldSteps,
            steps_complete_copy: steps_complete,
            total_steps_copy: total_steps
        })
    }

    deleteStep(index){
        let stepscopy = JSON.parse(JSON.stringify(this.state.stepscopy));
        let steps_complete = this.state.steps_complete_copy;
        let steps_deleted = this.state.steps_deleted;

        if(stepscopy[index].complete){
            steps_complete = steps_complete-1;
        }

        let total_steps = this.state.total_steps_copy-1;
        step = stepscopy.splice(index, 1);
        console.log('step added to deleted')
        console.log(step[0])
        steps_deleted.push(step[0])
        console.log('stepscopy')
        console.log(stepscopy)
        console.log('steps deleted')
        console.log(steps_deleted)
        this.setState({
            stepscopy: stepscopy,
            steps_deleted: steps_deleted,
            steps_complete_copy: steps_complete,
            total_steps_copy: total_steps
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
                <View style={{position: 'relative', alignItems: 'center', width: '100%', marginTop: 10, paddingBottom: 10}}> 
                    {this.state.editMode?
                    <TouchableOpacity
                        onPress={this.editModeCancel.bind(this)}
                        style={{
                            paddingHorizontal: 8,
                            paddingVertical: 3,
                            borderColor: '#0091FF',
                            borderWidth: 0.5,
                            position: 'absolute',
                            top: 0,
                            borderRadius: 4,
                            left: 15,
                        }}>
                        <Text style={{color: '#0091FF',}}>Cancel</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        onPress={this.back.bind(this)}
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
                        }}>
                        <View style={{flexDirection: 'row'}}>
                            <Icon2 name="md-arrow-round-back" style={{fontSize: 17, color: '#fff'}} />
                            <Text style={{color: '#fff',}}> Back</Text>
                        </View>
                    </TouchableOpacity>}
                    <Text style={{color: '#0091FF', fontSize: 20, fontWeight: '600',}} >{this.state.first_name} {this.state.last_name}</Text>
                    {this.state.editMode?
                    <TouchableOpacity
                        onPress={this.editModeDone.bind(this)}
                        style={{
                            paddingHorizontal: 8,
                            paddingVertical: 3,
                            borderColor: '#0091FF',
                            borderWidth: 0.5,
                            position: 'absolute',
                            top: 0,
                            borderRadius: 4,
                            right: 15,
                        }}>
                        <Text style={{color: '#0091FF',}}>Done</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        onPress={this.preEdit.bind(this)}
                        style={{
                            paddingHorizontal: 8,
                            paddingVertical: 3,
                            borderColor: '#0091FF',
                            borderWidth: 0.5,
                            position: 'absolute',
                            top: 0,
                            borderRadius: 4,
                            right: 15,
                        }}>
                        <Text style={{color: '#0091FF',}}>Edit</Text>
                    </TouchableOpacity>
                    }
                </View>
                <ScrollView style={{flex:1, width: '100%'}}>
                    <View style={{alignItems: 'center', paddingTop: 5,}} >
                        <Text style={{color: '#aaa', fontSize: 13}} >{this.state.address}</Text>
                        <Text style={{color: '#aaa', fontSize: 13, marginTop: 7,}} >{this.state.city}, {this.state.state}, {this.state.zipcode}</Text>
                    </View>
                    <View style={{flex: 1,alignItems: 'center', paddingTop: 18,}} >
                        <PercentageCircle radius={60} borderWidth={8} percent={Math.round(this.state.steps_percentage)} textStyle={{fontSize: 15, color: '#000'}} color={this.percentColor()}></PercentageCircle>  
                        <Text style={{marginTop: 15,fontSize: 9,color: '#666'}} >Commission</Text>
                        <View style={{backgroundColor: '#4BD964', marginTop: 15, width: 100,height: 31, justifyContent: 'center', alignItems: 'center', padding: 7,borderRadius: 12,}}>
                            <Text style={{color: '#fff', fontSize: 17}}>${Numeral((this.state.commission_val).toString()).format('0,0')}</Text>
                        </View>
                    </View>
                    {!this.state.editMode?
                        <View style={{paddingTop: 20,}}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                style={{padding: 5}}
                                data={this.state.steps}
                                extraData={this.state.refresh}
                                renderItem={({item, index}) =>
                                    <TouchableOpacity style={styles.dayLineButton} onPress={this.changeCurrentChecked.bind(this, item.id)}>
                                        <View style={{zIndex: 1, width: 50,alignItems: 'center', justifyContent: 'center', position: 'relative',}} >
                                            
                                            {index == 0 &&
                                                <View style={{zIndex: 11,position: 'absolute', width: 2, height: '50%', top: 35, left: 24, backgroundColor: '#0091FF'}} />
                                            }
                                            {index > 0 && index < (this.state.steps.length-1) &&
                                                <View style={{zIndex: 11,position: 'absolute', width: 2, height: '100%', top: 0, left: 24, backgroundColor: '#0091FF'}} />
                                            }
                                            {index == (this.state.steps.length-1) &&
                                                <View style={{zIndex: 11,position: 'absolute', width: 2, height: '50%', top: 0, left: 24, backgroundColor: '#0091FF'}} />
                                            }
                                            <View style={{zIndex: 12,backgroundColor: '#fff', width: 20, height: 20, alignItems: 'center', justifyContent:'center'}} >
                                                <Icon2 name="md-checkmark-circle" style={{fontSize: 23, marginLeft: 0.5, marginTop: -2, color: item.complete? '#0091FF': '#ddd'}} />
                                            </View>
                                            
                                        </View>
                                        <View style={{flex: 1, paddingVertical: 20, paddingHorizontal: 10,}}>
                                            <Text style={{fontSize: 13}} >{item.name}</Text>
                                        </View>
                                        <View style={{alignItems: 'center', justifyContent: 'center', paddingRight: 10,}} >
                                            <Text>{item.date}</Text>
                                        </View>
                                        {index == 0 &&
                                            <View style={{position: 'absolute', width: '100%', height: 1, backgroundColor: '#ddd', left: 0, top: 0,}} />
                                        }
                                    </TouchableOpacity>
                                }
                                 />
                        </View>
                        :
                        <View style={{paddingTop: 20,}}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                style={{padding: 5}}
                                data={this.state.stepscopy}
                                renderItem={({item, index}) =>
                                    <TouchableOpacity style={styles.dayLineButton}>
                                        <View style={{zIndex: 1, width: 50,alignItems: 'center', justifyContent: 'center', position: 'relative',}} >
                                            {index == 0 &&
                                                <View style={{zIndex: 11,position: 'absolute', width: 2, height: '50%', top: 35, left: 24, backgroundColor: '#0091FF'}} />
                                            }
                                            {index > 0 && index < (this.state.steps.length-1) &&
                                                <View style={{zIndex: 11,position: 'absolute', width: 2, height: '100%', top: 0, left: 24, backgroundColor: '#0091FF'}} />
                                            }
                                            {index == (this.state.steps.length-1) &&
                                                <View style={{zIndex: 11,position: 'absolute', width: 2, height: '50%', top: 0, left: 24, backgroundColor: '#0091FF'}} />
                                            }

                                            
                                            <View style={{zIndex: 12,backgroundColor: '#fff', width: 20, height: 20, overflow: 'visible', alignItems: 'center', justifyContent:'center'}} >
                                                <Icon2 name="md-checkmark-circle" style={{fontSize: 23, marginLeft: 0.5, marginTop: -2, color: item.complete? '#0091FF': '#ddd'}} />
                                            </View>
                                            
                                        </View>
                                        <View style={{flex: 1, paddingVertical: 20, paddingHorizontal: 10,}}>
                                            <TextInput
                                                style={styles.values}
                                                value={item.name}
                                                keyboardType = {'default'}
                                                returnKeyType = {'done'}
                                                onChangeText = {(name)=> this.editModeChangeName(index, name)}
                                            >
                                            </TextInput>
                                        </View>
                                        <View style={{alignItems: 'center', justifyContent: 'center', paddingRight: 10,}} >
                                            <DatePicker
                                                style={styles.datevaluesstep}
                                                showIcon= {true}
                                                mode="date"
                                                date = {item.date}
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
                                                onDateChange={(date)=> this.editModeChangeDate(index, date)}
                                            />
                                        </View>
                                        <View style={{alignItems: 'center', justifyContent: 'center', paddingRight: 10,}} >
                                            <TouchableOpacity onPress={this.deleteStep.bind(this, index)}>
                                                <Icon2 name="md-remove-circle" style={{fontSize: 23, color: '#FF0000'}}/>
                                            </TouchableOpacity>
                                        </View>
                                        {index == 0 &&
                                            <View style={{position: 'absolute', width: '100%', height: 1, backgroundColor: '#ddd', left: 0, top: 0,}} />
                                        }
                                    </TouchableOpacity>
                                }
                                 />
                        </View>
                    }
                    {this.state.addStepButton&&
                        <View style={{flexDirection: 'row', justifyContent: 'center', paddingTop: 20, paddingBottom: 20}}>
                            <TouchableOpacity onPress={this.preAddStep.bind(this)} style={{flexDirection: 'row'}} >
                                <View style={{width: 16, height: 16, backgroundColor: '#4CD964', paddingLeft: 1, alignItems: 'center', borderRadius: 8, marginRight: 5,}}>
                                    <Icon2 name="md-add" style={{fontSize: 17, color: '#fff', marginTop: -0.5}} />
                                </View>
                                <Text style={{color: '#000', fontSize: 13}}>Add Step</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    {this.state.addStep&&
                        <View>
                        <View style={styles.addStep}>
                            <View style={styles.addStepInput}>
                                <View style={styles.caption}>
                                    <Text style={styles.captionText}>Step Name</Text>
                                </View>
                                <View style={styles.row}>
                                    <TextInput
                                        style={styles.values}
                                        keyboardType = {'default'}
                                        returnKeyType = {'done'}
                                        onChangeText = {(text)=> this.setState({newStepName: text})}
                                        >
                                    </TextInput>
                                </View>  
                            </View>
                            <View style={styles.addStepInput}>
                                <View style={styles.caption}>
                                    <Text style={styles.captionText}>Date</Text>
                                </View>
                                <View style={styles.row}>
                                    <DatePicker
                                        style={styles.datevalues}
                                        showIcon= {false}
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
                                </View>  
                            </View>
                        </View>
                        <View style={styles.addStepButtons}>
                            <TouchableOpacity
                               style = {styles.submitButton}
                               onPress = {
                                  () => this.postAddStep()
                               }>
                               <Text style = {styles.submitButtonText}> Add Step </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                               style = {styles.submitButton}
                               onPress = {
                                  () => this.addStepCancel()
                               }>
                               <Text style = {styles.submitButtonText}> Cancel </Text>
                            </TouchableOpacity>
                        </View>
                        </View>

                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'ios' ? 12 : 0,
    },
    dayLineButton: {
        width: '100%',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        flexDirection: 'row',
        position: 'relative',
    },
    addStep: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 20
    },
    addStepButtons: {
        flex: 1,
        flexDirection: 'row'
    },
    addStepInput: {
        flex: 1,
        alignItems: 'center'
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

    flex:3,
    flexDirection: 'row',
    paddingBottom: 5,
    //alignItems: 'flex-end'
  },
  captionText: {
    fontSize: 15,
    paddingBottom: 0
  },
  values: {
    marginRight: 5,
    

    flex:8,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 5,

    height: 30,
    fontSize: 13,


    textAlign: 'left',
    //backgroundColor: '#F7F7F5'
  },
  datevaluesstep: {
    marginRight: 0,
    marginLeft: 0,

    borderColor: '#D3D3D3',
    borderRadius: 5,
    borderWidth: 1,
    height: 30,
    alignItems: 'center',
    justifyContent:'center',

    //backgroundColor: '#F7F7F5'
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

    //backgroundColor: '#F7F7F5'
  },
  submitButton: {
    marginRight: 35,
    marginLeft: 35,

    flex:5,
    borderColor: '#D3D3D3',
    height: 30,
    
    backgroundColor: 'rgb(65,147,237)',
    justifyContent:'center', 
    alignItems:'center'
   },
   submitButtonText:{
        fontSize: 13,
      color: 'white',
   }
});
