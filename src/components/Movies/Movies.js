import React from "react";
import "./Movie.scss";
import { map } from "lodash";
import { Grid, Dimmer, Loader, Button, Icon } from "semantic-ui-react";
import PreviewMovie from "./PreviewMovie";

import { useMediaQuery } from "react-responsive";

export default function Movies({
  getMovies,
  recomendations,
  refetch,
  contentBased,
  idsMoviesContent,
  loadingContentBased,
  perfil,
  setShowModal,
}) {
  const isMovil = useMediaQuery({ query: "(max-width: 600px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 601px) and (max-width: 1099px)",
  });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1100px)",
  });

  return (
    <div className="movies">
      {recomendations ? (
        <h1
          style={{
            marginBottom: "30px",
            marginTop: "30px",
            color: "aliceblue",
          }}
        >
          A otros usuarios parecidos a ti les gustan:
        </h1>
      ) : contentBased ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Icon
            name="info circle"
            color="teal"
            size="large"
            style={{ cursor: perfil.length > 0 && "pointer" }}
            icon
            disabled={perfil.length === 0}
            onClick={() => setShowModal(true)}
          />

          <h1
            style={{
              marginBottom: "30px",
              marginTop: "30px",
              color: "aliceblue",
            }}
          >
            Te recomendamos (Cortesía de Marco):
          </h1>
        </div>
      ) : (
        <h1 style={{ color: "aliceblue" }}>Películas favoritas</h1>
      )}
      {getMovies && getMovies.length > 0 ? (
        <>
          {isMovil && (
            <Grid columns={1} className="grid-movies" style={{ marginLeft: 0 }}>
              {map(getMovies, (movie, index) => (
                <Grid.Column key={index} className="movie-movil">
                  <PreviewMovie
                    refetch={refetch}
                    movie={movie}
                    isFavorite={!recomendations}
                  />
                </Grid.Column>
              ))}
            </Grid>
          )}

          {isTablet && (
            <Grid columns={recomendations ? 2 : 1} style={{ marginLeft: 0 }}>
              {map(getMovies, (movie, index) => (
                <Grid.Column key={index} className="movie-margin">
                  <PreviewMovie
                    refetch={refetch}
                    movie={movie}
                    isFavorite={!recomendations}
                  />
                </Grid.Column>
              ))}
            </Grid>
          )}

          {isDesktopOrLaptop && (
            <Grid columns={2} style={{ marginLeft: 0 }}>
              {map(getMovies, (movie, index) => (
                <Grid.Column key={index} className="movie-margin">
                  <PreviewMovie
                    refetch={refetch}
                    movie={movie}
                    isFavorite={!recomendations}
                  />
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
          ) : contentBased ? (
            <>
              {loadingContentBased ? (
                <Dimmer
                  active
                  style={{
                    backgroundColor: "rgba(0,0, 0, 0)",
                    alignItems: "start",
                  }}
                >
                  <Loader size="huge" style={{ top: "25%" }} />
                </Dimmer>
              ) : (
                <>
                  {idsMoviesContent.length === 0 && (
                    <h1 style={{ marginTop: "30px", color: "aliceblue" }}>
                      No hay sugerencias aún
                    </h1>
                  )}
                </>
              )}
            </>
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
