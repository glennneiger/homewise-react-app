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
} from 'react-native';
//import { Actions } from 'react-native-router-flux';
//import Icon from 'react-native-vector-icons/FontAwesome';
//import Icon2 from 'react-native-vector-icons/Ionicons';
import PercentageCircle from 'react-native-percentage-circle';
import DatePicker from 'react-native-datepicker';

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
            steps_complete: 0,
            steps: [],
            editMode: true,
            addStep: false,
            addStepButton: true,


            newStepName: '',
            newStepDate: '',

            currentChecked: -1,
            
        }
    }
    componentDidMount(){
        
        fetch('http://127.0.0.1:8000/agent/GetClient/', 
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 2ORr1lpiLqlaFjHlBjX4qnsstGhn6S'
            },
            body: JSON.stringify({
                email: this.props.navigation.getParam('email'),
                client_type: this.props.navigation.getParam('client_type')
            }),
        }).then((response) => response.json())
          .then((responseJson) => {
            console.log(this.props.navigation.getParam('email'))
            console.log(this.props.navigation.getParam('client_type'))
            console.log('hi')
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
            })

          })
          .catch((error) =>{
            console.error(error);
        });

        fetch('http://127.0.0.1:8000/agent/ClientSteps/', 
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 2ORr1lpiLqlaFjHlBjX4qnsstGhn6S'
            },
            body: JSON.stringify({
                email: this.props.navigation.getParam('email'),
                client_type: this.props.navigation.getParam('client_type')
            }),
        }).then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson[0])
            this.setState({
                steps: responseJson,
            })

          })
          .catch((error) =>{
            console.error(error);
        });

        return true;
    }

    editModeToggle(){
        let edit = !this.state.edit
        this.setState({
            edit: edit
        })
    };

    changeCurrentChecked(id) {
        let stepscopy = JSON.parse(JSON.stringify(this.state.steps))
        for (var i = 0; i < stepscopy.length; i++) {
            if(stepscopy[i].id == id){
                let x = !stepscopy[i].complete; 
                stepscopy[i].complete = x;
                this.setState({
                    steps: stepscopy
                });
                console.log(this.state.steps);
                if(x){
                    steps_complete_updated = this.state.steps_complete + 1;
                    console.log(steps_complete_updated)
                    steps_percentage_updated = (steps_complete_updated / this.state.total_steps) * 100
                    this.setState({
                        steps_complete: steps_complete_updated,
                        steps_percentage: steps_percentage_updated
                    })
                }
                else{
                    steps_complete_updated = this.state.steps_complete - 1;
                    console.log(steps_complete_updated)
                    steps_percentage_updated = (steps_complete_updated / this.state.total_steps) * 100
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

        this.setState({
            addStep: true,
            addStepButton: false
        })

        for(var i = 0; i < steps.length; i++){
            console.log(steps[i])
        }
        fetch('http://127.0.0.1:8000/agent/UpdateSteps/', 
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer uyoFUhXyT788ycMdvixJ3Wx793eSdI'
              },
              body: JSON.stringify({
                steps:steps,
                id: id,
                steps_complete: steps_complete,
                steps_percentage: steps_percentage
              }),
            }).then((response) => response.json())
                .then((responseJson) => {
                  alert(responseJson);
                })
                .catch((error) => {
                  console.error(error);
                });

    }

    postAddStep(){
        let id = this.state.id
        
        let newStepName = this.state.newStepName
        let newStepDate = this.state.newStepDate
        let total_steps = this.state.total_steps + 1
        let steps_percentage = Math.round(((this.state.steps_complete)/total_steps) * 100)

        fetch('http://127.0.0.1:8000/agent/AddStep/', 
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer uyoFUhXyT788ycMdvixJ3Wx793eSdI'
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
                  console.log(responseJson);
                })
                .catch((error) => {
                  console.error(error);
                });

        

    



    }

    cancelStep(){
        console.log(this.state.newStepDate)
        this.setState({
            addStep: false,
            addStepButton: true
        })   
    }

