import React, { useLayoutEffect } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screen/Movies/index";
import Search from '../screen/Search/index'
import Favs from '../screen/Favs/index'
import Tv from '../screen/Tv/index'
import Camera from '../screen/Camera/index'
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Tabs = createBottomTabNavigator();

const getHeaderName = (route) => route ?.state ?.routeNames[route.state.index] || "Movies";

export default ({ navigation, route }) => {
    useLayoutEffect(() => {
        const name = getHeaderName(route);
        // console.log(route)
        navigation.setOptions({
            title: name
        });
    }, [route]);

    return (
        <Tabs.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconName = Platform.OS === "ios" ? "ios-" : "md-";
                    if (route.name === "Movies") {
                        iconName += "film";
                    } else if (route.name === "TV") {
                        iconName += "tv";
                    } else if (route.name === "Search") {
                        iconName += "search";
                    } else if (route.name === "Discovery") {
                        iconName += "heart";
                    } else if (route.name === "Camera") {
                        iconName += "camera";
                    }
                    return (
                        <Ionicons
                            name={iconName}
                            color={focused ? "white" : "grey"}
                            size={26}
                        />
                    );
                }
            })}
            tabBarOptions={{
                showLabel: false,
                style: {
                    backgroundColor: "black",
                    borderTopColor: "black"
                }
            }}>
            <Tabs.Screen name='Movies' component={Movies}></Tabs.Screen>
            <Tabs.Screen name='TV' component={Tv}></Tabs.Screen>
            <Tabs.Screen name='Search' component={Search}></Tabs.Screen>
            <Tabs.Screen name='Discovery' component={Favs}></Tabs.Screen>
            <Tabs.Screen name='Camera' component={Camera}></Tabs.Screen>
        </Tabs.Navigator>)
}