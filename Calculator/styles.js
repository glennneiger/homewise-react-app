import {
  View,
  Platform,
  Dimensions,
  StyleSheet
} from 'react-native';

const {width, height} = Dimensions.get('window')


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  otherStuff: {
    flex:0.9,
    flexDirection: 'row'
  },
  headerTabs1:{
    width: width * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#0091FF',
    borderWidth: 1,
    position: 'relative',
    top: 0,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: width * 0.05,
    paddingTop:5,
    paddingBottom:5,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
  },
  headerTabs1selected:{
    width: width * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#0091FF',
    borderWidth: 1,
    position: 'relative',
    top: 0,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: width * 0.05,
    paddingTop: 5,
    paddingBottom:5,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    backgroundColor: '#0091FF'
  },
  idk:{
    width: width * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#0091FF',
    borderWidth: 1,
    position: 'relative',
    top: 0,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: width * 0.05,
    paddingTop: 5,
    paddingBottom:5,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
  },
  headerTabs2:{
    width: width * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#0091FF',
    borderWidth: 1,
    position: 'relative',
    top: 0,
    marginTop: 10,
    marginBottom: 10,
    paddingTop:5,
    paddingBottom:5,
  },
   headerTabs2selected:{
    width: width * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#0091FF',
    borderWidth: 1,
    position: 'relative',
    top: 0,
    marginTop: 10,
    marginBottom: 10,
    paddingTop:5,
    paddingBottom:5,
    backgroundColor: '#0091FF'
  },
  headerTabs3:{
    width: width * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#0091FF',
    borderWidth: 1,
    position: 'relative',
    top: 0,
    marginTop: 10,
    marginBottom: 10,
    paddingTop:5,
    paddingBottom:5,
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
  },
  headerTabs3selected:{
    width: width * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#0091FF',
    borderWidth: 1,
    position: 'relative',
    top: 0,
    marginTop: 10,
    marginBottom: 10,
    paddingTop:5,
    paddingBottom:5,
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: '#0091FF'
  },


//------------------ROI Screen-------------------//

  header: {
    flex:2,
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 0.5,
    paddingTop: 10,
    paddingBottom: 10,
  },
  roi: {
    flex:1,
    alignItems: 'center',
    flexDirection: 'row'
  },
  roiheadervalues: {
    flex:1,
    flexDirection: 'row',
    position: 'absolute',
    width: 400,
    height: 100,
    marginTop: 220
  },
  info:{
    flex:3,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#D3D3D3'
  },
  infoText: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold'
  },
  roiText: {
    fontSize: 50,
    //fontWeight: 'bold',
    color: '#348EF2'
  },

  textView: {
    position: 'absolute',
    top: 15,
    left: 15,
    width: 270,
    height: 270,
    alignItems: 'center',
    justifyContent: 'center'
  },

  text: {
    fontSize: 20,
  },
  headerTabs1:{
    flex:3,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#0091FF',
    borderWidth: 1,
    position: 'relative',
  },

//------------------Mortgage Screen-------------------//
  
  headerValues: {
    flex:1,
    flexDirection: 'row'
  },
  mortgage: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mortgageText: {
    fontSize: 40,
    //fontWeight: 'bold',

  },

//------------------Fix&Flip Screen-------------------//

  headerFixNFlip: {
    flex:3,
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
    borderBottomColor: '#348EF2',
    paddingTop: 10,
  },
  fnfheaderval1: {
    flex:1,
    flexDirection: 'row',
    position: 'absolute',
    width: 400,
    height: 110,
    marginTop: 200,
  },
  fnfheaderval2: {
    flex:1,
    flexDirection: 'row',
    position: 'relative',
    width: 400,
    height: 100,
  },
  fnfinfo:{
    flex:3,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#D3D3D3'
  },
  infoTextFixNFlip: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  subTextFixNFlip: {
    color: '#8a8a8a'
  },

////////////////////////////////////////////////////////



  body: {
    flex:8,
    //backgroundColor: '#FFFBF8'
  },
  headerRow: {
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10
  
  }, 
  headerRowText: {
    color: '#348EF2',
    fontSize: 20,
    fontWeight: 'bold',
  },

  row: {
    flex:1,
    flexDirection: 'row',
    marginBottom: 30,
    paddingBottom: 0
  },

  caption: {
    marginLeft: 22,
    flex:3,
    flexDirection: 'row',
    paddingBottom: 0,
    marginBottom: 10,
    marginTop: 10
    //alignItems: 'flex-end'
  },
  captionText: {
    fontSize: 16,
    paddingBottom: 0
  },
  values: {
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
  dollaSign: {
    marginLeft: 20,
    flex:0.5,
    borderColor: '#D3D3D3',
    borderBottomWidth: 1,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    height: 40,
    fontSize: 20,

    paddingLeft: 5,
    textAlign: 'left',
    //backgroundColor: '#F7F7F5'
  },
  percentPlace: {
    flex: 2.5,
    marginRight: 10,
    paddingRight: 5
  },
  percentValue: {
    flex: 2,
    borderColor: '#D3D3D3',
    borderBottomWidth: 1,
    height: 40,
    fontSize: 20, 
    textAlign: 'right',
    paddingRight: 5
  },
  percentSign: {
    flex: 0.5,
    borderColor: '#D3D3D3',
    borderBottomWidth: 1,
    height: 40,
    fontSize: 20,
    marginRight: 10,
    paddingRight: 5
  },

  extra:{
    flex:2,
    borderWidth: 1,
    textAlign: 'right',
    marginLeft: 5,
    marginRight: 10,
    height: 35,
  },
  submitButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    //padding: 10,
    margin: 15,
    marginLeft: 40,
    marginRight: 40,
    height: 35,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#348EF2'
  },
  submitButtonText:{
    color: '#348EF2',
    fontSize: 15,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderColor: '#0091FF',
    borderWidth: 1,
    top: 0,
    borderRadius: 4,
    right: 10, 
    marginTop: 15 
  },
  submitButton2: {
    marginRight: 40,
    marginLeft: 40,
    margin: 15,
    borderColor: '#D3D3D3',
    height: 35,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 18,
    paddingRight: 10,
    backgroundColor: 'rgb(65,147,237)',
    justifyContent:'center', 
    alignItems:'center'
   },
   submitButtonText2:{
      color: 'white',
   },


  TouchableOpacityStyle:
  {
      padding: 20,
      backgroundColor: '#00BCD4',
      marginBottom: 30
  },

  TouchableOpacityTitleText:
  {
      textAlign: 'center',
      color: '#fff',
      fontSize: 20
  },

  ExpandViewInsideText:
  {
      fontSize: 16,
      color: '#000',
      padding: 12
  },

  ROIViewStyle: {backgroundColor: '#4BD964', marginTop: 15, marginBottom: 10, width: 110,height: 40, justifyContent: 'center', alignItems: 'center', padding: 7,borderRadius: 12},

  ROITextStyle: {color: '#fff', fontSize: 17},

});

export default styles;