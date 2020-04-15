import React from "react";
import styled from "styled-components/native";
import { ActivityIndicator, View } from "react-native";
import Vertical from "../../components/Vertical"
import Horizontal from "../../components/Horizontal";
import ScrollContainer from "../../components/ScrollContainer";
import HorizontalSlider from "../../components/HorizontalSlider";
import List from "../../components/List";
import Banner from "../../components/Banner";
import Slide from "../../components/Movies/Slide";

const Container = styled.View``;

export default ({ refreshFn, loading, nowPlaying, popular, upcoming }) => (
    <ScrollContainer refreshFn={refreshFn} loading={loading}>
        <>
            <Banner>
                {nowPlaying.map(movie => (
                    <Slide
                        key={movie.id}
                        id={movie.id}
                        title={movie.original_title}
                        overview={movie.overview}
                        votes={movie.vote_average}
                        backgroundImage={movie.backdrop_path}
                        poster={movie.poster_path}
                    />
                ))}
            </Banner>
            <Container>
                <HorizontalSlider title={"Popular Movies"}>
                    {popular.map(movie => (
                        <Vertical
                            id={movie.id}
                            key={movie.id}
                            poster={movie.poster_path}
                            title={movie.title}
                            votes={movie.vote_average}
                        />
                    ))}
                </HorizontalSlider>
                <List title="Coming Soon">
                    {upcoming.map(movie => (
                        <Horizontal
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            votes={movie.vote_average}
                            poster={movie.poster_path}
                            overview={movie.overview}
                            releaseDate={movie.release_date}
                        />
                    ))}
                </List>
            </Container>
        </>
    </ScrollContainer >
);