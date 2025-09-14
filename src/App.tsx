import React from 'react';
import { StatusBar } from 'react-native';
import { AppNavigator } from './navigation/AppNavigator';
import '../global.css';

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <AppNavigator />
    </>
  );
}

export default App;
