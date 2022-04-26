import { useQuery } from "@apollo/client";
import { map } from "lodash";
import React from "react";
import { Grid } from "semantic-ui-react";
import { GET_LISTS_WITH_MOVIE_INFO } from "../../gql/lists";
import useAuth from "../../hooks/useAuth";
import ListMovie from "../Lists/ListMovie";
import "./FollowedLists.scss";

export default function FollowedLists({ lists, refetchLists }) {
  const { auth } = useAuth();
  const { refetch: refetchMyLists } = useQuery(GET_LISTS_WITH_MOVIE_INFO, {
    variables: { username: auth.username },
  });

  return (
    <div className="followed-lists">
      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}
      >
        <h1 style={{ color: "aliceblue", textAlign: "center" }}>
          Listas de películas de personas seguidas
        </h1>
      </div>

      <Grid columns={3} style={{ marginLeft: 0 }}>
        {map(lists, (list) => (
          <Grid.Column key={list.id} className="movie-margin">
            <ListMovie
              key={list.id}
              list={list}
              refetchLists={refetchLists}
              refetchMyLists={refetchMyLists}
              editable={false}
            />
          </Grid.Column>
        ))}
      </Grid>
    </div>
  );
}
