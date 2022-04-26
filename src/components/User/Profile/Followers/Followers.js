import React, { useState, useEffect } from "react";
import { size } from "lodash";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWERS, GET_FOLLOWEDS } from "../../../../gql/follow";
import "./Followers.scss";
import ModalBasic from "../../../Modal/ModalBasic";
import ListUsers from "../../ListUsers";

export default function Followers({ username, totalFavorites, totalLists }) {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [childrenModal, setChildrenModal] = useState(null);

  const {
    data: dataFolloweds,
    loading: loadingFolloweds,
    startPolling: startPollingFolloweds,
    stopPolling: stopPollingFolloweds,
  } = useQuery(GET_FOLLOWEDS, {
    variables: {
      username,
    },
  });

  const openFolloweds = () => {
    setTitleModal("Usuarios seguidos");
    setShowModal(true);
    setChildrenModal(
      <ListUsers users={getFolloweds} setShowModal={setShowModal} />
    );
  };

  const openFollowers = () => {
    setTitleModal("Seguidores");
    setShowModal(true);
    setChildrenModal(
      <ListUsers users={getFollowers} setShowModal={setShowModal} />
    );
  };

  const {
    data: dataFollowers,
    loading: loadingFollowers,
    startPolling: startPollingFollowers,
    stopPolling: stopPollingFollowers,
  } = useQuery(GET_FOLLOWERS, {
    variables: { username },
  });

  //PARA REALTIME DE SEGUIDORES
  useEffect(() => {
    startPollingFollowers(2000);
    startPollingFolloweds(2000);
    return () => {
      stopPollingFollowers();
      stopPollingFolloweds();
    };
  }, [
    startPollingFollowers,
    stopPollingFollowers,
    startPollingFolloweds,
    stopPollingFolloweds,
  ]);

  if (loadingFollowers || loadingFolloweds) return null;
  if (dataFolloweds === undefined || dataFolloweds === undefined) return null;
  const { getFollowers } = dataFollowers;
  const { getFolloweds } = dataFolloweds;

  return (
    <>
      <div className="followers">
        <p>
          <span>{totalFavorites}</span> favoritas
        </p>
        <p>
          <span>{totalLists}</span> listas de películas
        </p>
        <p className="link" onClick={openFollowers}>
          <span>{size(getFollowers)}</span> seguidores
        </p>
        <p className="link-final" onClick={openFolloweds}>
          <span>{size(getFolloweds)}</span> seguidos
        </p>
      </div>
      <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
        {childrenModal}
      </ModalBasic>
    </>
  );
}
