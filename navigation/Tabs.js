import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from '../screen/Movies'
import Search from '../screen/Search'
import Favs from '../screen/Favs'
import Tv from '../screen/Tv'

const Tabs = createBottomTabNavigator();

export default () => (
    <Tabs.Navigator>
        <Tabs.Screen name='Movies' component={Movies}></Tabs.Screen>
        <Tabs.Screen name='Favs' component={Favs}></Tabs.Screen>
        <Tabs.Screen name='Search' component={Search}></Tabs.Screen>
        <Tabs.Screen name='Tv' component={Tv}></Tabs.Screen>
    </Tabs.Navigator>
)