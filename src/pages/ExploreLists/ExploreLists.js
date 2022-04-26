import React from "react";
import { Dimmer, Grid, Loader } from "semantic-ui-react";
import "./ExploreLists.scss";
import { useQuery } from "@apollo/client";

import { useMediaQuery } from "react-responsive";
import RandomLists from "../../components/RandomLists";
import { GET_RANDOM_LISTS } from "../../gql/lists";

export default function ExploreLists() {
  // const isMovil = useMediaQuery({ query: "(max-width: 600px)" });
  // const isTablet = useMediaQuery({
  //   query: "(min-width: 601px) and (max-width: 1099px)",
  // });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1100px)",
  });

  //QUERY DE LISTAS RANDOM
  const { data, loading, refetch: refetchLists } = useQuery(GET_RANDOM_LISTS);

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
  const { getRandomLists } = data;

  return (
    <>
      {isDesktopOrLaptop && (
        <Grid className="explore-lists">
          <Grid.Column className="explore-lists__left" width={16}>
            <RandomLists lists={getRandomLists} refetchLists={refetchLists} />
          </Grid.Column>
        </Grid>
      )}
    </>
  );
}
