import React from "react";
import ScrollContainer from "../../components/ScrollContainer";
import HorizontalSlider from "../../components/HorizontalSlider";
import Vertical from "../../components/Vertical";
import Horizontal from "../../components/Horizontal";
import styled from "styled-components/native";
import List from "../../components/List";
import Banner from "../../components/Banner";
import Slide from "../../components/Movies/Slide";

const Container = styled.View`
  margin-top: 30px;
`;

export default ({ loading, popular, topRated, today, thisWeek }) => (
    <ScrollContainer loading={loading}>
        <Container>
            <HorizontalSlider title="Popular Shows">
                {popular.map(show => (
                    <Vertical
                        id={show.id}
                        key={show.id}
                        poster={show.poster_path}
                        title={show.name}
                        votes={show.vote_average}
                    />
                ))}
            </HorizontalSlider>
            <Banner>
                {thisWeek.map(movie => (
                    <Slide
                        key={movie.id}
                        id={movie.id}
                        title={movie.original_name}
                        overview={movie.overview}
                        votes={movie.vote_average}
                        backgroundImage={movie.backdrop_path}
                        poster={movie.poster_path}
                    />
                ))}
            </Banner>
            <HorizontalSlider title="Top Rated">
                {topRated.map(show => (
                    <Vertical
                        id={show.id}
                        key={show.id}
                        poster={show.poster_path}
                        title={show.name}
                        votes={show.vote_average}
                    />
                ))}
            </HorizontalSlider>
            <List title="Airing Today">
                {today.map(show => (
                    <Horizontal
                        key={show.id}
                        id={show.id}
                        title={show.name}
                        poster={show.poster_path}
                        overview={show.overview}
                    />
                ))}
            </List>
        </Container>
    </ScrollContainer>
);