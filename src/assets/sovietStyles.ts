/**
 * This is the stylesheet for the entire application, which uses mainly Vanilla CSS but also a little bit of JS for certain specific use cases.
 */
import { Dimensions } from "react-native";

const sovietRed = '#A42020';
const sovietRedTranslucent = 'rgba(164, 32, 32, 0.5)';
const sovietOrange = '#D37915';
const sovietMustard = '#F8B62C';
const sovietYellow = '#FDD406';
const sovietBlack = '#000000';
const sovietLightGreyTranslucent = 'rgba(230, 230, 230, 0.65)';
const sovietLightGrey = '#505050';
const sovietWhite = '#FFFFFF';
const sovietWhiteTranslucent = 'rgba(255, 255, 255, 0.8)';
const sovietBlue = '#0000FF';

export const sovietColours = {
  sovietRed,
  sovietRedTranslucent,
  sovietOrange,
  sovietMustard,
  sovietYellow,
  sovietBlack,
  sovietLightGreyTranslucent,
  sovietWhite,
  sovietWhiteTranslucent,
  sovietLightGrey,
  sovietBlue,
};

export const sovietButtonStyles = {

  secondaryMenuButton: {
    backgroundColor: sovietColours.sovietRed,
    padding: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
    display: 'flex' as 'flex',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    borderColor: sovietColours.sovietMustard,
    borderWidth: 2,
  },

  smallButton: {
    backgroundColor: sovietColours.sovietRed,
    padding: 10,
    borderRadius: 10,
    margin: 2,
    paddingHorizontal: 20,
    display: 'flex' as 'flex',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    borderColor: sovietColours.sovietMustard,
    borderWidth: 2,
  },

  wideButton: {
    marginVertical: 10,
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: sovietRed,
    borderRadius: 10,
    borderColor: sovietMustard,
    borderWidth: 2,
    width: '80%' as '80%',
    justifyContent: 'center' as 'center',
  },

  bottomSheetButton: {
    backgroundColor: sovietRed,
    borderRadius: 10,
    borderColor: sovietMustard,
    borderWidth: 2,
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    padding: 20,
    width: '50%' as '50%'
  },

  LoginCreateAccountNavButton: {
    borderColor: sovietRed,
    borderBottomWidth: 0,
    borderTopWidth: 1,
    paddingTop: 10,
    marginTop: 5,
    width: '80%' as '80%',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
  },

  MapLayerToggleButtonStyle: {
    position: 'absolute' as 'absolute',
    top: 85,
    left: 10,
    backgroundColor: sovietWhiteTranslucent,
    height: 40,
    width: 40,
    borderRadius: 20,
    zIndex: 10,
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
  },

  MapLocationButtonStyle: {
    position: 'absolute' as 'absolute',
    top: 85,
    left: 10,
    backgroundColor: sovietWhiteTranslucent,
    height: 40,
    width: 40,
    borderRadius: 20,
    zIndex: 10,
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
  },

  BluetoothContainerStyle: {
    flexDirection: 'row' as 'row',
    justifyContent: 'space-between' as 'space-between',
    margin: 5,
  }

};

export const sovietTextStyles = {

  flightInfoPanelTextKremlin: {
    fontFamily: 'kremlin',
    fontSize: 25,
    color: sovietColours.sovietBlack,
    textAlign: 'center' as 'center',
    marginTop: 5,
  },

  flightInfoPanelTextSmall: {
    fontFamily: 'Courier New',
    fontWeight: '400' as '400',
    fontSize: 25,
    color: sovietColours.sovietBlack,
  },

  SmallRedSovietText: {
    color: sovietColours.sovietRed,
    fontFamily: 'kremlin',
    fontSize: 15,
  },

  smallButtonText: {
    fontFamily: 'kremlin',
    color: sovietColours.sovietMustard,
    fontSize: 18,
    textAlign: 'center' as 'center',
    justifyContent: 'center' as 'center',
  },

  fullWidthButtonText: {
    fontFamily: 'kremlin',
    fontSize: 25,
    color: sovietColours.sovietMustard,
    textAlign: 'center' as 'center',
    marginTop: 0,
  },
  smallDeviceNameText: {
    fontFamily: 'Courier New',
    fontSize: 20,
    textAlign: 'center' as 'center',
    justifyContent: 'center' as 'center',
    color: sovietColours.sovietMustard,
  },

  pairedDevicesText: {
    fontFamily: 'kremlin',
    fontSize: 12,
    color: sovietBlack,
  },

  bottomTrayIconText: {
    fontFamily: 'Courier New',
    color: 'white' as 'white',
    fontWeight: 'bold' as 'bold',
    fontSize: 18
  },

  statsBottomPanelText: {
    fontFamily: 'Courier New',
    fontWeight: '400' as '400',
    fontSize: 25,
    color: sovietColours.sovietBlack,
  },

  statsTopPanelText: {
    fontFamily: 'kremlin',
    fontSize: 15,
    color: sovietBlack,
    textAlign: 'center' as 'center',
    marginTop: 5,
  },

  accountInputText: {
    backgroundColor: sovietRedTranslucent,
    width: '100%' as '100%',
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    paddingLeft: 10,
  }

};

