import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../screens/Home';
import Login from '../screens/Login';
import Permises from '../screens/Permises';
import { useContext } from 'react';
import { PermissionsContext } from '../context/PermissonsContex';
const Stack = createStackNavigator();

export const Navigation = () => {

  const { permissions } = useContext(PermissionsContext);

  if (permissions.locationStatus === 'unavailable') {
    return <Login />
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white'
        }
      }}
    >
      {
        permissions.locationStatus === "granted"
          ? <Stack.Screen name="Home" component={Home} />
          : <Stack.Screen name="Permisos" component={Permises} />
      }

    </Stack.Navigator >
  );
}

