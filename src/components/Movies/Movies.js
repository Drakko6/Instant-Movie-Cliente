import React from "react";
import "./Movie.scss";
import { map } from "lodash";
import { Grid } from "semantic-ui-react";
import PreviewMovie from "./PreviewMovie";

import { useMediaQuery } from "react-responsive";

export default function Movies({ getMovies, recomendations }) {
  const isMovil = useMediaQuery({ query: "(max-width: 600px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 601px) and (max-width: 1099px)",
  });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1100px)",
  });

  return (
    <div className="movies">
      {getMovies && getMovies.length > 0 ? (
        <>
          {recomendations ? (
            <h1 style={{ marginBottom: "50px", color: "aliceblue" }}>
              Conoce más
            </h1>
          ) : (
            <h1 style={{ color: "aliceblue" }}>Películas favoritas</h1>
          )}

          {isMovil && (
            <Grid columns={1} className="grid-movies">
              {map(getMovies, (movie, index) => (
                <Grid.Column key={index} className="movie-movil">
                  <PreviewMovie movie={movie} isFavorite={!recomendations} />
                </Grid.Column>
              ))}
            </Grid>
          )}

          {isTablet && (
            <Grid columns={2}>
              {map(getMovies, (movie, index) => (
                <Grid.Column key={index} className="movie-margin">
                  <PreviewMovie movie={movie} isFavorite={!recomendations} />
                </Grid.Column>
              ))}
            </Grid>
          )}

          {isDesktopOrLaptop && (
            <Grid columns={4}>
              {map(getMovies, (movie, index) => (
                <Grid.Column key={index} className="movie-margin">
                  <PreviewMovie movie={movie} isFavorite={!recomendations} />
                </Grid.Column>
              ))}
            </Grid>
          )}
        </>
      ) : (
        <>
          {recomendations ? (
            <h1 style={{ marginBottom: "50px", color: "aliceblue" }}>
              No hay sugerencias aún
            </h1>
          ) : (
            <h1 style={{ color: "aliceblue" }}>
              El usuario no tiene películas favoritas
            </h1>
          )}
        </>
      )}
    </div>
  );
}
