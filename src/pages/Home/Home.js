import React, { useState } from "react";
import { Button, Grid } from "semantic-ui-react";
import "./Home.scss";
import Feed from "../../components/Home/Feed";
import FirstPreferences from "../../components/Home/FirstPreferences";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../gql/user";

import useAuth from "../../hooks/useAuth";
import Chat from "../../components/Chat/Chat";

export default function Home() {
  const [preferencesUploaded, setPreferencesUploaded] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const { auth } = useAuth();

  const { data, loading, error, refetch } = useQuery(GET_USER, {
    variables: { username: auth.username },
  });

  if (loading || error) return null;
  const { getUser } = data;

  return (
    <>
      {/* Si las primeras preferencias no han sido subidas, renderizar componente para hacerlo */}
      {!preferencesUploaded && getUser.preferences.length === 0 ? (
        <FirstPreferences
          setPreferencesUploaded={setPreferencesUploaded}
          refetch={refetch}
        />
      ) : (
        <>
          <Grid className="home">
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
            <Grid.Column className="home__left" width={16}>
              <Feed user={getUser} />
            </Grid.Column>
          </Grid>
        </>
      )}
    </>
  );
}
