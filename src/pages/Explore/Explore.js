import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import "./Explore.scss";
import { GET_RECOMMENDED_POSTS } from "../../gql/post";
import { useQuery } from "@apollo/client";
import Posts from "../../components/Posts";

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
  const { data, loading, startPolling, stopPolling } = useQuery(
    GET_RECOMMENDED_POSTS
  );

  useEffect(() => {
    startPolling(3000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);
  if (loading) return null;
  if (data === undefined) return null;
  const { getRecommendedPosts } = data;

  return (
    <>
      {isDesktopOrLaptop && (
        <Grid className="home">
          <Grid.Column className="home__left" width={16}>
            <Posts getPosts={getRecommendedPosts} recomendations={true} />
          </Grid.Column>
        </Grid>
      )}

      {isTablet && (
        <Grid className="home">
          <Grid.Column className="home__left" width={16}>
            <Posts getPosts={getRecommendedPosts} recomendations={true} />
          </Grid.Column>
        </Grid>
      )}

      {isMovil && (
        <Grid className="home-movil">
          <Grid.Row>
            <Posts getPosts={getRecommendedPosts} recomendations={true} />
          </Grid.Row>
        </Grid>
      )}
    </>
  );
}
