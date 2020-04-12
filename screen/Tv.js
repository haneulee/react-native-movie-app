import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { tvAPI } from "../api";


export default () => {
    const [shows, setShows] = useState({
      today: [],
      thisWeek: [],
      topRated: [],
      popular: [],
      todayError: null,
      thisWeekError: null,
      topRatedError: null,
      popularError: null
    });
    const getData = async () => {
      const [today, todayError] = await tvAPI.today();
      const [thisWeek, thisWeekError] = await tvAPI.thisWeek();
      const [topRated, topRatedError] = await tvAPI.topRated();
      const [popular, popularError] = await tvAPI.popular();
      setShows({
        today,
        thisWeek,
        topRated,
        popular,
        todayError,
        thisWeekError,
        topRatedError,
        popularError
      });
    };
    useEffect(() => {
      getData();
    }, []);
    return (
      <View>
        <Text>{shows.popular?.length}</Text>
      </View>
    );
  };