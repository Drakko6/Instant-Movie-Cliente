import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import "./Home.scss";
import Feed from "../../components/Home/Feed";
import FeedTablet from "../../components/Home/FeedTablet";
import FeedMovil from "../../components/Home/FeedMovil";
import FirstPreferences from "../../components/Home/FirstPreferences";

import { useMediaQuery } from "react-responsive";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../gql/user";

import useAuth from "../../hooks/useAuth";

export default function Home() {
  const isMovil = useMediaQuery({ query: "(max-width: 600px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 601px) and (max-width: 1099px)",
  });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1100px)",
  });

  const [preferencesUploaded, setPreferencesUploaded] = useState(false);

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
          {isDesktopOrLaptop && (
            <Grid className="home">
              <Grid.Column className="home__left" width={16}>
                <Feed user={getUser} />
              </Grid.Column>
            </Grid>
          )}

          {isTablet && (
            <Grid className="home">
              {/* <Grid.Column className="home__left" width={4}>
                <SideMenu />
              </Grid.Column> */}
              <Grid.Column className="home__left" width={16}>
                <FeedTablet />
              </Grid.Column>
            </Grid>
          )}

          {isMovil && (
            <Grid className="home-movil">
              {/* <Grid.Row className="home-movil_top">
                <SideMenuMovil />
              </Grid.Row> */}
              {/* <Grid.Row className="home-movil_top">
                <UsersNotFollowedsMovil user={auth} />
              </Grid.Row> */}
              <Grid.Row>
                <FeedMovil />
              </Grid.Row>
            </Grid>
          )}
        </>
      )}
    </>
  );
}