static navigationOptions = ({ navigation }) => {
    return {
       header: null
    }
 }

    render() {
        return (
            <View style={styles.container}>
                <View style={{position: 'relative', alignItems: 'center', width: '100%', marginTop: 20,}} >
                    <Text style={{color: '#0091FF', fontSize: 20, fontWeight: '600',}} >{this.state.first_name} {this.state.last_name}</Text>
                    <TouchableOpacity
                        onPress={this.editModeToggle.bind(this)}
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
                        {this.state.edit? <Text style={{color: '#0091FF',}}>Edit</Text> : <Text style={{color: '#0091FF', }}>Done</Text>}
                    </TouchableOpacity>
                </View>
                <ScrollView style={{flex:1, width: '100%'}}>
                    <View style={{alignItems: 'center', paddingTop: 15,}} >
                        <Text style={{color: '#aaa', fontSize: 13}} >{this.state.address}</Text>
                        <Text style={{color: '#aaa', fontSize: 13, marginTop: 7,}} >{this.state.city}, {this.state.state}, {this.state.zipcode}</Text>
                    </View>
                    <View style={{flex: 1,alignItems: 'center', paddingTop: 18,}} >
                        <PercentageCircle radius={60} borderWidth={8} percent={this.state.steps_percentage} textStyle={{color: '#000'}} color={"#FFE150"}></PercentageCircle>  
                        <Text style={{marginTop: 15,fontSize: 9,color: '#666'}} >Commission</Text>
                        <View style={{backgroundColor: '#4BD964', marginTop: 15, width: 70,height: 25, justifyContent: 'center', alignItems: 'center', padding: 3,borderRadius: 12,}}>
                            <Text style={{color: '#fff', fontSize: 17}}>${this.state.commission_val}</Text>
                        </View>
                    </View>
                    <View style={{paddingTop: 20,}}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            style={{padding: 5}}
                            data={this.state.steps}
                            renderItem={({item, index}) =>
                              
                                    <TouchableOpacity style={styles.dayLineButton} onPress={this.changeCurrentChecked.bind(this, item.id)}>
                                        <View style={{zIndex: 1, width: 50,alignItems: 'center', justifyContent: 'center', position: 'relative',}} >
                                            <View style={{zIndex: 11,position: 'absolute', width: 2, height: '100%', top: 0, left: 24, backgroundColor: '#0091FF'}} />
                                            
                                            <View style={{zIndex: 12,backgroundColor: '#fff', width: 20, height: 20, overflow: 'visible', alignItems: 'center', justifyContent:'center'}} >
                                                
                                            </View>
                                            {index == 0 &&
                                                <View style={{zIndex: 11,position: 'absolute', width: 2, height: '50%', top: 0, left: 24, backgroundColor: '#0091FF'}} />
                                            }
                                        </View>
                                        <View style={{flex: 1, paddingVertical: 20, paddingHorizontal: 10,}}>
                                            <Text style={{fontSize: 13}} >{item.name}</Text>
                                        </View>
                                        <View style={{alignItems: 'center', justifyContent: 'center', paddingRight: 10,}} >
                                            <Text>{item.date}</Text>
                                        </View>
                                        <View style={{position: 'absolute', width: '100%', height: 1, backgroundColor: '#ddd', left: 0, bottom: 0,}} />
                                        {index == 0 &&
                                            <View style={{position: 'absolute', width: '100%', height: 1, backgroundColor: '#ddd', left: 0, top: 0,}} />
                                        }
                                    </TouchableOpacity>

                                
                                

                            }
                             />
                    </View>
                    {this.state.addStepButton&&
                        <View style={{flexDirection: 'row', justifyContent: 'center', paddingTop: 20, paddingBottom: 20}}>
                            <TouchableOpacity onPress={this.preAddStep.bind(this)} style={{flexDirection: 'row'}} >
                                <View style={{width: 16, height: 16, backgroundColor: '#4CD964', paddingLeft: 1, alignItems: 'center', borderRadius: 8, marginRight: 5,}}>
                                    
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
                                  () => this.cancelStep()
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
    },
    dayLineButton: {
        width: '100%',
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
    marginRight: 10,
    marginLeft: 10,

    flex:9.5,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    height: 35,
    fontSize: 15,
    paddingRight: 10,

    textAlign: 'left',
    //backgroundColor: '#F7F7F5'
  },
  datevalues: {
    marginRight: 10,
    marginLeft: 10,

    flex:9.5,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    height: 35,

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