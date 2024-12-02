interface RootStackParamList {
  AccountScreen: undefined;
  BluetoothDevicesScreen: undefined;
  CreateAccountScreen: undefined;
  HomeScreen: undefined;
  LoadingScreen: undefined;
  LoginScreen: undefined;
  MapScreen: undefined;
  StatsScreen: undefined;
};

export interface CustomNavigationProps {
  navigate: (screen: keyof RootStackParamList) => void;
};