import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Detail from '../screen/Detail';
import Tabs from './Tabs';

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator>
        <Stack.Screen name="Tab" component={Tabs}></Stack.Screen>
        <Stack.Screen name="Detail" component={Detail}></Stack.Screen>
    </Stack.Navigator>
)