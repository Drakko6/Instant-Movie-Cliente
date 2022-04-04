import React, { useState, useEffect } from "react";
import "./FeedTablet.scss";
import { map } from "lodash";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Image } from "semantic-ui-react";
import {
  GET_POSTS_FOLLOWEDS,
  GET_RECOMMENDED_POSTS_FROM_BUSINESS,
} from "../../../gql/post";
import ImageNotFound from "../../../assets/png/avatar.png";
import Actions from "../../Modal/ModalPost/Actions";
import CommentForm from "../../Modal/ModalPost/CommentForm";
import ModalPost from "../../Modal/ModalPost";
import CommentsFeed from "../Feed/CommentsFeed";
export default function FeedTablet() {
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

  // Hacer aleatorio el orden de los posts
  allPosts.sort(function () {
    return Math.random() - 0.5;
  });
  const openPost = (post) => {
    setPostSelected(post);
    setShowModal(true);
  };

  return (
    <>
      <div className="feedTablet">
        {allPosts.length === 0 && (
          <h2 className="feedTablet__noposts">No hay películas aún</h2>
        )}
        {map(allPosts, (post, index) => (
          <div key={index} className="feedTablet__box">
            <Link to={`/${post.idUser.username}`}>
              <div className="feedTablet__box-user">
                <Image src={post.idUser.avatar || ImageNotFound} avatar />
                <span>{post.idUser.name}</span>
                {/* // Aquí un span que diga si es publicidad */}
                {post.ad && (
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
                )}
              </div>
            </Link>

            <div
              className="feedTablet__box-photo"
              style={{ backgroundImage: `url("${post.file}")` }}
              // onClick={() => openPost(post)}
            />
            {post.text ? (
              <div className="feedTablet__box-text">
                <span>{post.idUser.username}: </span>
                {post.text}
              </div>
            ) : null}
            <CommentsFeed post={post} />

            <div className="feedTablet__box-actions">
              <Actions post={post} />
            </div>
            <div className="feedTablet__box-form">
              <CommentForm post={post} />
            </div>
          </div>
        ))}
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
