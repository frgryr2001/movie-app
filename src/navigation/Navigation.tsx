import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen, DetailScreen} from '../screens';

import {RootStackParamListDetailScreen} from '../components';

export type RootStackParamList = {
  HomeScreen: undefined;
} & RootStackParamListDetailScreen;

const Stack = createStackNavigator<RootStackParamList>();
export const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
    </Stack.Navigator>
  );
};
