import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from './screens/splash';
import Login from './screens/auth/login';
import Register from './screens/auth/register';
import Home from './screens/home';
import Profile from './screens/profile';
import ListUsers from './screens/listProfile';
import Assignment from './screens/assignment';
import {SocketProvider} from './public/context/SocketProvider';
import Success from './screens/success';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <SocketProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="splash"
            component={Splash}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="register"
            component={Register}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="profile"
            component={Profile}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="listUsers"
            component={ListUsers}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="assignment"
            component={Assignment}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="success"
            component={Success}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </SocketProvider>
    </NavigationContainer>
  );
};

export default Router;
