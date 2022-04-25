import React, { useEffect } from "react";
import { Dimmer, Grid, Loader } from "semantic-ui-react";
import "./Explore.scss";
import { GET_RECOMMENDED_MOVIES } from "../../gql/movie";
import { useQuery } from "@apollo/client";
import Movies from "../../components/Movies";

import { useMediaQuery } from "react-responsive";

export default function Home() {
  const isMovil = useMediaQuery({ query: "(max-width: 600px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 601px) and (max-width: 1099px)",
  });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1100px)",
  });

  //QUERY DE POST RECOMENDADOS
  const { data, loading, refetch } = useQuery(GET_RECOMMENDED_MOVIES);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(
    () => {
      // startPolling(5000);
      // return () => {
      //   stopPolling();
      // };
    },
    [
      // startPolling, stopPolling
    ]
  );
  if (loading)
    return (
      <Dimmer
        active
        style={{
          backgroundColor: "rgba(0,0, 0, 0)",
        }}
      >
        <Loader size="huge" />
      </Dimmer>
    );
  if (data === undefined) return null;
  const { getRecommendedMovies } = data;

  return (
    <>
      {isDesktopOrLaptop && (
        <Grid className="explore">
          <Grid.Column className="explore__left" width={16}>
            <Movies
              refetch={refetch}
              getMovies={getRecommendedMovies}
              recomendations={true}
            />
          </Grid.Column>
        </Grid>
      )}

      {isTablet && (
        <Grid className="explore">
          <Grid.Column className="explore__left" width={16}>
            <Movies
              refetch={refetch}
              getMovies={getRecommendedMovies}
              recomendations={true}
            />
          </Grid.Column>
        </Grid>
      )}

      {isMovil && (
        <Grid className="explore-movil">
          <Grid.Row>
            <Movies
              refetch={refetch}
              getMovies={getRecommendedMovies}
              recomendations={true}
            />
          </Grid.Row>
        </Grid>
      )}
    </>
  );
}
