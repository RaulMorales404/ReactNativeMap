import 'react-native-gesture-handler';
import { enableLatestRenderer } from 'react-native-maps';
enableLatestRenderer();
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from './src/navigation/Navigation';
import { PermisionsProvider } from './src/context/PermissonsContex';


const AppContextPermissonsState = ({ children }: any) => {
  return <PermisionsProvider>
    {children}
  </PermisionsProvider>

}
const App = () => {
  return (

    <NavigationContainer>
      <AppContextPermissonsState>
        <Navigation />
      </AppContextPermissonsState>
    </NavigationContainer>



  )
}

export default App;