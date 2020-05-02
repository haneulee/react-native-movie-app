import React, { useState, useEffect } from "react";
import CameraPresenter from "./CameraPresenter";
import { movieAPI } from "../../api";

export default () => {
    const [movies, setMovies] = useState({
        results: [],
        error: null
    });
    const getData = async () => {
        const [results, error] = await movieAPI.discover();
        setMovies({
            results,
            error
        });
    };
    useEffect(() => {
        getData();
    }, []);

    return <CameraPresenter {...movies} />;
};