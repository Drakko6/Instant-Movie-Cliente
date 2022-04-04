import React, { useState, useEffect } from "react";
import "./Feed.scss";
import { map } from "lodash";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Image, List } from "semantic-ui-react";
import {
  GET_POSTS_FOLLOWEDS,
  GET_RECOMMENDED_POSTS_FROM_BUSINESS,
} from "../../../gql/post";
import ImageNotFound from "../../../assets/png/avatar.png";
import Actions from "../../Modal/ModalPostMovil/Actions";
import CommentForm from "../../Modal/ModalPost/CommentForm";
import ModalPost from "../../Modal/ModalPost";
import CommentsFeed from "./CommentsFeed";

export default function Feed() {
  const [showModal, setShowModal] = useState(false);
  const [postSelected, setPostSelected] = useState(null);

  //QUERY DE POST DE SEGUIDOS
  const { data, loading, startPolling, stopPolling } =
    useQuery(GET_POSTS_FOLLOWEDS);

  //QUERY DE RECOMENDADOS
  const {
    data: dataRecommended,
    loading: loadingRecommended,
    startPolling: startPollingRecommended,
    stopPolling: stopPollingRecommended,
  } = useQuery(GET_RECOMMENDED_POSTS_FROM_BUSINESS);

  useEffect(() => {
    startPolling(3000);
    startPollingRecommended(3000);
    return () => {
      stopPolling();
      stopPollingRecommended();
    };
  }, [
    startPolling,
    stopPolling,
    startPollingRecommended,
    stopPollingRecommended,
  ]);
  if (loading || loadingRecommended) return null;
  if (data === undefined || dataRecommended === undefined) return null;
  const { getPostFolloweds } = data;
  const { getRecommendedPostsFromBusiness } = dataRecommended;

  //mapear el recommended post para agregarle una propiedad "ad"
  const recommendedTyped = getRecommendedPostsFromBusiness.map((post) => ({
    ...post,
    ad: true,
  }));

  //Juntar los posts para poder mostrar todos
  const allPosts = getPostFolloweds.concat(recommendedTyped);

  // Hacer aleatorio el orden de los posts TODO: ESTO SE MUEVE AL ABRIR EL MODAL
  // allPosts.sort(function () {
  //   return Math.random() - 0.5;
  // });

  const openPost = (post) => {
    setPostSelected(post);
    setShowModal(true);
  };

  return (
    <>
      <div className="feed">
        {allPosts.length === 0 && (
          <h2 className="feed__noposts">No hay películas para ver aún</h2>
        )}
        <List horizontal className="list">
          {map(allPosts, (post, index) => (
            <List.Item className="feed__item">
              <div onClick={() => openPost(post)}>
                <List.Content>
                  <div key={index} className="feed__box">
                    <div
                      className="feed__box-photo"
                      style={{ backgroundImage: `url("${post.file}")` }}
                    />
                    {/* {post.text && (
                    <div className="feed__box-text">
                      <span>{post.idUser.username}: </span>
                      {post.text}
                    </div>
                  )} */}
                    {/* <CommentsFeed post={post} /> */}
                    {/* <div className="feed__box-actions">
              <Actions post={post} />
            </div>
            <div className="feed__box-form">
              <CommentForm post={post} />*/}
                    {/* </div>  */}
                  </div>
                  {/* <List.Header></List.Header> */}
                  <List.Description>
                    <div className="feed__box-user">
                      <span>{post.idUser.name}</span>
                      {/* // Aquí un span que diga si es publicidad */}
                      {/* {post.ad && (
                        <p
                          style={{
                            fontSize: 10,
                            marginLeft: 43,
                            marginTop: -5,
                            color: "gray",
                          }}
                        >
                          Recomendado para ti
                        </p>
                      )} */}
                    </div>
                  </List.Description>
                </List.Content>
              </div>
            </List.Item>
          ))}
        </List>
      </div>
      {showModal && (
        <ModalPost
          show={showModal}
          setShow={setShowModal}
          post={postSelected}
        />
      )}
    </>
  );
}
