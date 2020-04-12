import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { movieAPI } from "../api";


export default ({ navigation }) => {
    const [movies, setMovies] = useState({
        result: [],
        error: null
    });
    const getData = async () => {
        const [result, error] = await movieAPI.discover();
        setMovies({
            result,
            error
        })
    }

    useEffect(() => {
        getData();
    }, [])

    return <View>
        <Text>{movies.result.length}</Text>
    </View>
};