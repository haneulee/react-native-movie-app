import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Home from '../screen/Home';
import Detail from '../screen/Detail';

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}></Stack.Screen>
        <Stack.Screen name="Detail" component={Detail}></Stack.Screen>
    </Stack.Navigator>
)