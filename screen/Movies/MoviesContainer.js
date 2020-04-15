import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { movieAPI } from "../../api";
import MoviesPresenter from "./MoviesPresenter";

export default ({ navigation }) => {
    const [refreshing, setRefresing] = useState(false);
    const [movies, setMovies] = useState({
        loading: true,
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
            loading: false,
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

    return <MoviesPresenter refreshFn={getData} {...movies} />;
};