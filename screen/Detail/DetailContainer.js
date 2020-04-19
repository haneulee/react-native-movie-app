import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { movieAPI, tvAPI } from "../../api";
import DetailPresenter from "./DetailPresenter";
import * as WebBrowser from "expo-web-browser";

export default ({ navigation, route: {
    params: { isTv, id, title, backgroundImage, poster, votes, overview }
} }) => {
    // const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState({
        loading: true,
        result: {
            title,
            backgroundImage,
            poster,
            overview,
            votes,
            videos: {
                results: []
            }
        }
    });
    const getData = async () => {
        const [getDetail, getDetailError] = isTv ? await tvAPI.show(id) : await movieAPI.movie(id);

        setDetail({
            loading: false,
            result: {
                ...getDetail,
                title: getDetail.title || getDetail.name,
                backgroundImage: getDetail.backdrop_path,
                poster: getDetail.poster_path,
                overview: getDetail.overview,
                votes: getDetail.vote_average
            }
        })
    };

    useEffect(() => {
        getData();
    }, [id]);

    React.useLayoutEffect(() => {
        navigation.setOptions({ title });
    });

    const openBrowser = async url => {
        await WebBrowser.openBrowserAsync(url);
    };

    return <DetailPresenter openBrowser={openBrowser} {...detail} />;
};