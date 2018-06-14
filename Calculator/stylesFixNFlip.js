import {
  View,
    StyleSheet
} from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  headerTabs1:{
    flex:3,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#0091FF',
    borderWidth: 1,
    position: 'relative',
    top: 0,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    paddingTop:5,
    paddingBottom:5,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
  },
  headerTabs2:{
    flex:3,
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
  headerTabs3:{
    flex:3,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#0091FF',
    borderWidth: 1,
    position: 'relative',
    top: 0,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    paddingTop:5,
    paddingBottom:5,
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
  },
  initialHeaderText: {
    fontSize: 20,
    color: 'black'
  },
  initialHeader: {
    flex:2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10
  },
  initialBody: {
    flex:8,
    justifyContent: 'center',
  },
  initialPriceCaption: {
    marginLeft: 20,
    flex:3,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  initialPriceRow: {
    flex:1,
    flexDirection: 'row',

  },
  initialRentCaption: {
    marginLeft: 20,
    flex:1,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  initialRentRow: {
    flex:5,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  initialDollaSign: {
    marginLeft: 20,
    flex:0.5,
    borderColor: '#348EF2',
    borderBottomWidth: 2,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    height: 50,
    fontSize: 25,
    paddingTop: 10,
    paddingLeft: 5,
    textAlign: 'left',
  },
  initialValues: {
    marginRight: 20,
    flex:4.5,
    borderColor: '#348EF2',
    borderBottomWidth: 2,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    height: 50,
    fontSize: 25,
    paddingRight: 10,
    paddingTop: 10,
    textAlign: 'right',

  },



/////////////////////////////////////////////////////////

  header: {
    flex:2,
    backgroundColor: '#EFE9F4',
    alignItems: 'center',
    //justifyContent: 'center',
    borderBottomColor: '#348EF2',
    borderBottomWidth: 0.5,
    paddingTop: 10,
    //margin: 5
  },
  roi: {
    flex:1,
    alignItems: 'center',
    flexDirection: 'row'
  },
  otherStuff: {
    flex:1,
    flexDirection: 'row'
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


  ///////////////////////////////////////////////////////

  priceRentCaption: {
    marginLeft: 22,
    marginTop: 10,
    flex:1,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  priceRentCaptionText: {
    fontSize: 16,
  },
  priceRow: {
    flex:1,
    flexDirection: 'row',
    marginBottom: 20

  },
  rentRow: {
    flex:1,
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 20,
    //borderColor: '#3A405A',
    //borderBottomWidth: 1,

  },
  priceRentDollaSign: {
    marginLeft: 20,
    flex:0.5,
    borderColor: '#348EF2',
    borderBottomWidth: 1,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    height: 40,
    fontSize: 20,
    paddingLeft: 5,
    textAlign: 'left',
    //backgroundColor: '#F7F7F5'
  },
  priceRentValues: {
    marginRight: 20,
    flex:4.5,
    borderColor: '#348EF2',
    borderBottomWidth: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    height: 40,
    fontSize: 20,
    paddingRight: 10,
    textAlign: 'right',
    //backgroundColor: '#F7F7F5'
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
    marginTop: 10
  },
  headerRowText: {
    color: 'white',
    fontSize: 18
  },

  row: {
    flex:1,
    flexDirection: 'row',
    marginBottom: 50,
    paddingBottom: 20
  },

  caption: {
    marginLeft: 22,
    flex:3,
    flexDirection: 'row',
    paddingBottom: 20,
    //alignItems: 'flex-end'
  },
  captionText: {
    fontSize: 16,
    paddingBottom: 20
  },
  values: {
    marginRight: 20,
    flex:4.5,
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
    fontSize: 15
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