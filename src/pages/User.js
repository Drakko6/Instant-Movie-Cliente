import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_FAVORITES } from "../gql/favorites";
import { size } from "lodash";
import { useParams } from "react-router-dom";
import Profile from "../components/User/Profile";
import Movies from "../components/Movies";

export default function User() {
  const { username } = useParams();

  const { data, loading, startPolling, stopPolling } = useQuery(GET_FAVORITES, {
    variables: { username },
  });

  useEffect(() => {
    //  NOTA: ESTO CONSUME RECURSOS DEL SERVIDOR
    startPolling(1500);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return null;
  if (data === undefined) return null;
  const { getFavorites } = data;

  return (
    <>
      <Profile username={username} totalFavorites={getFavorites.length} />
      <Movies getMovies={getFavorites} />
    </>
  );
}
