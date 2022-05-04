import React, { useState } from "react";
import { Button, Dimmer, Grid, Loader } from "semantic-ui-react";
import "./ExploreLists.scss";
import { useQuery } from "@apollo/client";

import { useMediaQuery } from "react-responsive";
import RandomLists from "../../components/RandomLists";
import { GET_RANDOM_LISTS } from "../../gql/lists";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import Chat from "../../components/Chat/Chat";

export default function ExploreLists() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1100px)",
  });

  const [showChat, setShowChat] = useState(false);

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
      <Grid className="explore-lists">
        <div
          style={{
            position: "absolute",
            right: -100,
            bottom: 10,
            zIndex: 2000,
            width: 500,
          }}
        >
          {showChat ? (
            <div style={{ marginRight: 125 }}>
              <Chat onClose={() => setShowChat(false)} />
            </div>
          ) : (
            <Button
              circular
              icon
              size="big"
              onClick={() => setShowChat(true)}
              color="purple"
            >
              <FontAwesomeIcon icon={faRobot} />

              <p style={{ marginLeft: 5 }}>Pide una recomendación</p>
            </Button>
          )}
        </div>
        <Grid.Column className="explore-lists__left" width={16}>
          <RandomLists lists={getRandomLists} refetchLists={refetchLists} />
        </Grid.Column>
      </Grid>
    </>
  );
}
