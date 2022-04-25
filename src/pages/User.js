import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_FAVORITES } from "../gql/favorites";
import { size } from "lodash";
import { useParams } from "react-router-dom";
import Profile from "../components/User/Profile";
import Movies from "../components/Movies";
import { Grid } from "semantic-ui-react";
import Lists from "../components/Lists";
import { GET_LISTS_WITH_MOVIE_INFO } from "../gql/lists";
import "./User.scss";

export default function User() {
  const { username } = useParams();

  const { data, loading, startPolling, stopPolling } = useQuery(GET_FAVORITES, {
    variables: { username },
  });

  const { data: dataLists, loading: loadingLists } = useQuery(
    GET_LISTS_WITH_MOVIE_INFO,
    {
      variables: { username },
    }
  );

  useEffect(() => {
    //  NOTA: ESTO CONSUME RECURSOS DEL SERVIDOR
    startPolling(1500);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading || loadingLists) return null;
  if (data === undefined || dataLists === undefined) return null;
  const { getFavorites } = data;
  const { getListsWithMovieInfo } = dataLists;

  return (
    <div className="user-page">
      <Profile username={username} totalFavorites={getFavorites.length} />

      <Grid>
        <Grid.Column width={8}>
          <Movies getMovies={getFavorites} />
        </Grid.Column>
        <Grid.Column width={8}>
          <Lists lists={getListsWithMovieInfo} />
        </Grid.Column>
      </Grid>
    </div>
  );
}