export const sovietFragmentStyles = {

  dropdownStyle: {
    position: 'absolute' as 'absolute',
    top: 35,
    left: 60,
    backgroundColor: sovietWhite,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    width: 150,
    zIndex: 1,
  },

  dropdownMenuIconStyle: {
    position: 'absolute' as 'absolute',
    top: 35,
    left: 10,
    backgroundColor: sovietColours.sovietWhiteTranslucent,
    height: 40,
    width: 40,
    borderRadius: 20,
    zIndex: 10,
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
  },

  flightInfoPanel: {
    backgroundColor: sovietColours.sovietLightGreyTranslucent,
    height: '25%' as '25%',
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 10,
  },

  connectionGraphic: {
    backgroundColor: sovietColours.sovietLightGreyTranslucent,
    height: '35%' as '35%',
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 10,
  },

  deviceItem: {
    backgroundColor: sovietColours.sovietRed,
    padding: 10,
    borderRadius: 10,
    margin: 2,
    width: '50%' as '50%',
  },

  pairedDevicesRow: {
    flexDirection: 'row' as 'row',
    justifyContent: 'space-between' as 'space-between',
    marginBottom: 3,
    padding: 2,
    paddingHorizontal: 5,
    backgroundColor: sovietColours.sovietLightGreyTranslucent,
  },

  backgroundImage: {
    flex: 1,
    width: '100%' as '100%',
    height: (Dimensions.get('window').height) - 40,
  },

  bottomTrayIcon: {
    flexDirection: 'row' as 'row',
    alignItems: 'center' as 'center',
    gap: 5,
    alignSelf: 'flex-start' as 'flex-start',
    width: '50%' as '50%',
  },
  simpleCentre: {
    flex: 1,
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
  },

  statsNarrowBox: {
    flex: 1,
    flexDirection: 'column' as 'column',
    backgroundColor: sovietColours.sovietLightGreyTranslucent,
    marginHorizontal: 5,
    borderRadius: 10,
    justifyContent: 'space-between' as 'space-between',
    alignItems: 'center' as 'center',
  },

  statsWideBoxNoBorder: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    justifyContent: 'flex-end' as 'flex-end',
    alignItems: 'center' as 'center',
  },

  statsBottomPanel: {
    backgroundColor: sovietColours.sovietLightGreyTranslucent,
    height: '90%' as '90%',
    borderRadius: 10,
    margin: 5,
  },

  statsBottomPanelColumn: {
    flex: 1,
    flexDirection: 'column' as 'column',
    gap: 5,
    justifyContent: 'flex-start' as 'flex-start',
  },

  statsPanelRow: {
    flex: 1,
    flexDirection: 'row' as 'row',
    margin: 5
  },

  statsBoxRow: {
    flex: 1,
    flexDirection: 'row' as 'row',
    marginHorizontal: 5,
  },

  blackMarginBottom: {
    marginHorizontal: 5,
    borderBottomColor: sovietColours.sovietBlack,
    borderBottomWidth: 2
  },

  simpleFlex: {
    flex: 1,
  },

  statsTopBoxLowerHalf: {
    margin: 5,
    width: '90%' as '90%',
    borderTopColor: sovietColours.sovietBlack,
    borderTopWidth: 2,
    justifyContent: 'flex-end' as 'flex-end',
    alignItems: 'center' as 'center',
  },

  SixtyPercentHeightContainer: {
    height: '60%' as '60%',
    marginTop: 5,
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
  },

  FortyPercentHeightContainer: {
    height: '40%' as '40%',
    margin: 5,
  },

  statsBottomPanelItem: {
    flex: 1,
    justifyContent: 'center' as 'center',
  },

  accountManagementBox: {
    backgroundColor: sovietColours.sovietLightGreyTranslucent,
    padding: 20,
    margin: 20,
    borderRadius: 10,
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
  },

  PrimaryButtonContainer: {
    flex: 1,
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    marginTop: 5,
    marginHorizontal: 30
  },

  SovietModalStyle:{  
    backgroundColor: sovietColours.sovietRed,
    padding: 20,
    margin: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: sovietColours.sovietMustard,
    width: '75%' as '75%',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    shadowColor: sovietColours.sovietBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  SovietModalTextInputStyle: {
    backgroundColor: sovietColours.sovietLightGreyTranslucent,
    width: '100%' as '100%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: sovietColours.sovietMustard,
    marginVertical: 5,
  },


}

// using this for the header
export const dynamicConnectionText = (color: string) => ({
  fontFamily: 'kremlin',
  fontSize: 40,
  color: color,
  textAlign: 'center' as 'center',
});