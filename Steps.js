import React, { Component } from 'react'
import {
  KeyboardAvoidingView,
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import PercentageCircle from 'react-native-percentage-circle';
import DatePicker from 'react-native-datepicker';
import Numeral from 'numeral';
import Spinner from 'react-native-loading-spinner-overlay';

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
            newStepDate: new Date(),

            icon: true,

            currentChecked: -1,

            refresh: true,
            visible: false,

            needToRefresh: true
        }
        this.refreshData = this.refreshData.bind(this);
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
        //alert('Error in response')
      } else {
        response.json().then((data) => {
          // Set corresponding state field
          this.setState({
            [stateField]: data,
            visible: false
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
    clientStepsURL = ApiEndpoints.url + ApiEndpoints.clientstepsnewPath;

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
        //alert('Error in response')
        //alert(response.status);
        //alert(response.statusText)
      } else {
        response.json().then((data) => {
            // Trigger refresh hook
            //hook = this.props.navigation.getParam('refresh_hook', () => {alert('No refresh hook found')});
            //hook();
            this.props.navigation.state.params.refresh();
            // Go to callback function
            callback(this, data);
            setInterval(() => {
                this.setState({
                    visible: false
                });
            }, 1000);
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
        //alert(this.props.navigation.getParam('client_type'))

        // Make async fetch calls
        this.pushStatetoWeb(this.getClientURL, getClientBody, this.getClientStateTransition);
        this.pushStatetoWeb(this.clientStepsURL, clientStepsBody, this.clientStepsStateTransition);

        this.setState({
            visible: !this.state.visible,
        })

        console.log('stepscopy')
        console.log(this.state.stepscopy)
        console.log(this.state.steps)
        return true;
    }

    refreshData () {
        this.setState({
          needToRefresh: true,
          //visible: true
        });
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
        // let postURL = ApiEndpoints.url + ApiEndpoints.updatestepsPath;
        // let postBody = {
        //     steps:this.state.steps,
        //     id: this.state.id,
        //     steps_complete: this.state.steps_complete,
        //     steps_percentage: this.state.steps_percentage,
        //     steps_deleted: this.state.steps_deleted,
        //     total_steps: this.state.total_steps
        // };
        // let stateTransition = function(parent, data) {
        //     parent.setState({
        //         steps_deleted: []
        //     })
        // }
        // this.pushStatetoWeb(postURL, postBody, stateTransition);


        this.setState({
            visible: !this.state.visible,
        })
        //navigate
        this.props.navigation.navigate('AllClients');
    }

    changeCurrentChecked(id) {
        // let stepscopy = JSON.parse(JSON.stringify(this.state.steps))
        // for (var i = 0; i < stepscopy.length; i++) {
        //     if(stepscopy[i].id == id){
        //         let x = !stepscopy[i].complete; 
        //         stepscopy[i].complete = x;
        //         this.setState({
        //             steps: stepscopy,
        //             stepscopy: stepscopy
        //         });
        //         console.log(this.state.steps);
        //         if(x){
        //             steps_complete_updated = this.state.steps_complete + 1;
        //             console.log('total steps ' + this.state.total_steps)
        //             console.log(steps_complete_updated)
        //             steps_percentage_updated = Math.round((steps_complete_updated / this.state.total_steps) * 100)
        //             this.setState({
        //                 steps_complete: steps_complete_updated,
        //                 steps_percentage: steps_percentage_updated
        //             })
        //         }
        //         else{
        //             steps_complete_updated = this.state.steps_complete - 1;
        //             console.log(steps_complete_updated)
        //             steps_percentage_updated = Math.round((steps_complete_updated / this.state.total_steps) * 100)
        //             this.setState({
        //                 steps_complete: steps_complete_updated,
        //                 steps_percentage: steps_percentage_updated
        //             })
        //         }

        //     }
        // }
        this.props.navigation.navigate('SingleStep', {
            id: id,
            client_id: this.state.id,
            refresh: this.refreshData
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

    GetGridViewItem = function() { 
    this.props.navigation.navigate('AddStep', {
        id: this.state.id,
        refresh: this.refreshData
    });
  }

    static navigationOptions = ({ navigation }) => {
        return {
           header: null
        }
    }
     



    render() {
        if(this.state.needToRefresh) {
            // Prepare fetch call arguments
            let getClientBody = {
                email: this.props.navigation.getParam('email'),
                client_type: this.props.navigation.getParam('client_type')
            };
            let clientStepsBody = {
                email: this.props.navigation.getParam('email'),
                client_type: this.props.navigation.getParam('client_type')
            };
            //alert(this.props.navigation.getParam('client_type'))

            // Make async fetch calls
            this.pushStatetoWeb(this.getClientURL, getClientBody, this.getClientStateTransition);
            this.pushStatetoWeb(this.clientStepsURL, clientStepsBody, this.clientStepsStateTransition);

            this.setState({
                visible: !this.state.visible,
            })

            this.setState({
              needToRefresh: false
            })
        }
        return (
            <View style={styles.container}>
            <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} /*overlayColor='#0091FF'*//>
                <View style={{position: 'relative', alignItems: 'center', width: '100%', marginTop: 10, paddingBottom: 10}}> 

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
                            <Icon2 name="md-arrow-round-back" style={{fontSize: 17, color: '#fff', paddingTop: 3}} />
                            <Text style={{color: '#fff', fontSize: 18}}> Back</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={{color: '#0091FF', fontSize: 22, fontWeight: '600',}} >{this.state.first_name} {this.state.last_name}</Text>
                </View>
                <KeyboardAwareScrollView style={{flex:1, width: '100%'}}>
                {this.props.navigation.getParam('client_type') == 'S'?
                    <View style={{alignItems: 'center', paddingTop: 5,}} >
                        <Text style={{color: '#aaa', fontSize: 13}} >{this.state.address}</Text>
                        <Text style={{color: '#aaa', fontSize: 13, marginTop: 7,}} >{this.state.city}, {this.state.state}, {this.state.zipcode}</Text>
                    </View>
                
                :
                <View style={{alignItems: 'center', paddingTop: 5,}} >
                        <Text style={{color: '#aaa', fontSize: 13}} >{this.state.address}</Text>
                        <Text style={{color: '#aaa', fontSize: 13, marginTop: 7,}} >{this.state.city} {this.state.state} {this.state.zipcode}</Text>
                    </View>
                }
                    <View style={{flex: 1,alignItems: 'center', paddingTop: 18,}} >
                        <PercentageCircle radius={70} borderWidth={15} percent={Math.round(this.state.steps_percentage)} textStyle={{fontSize: 20, color: '#000'}} color={this.percentColor()} innerColor={'#f6fbfc'}></PercentageCircle>  
                        <Text style={{marginTop: 15,fontSize: 15,color: '#666'}} >Commission</Text>
                        <View style={{backgroundColor: '#4BD964', marginTop: 15, width: 150, height: 35, justifyContent: 'center', alignItems: 'center', padding: 7,borderRadius: 12,}}>
                            <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>${Numeral((this.state.commission_val).toString()).format('0,0')}</Text>
                        </View>
                    </View>

                    {!this.state.editMode?
                        <View style={{paddingTop: 20,}}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                style={{paddingTop: 15, paddingBottom: 15}}
                                data={this.state.steps}
                                extraData={this.state.refresh}
                                renderItem={({item, index}) =>
                                    <TouchableOpacity style={styles.dayLineButton} onPress={this.changeCurrentChecked.bind(this, item.id)} activeOpacity = { 1 }>
                                        <View style={{zIndex: 1, width: 50,alignItems: 'center', justifyContent: 'center', position: 'relative',}} >
                                            
                                            {index == 0 &&
                                                <View style={{zIndex: 11,position: 'absolute', width: 2, height: '50%', top: 65, left: 24, backgroundColor: '#0091FF'}} />
                                            }
                                            {index > 0 && index < (this.state.steps.length-1) &&
                                                <View style={{zIndex: 11,position: 'absolute', width: 2, height: '100%', top: 0, left: 24, backgroundColor: '#0091FF'}} />
                                            }
                                            {index == (this.state.steps.length-1) &&
                                                <View style={{zIndex: 11,position: 'absolute', width: 2, height: '50%', top: 0, left: 24, backgroundColor: '#0091FF'}} />
                                            }
                                            <View style={{zIndex: 12,backgroundColor: '#f6fbfc', width: 24, height: 24, alignItems: 'center', justifyContent:'center'}} >
                                                <Icon2 name="md-checkmark-circle" style={{fontSize: 27, marginLeft: 0.5, marginTop: -2, color: item.complete? '#0091FF': '#ddd'}} />
                                            </View>
                                            
                                        </View>
                                        <View style={{flex: 1, paddingVertical: 30, paddingHorizontal: 10}}>
                                            <Text style={{fontSize: 20, fontWeight: 'bold'}} >{item.name}</Text>
                                            <Text style={{fontSize: 15, color: '#707070'}}>{item.date}</Text>
                                        </View>
                                        <View style={{alignItems: 'center', justifyContent: 'center', paddingRight: 10,}} >
                                            <Icon name="angle-right" style={{fontSize: 20, color: '#707070'}} />
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
                                                autoCorrect={false}
                                                returnKeyType = {'done'}
                                                maxLength = {60}
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
                        <View style={{flexDirection: 'row', justifyContent: 'center', paddingTop: 5, paddingBottom: 30}}>
                            <TouchableOpacity
                             style={{flexDirection: 'row'}}
                             onPress = {
                                  () => this.GetGridViewItem()}>
                                <View style={{width: 40, height: 40, backgroundColor: '#4CD964', alignItems: 'center', borderRadius: 20, marginRight: 10,}}>
                                    <Icon2 name="md-add" style={{fontSize: 40, color: '#fff', marginTop: -0.5}} />
                                </View>
                                <View style={{paddingTop: 10}}>
                                    <Text style={{color: '#000', fontSize: 20}}>Add Step</Text>
                                </View>
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
                                <View style={styles.caption}>
                                    <Text style={styles.captionText}>Date</Text>
                                </View>
                                <View style={styles.row}>
                                    <DatePicker
                                        style={styles.datevalues}
                                        showIcon= {false}
                                        mode="date"
                                        date = {this.state.newStepDate}
                                        format="MM/DD/YY"
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
                </KeyboardAwareScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f6fbfc',
        paddingTop: Platform.OS === 'ios' ? 25 : 0,
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
