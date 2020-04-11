import React, { useLayoutEffect } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from '../screen/Movies'
import Search from '../screen/Search'
import Favs from '../screen/Favs'
import Tv from '../screen/Tv'

const Tabs = createBottomTabNavigator();

const getHeaderName = (route) => route ?.state ?.routeNames[route.state.index] || "Movies";

export default ({ navigation, route }) => {
    useLayoutEffect(() => {
        // console.log(route)
        navigation.setOptions({
            title: getHeaderName(route)
        });
    }, [route]);

    return (<Tabs.Navigator>
        <Tabs.Screen name='Movies' component={Movies}></Tabs.Screen>
        <Tabs.Screen name='Favourites' component={Favs}></Tabs.Screen>
        <Tabs.Screen name='Search' component={Search}></Tabs.Screen>
        <Tabs.Screen name='TV' component={Tv}></Tabs.Screen>
    </Tabs.Navigator>)
}