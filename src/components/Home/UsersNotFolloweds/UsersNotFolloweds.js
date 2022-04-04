import React, { useEffect } from "react";
import "./UsersNotFolloweds.scss";
import { Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { map } from "lodash";
import { useQuery } from "@apollo/client";
import { GET_NOT_FOLLOWEDS } from "../../../gql/follow";
import ImageNotFound from "../../../assets/png/avatar.png";

export default function UsersNotFolloweds({ user }) {
  const { state, town } = user;

  const { data, loading, startPolling, stopPolling } =
    useQuery(GET_NOT_FOLLOWEDS);

  // useEffect(() => {
  //   return () => {
  //     stopPolling();
  //   };
  // }, [startPolling, stopPolling]);

  if (loading) return null;
  if (data === undefined) return null;
  const { getNotFolloweds } = data;

  return (
    <div className="users-not-followeds">
      <h3>Sugerencias para ti</h3>

      {map(getNotFolloweds, (user, index) => (
        <Link
          key={index}
          to={`/${user.username}`}
          className="users-not-followeds__user"
        >
          <Image src={user.avatar || ImageNotFound} avatar />
          <span>{user.name}</span>
        </Link>
      ))}
    </div>
  );
}
