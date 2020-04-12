import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { movieAPI } from "../api";

export default ({ navigation }) => {
    const [movies, setMovies] = useState({
        nowPlaying: [],
        popular: [],
        upcoming: [],
        nowPlayingError: null,
        popularError: null,
        upcomingError: null
    });
    const getData = async () => {
        const [nowPlaying, nowPlayingError] = await movieAPI.nowPlaying();
        const [popular, popularError] = await movieAPI.popular();
        const [upcoming, upcomingError] = await movieAPI.upcoming();

        setMovies({
            nowPlaying,
            popular,
            upcoming,
            nowPlayingError,
            popularError,
            upcomingError
        })
    };
    useEffect(() => {
        getData();
    }, []);
    return <View style={{ flex: 1, backgroundColor: "black" }}>
        <Text style={{ color: "white" }}>{movies.nowPlaying ?.length}</Text>
        <Button
            onPress={() => navigation.navigate("Detail")}
            title="Go to Detail"
        />
    </View>
};