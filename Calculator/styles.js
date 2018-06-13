import {
  View,
    StyleSheet
} from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  



//------------------ROI Screen-------------------//

  header: {
    flex:2,
    backgroundColor: '#EFE9F4',
    alignItems: 'center',
    //justifyContent: 'center',
    borderBottomColor: '#348EF2',
    borderBottomWidth: 0.5,
    paddingTop: 10,
    paddingBottom: 10,
  },
  roi: {
    flex:1,
    alignItems: 'center',
    flexDirection: 'row'
  },
  otherStuff: {
    flex:1,
    flexDirection: 'row',
    position: 'absolute',
    width: 400,
    height: 500,
  },
  otherStuffs: {
    flex:1,
    flexDirection: 'row',
    position: 'absolute',
    width: 400,
    height: 700,
  },
  info:{
    flex:3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoText: {
    fontSize: 30
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
    justifyContent: 'center',
  },

  text: {
    fontSize: 20,
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
    backgroundColor: '#EFE9F4',
    alignItems: 'center',
    //justifyContent: 'center',
    borderBottomColor: '#348EF2',
    borderBottomWidth: 0.5,
    paddingTop: 10,
    paddingBottom: 80,
  },
  infoTextFixNFlip: {
    fontSize: 25
  },

////////////////////////////////////////////////////////



  body: {
    flex:8,
    //backgroundColor: '#FFFBF8'
  },
  headerRow: {
    height: 32,
    backgroundColor: '#348EF2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,

  },
  headerRowText: {
    color: 'white',
    fontSize: 18
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
    fontSize: 20
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
  }

});

export default styles;