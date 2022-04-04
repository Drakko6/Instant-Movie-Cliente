import React from "react";
import "./Post.scss";
import { map } from "lodash";
import { Grid } from "semantic-ui-react";
import PreviewPost from "./PreviewPost";

import { useMediaQuery } from "react-responsive";

export default function Posts({ getPosts, recomendations }) {
  const isMovil = useMediaQuery({ query: "(max-width: 600px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 601px) and (max-width: 1099px)",
  });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1100px)",
  });

  return (
    <div className="posts">
      {getPosts && getPosts.length > 0 ? (
        <>
          {recomendations ? (
            <h1 style={{ marginBottom: "50px" }}>Conoce más</h1>
          ) : (
            <h1>Películas favoritas</h1>
            // TODO: Hacer que se rendericen a los que hemos dado follow
          )}

          {isMovil && (
            <Grid columns={1} className="grid-posts">
              {map(getPosts, (post, index) => (
                <Grid.Column key={index} className="post-movil">
                  <PreviewPost post={post} />
                </Grid.Column>
              ))}
            </Grid>
          )}

          {isTablet && (
            <Grid columns={2}>
              {map(getPosts, (post, index) => (
                <Grid.Column key={index} className="post-margin">
                  <PreviewPost post={post} />
                </Grid.Column>
              ))}
            </Grid>
          )}

          {isDesktopOrLaptop && (
            <Grid columns={4}>
              {map(getPosts, (post, index) => (
                <Grid.Column key={index} className="post-margin">
                  <PreviewPost post={post} />
                </Grid.Column>
              ))}
            </Grid>
          )}
        </>
      ) : (
        <h2>No hay sugerencias aún</h2>
      )}
    </div>
  );
}
