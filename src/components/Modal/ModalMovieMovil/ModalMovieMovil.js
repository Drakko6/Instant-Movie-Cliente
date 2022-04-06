import React from "react";
import "./ModalMovieMovil.scss";
import { Modal, Grid } from "semantic-ui-react";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import Actions from "../ModalMovie/Actions";
import Text from "../ModalMovie/Text";

import { IS_FOLLOW } from "../../../gql/follow";
import { useQuery } from "@apollo/client";
import useAuth from "../../../hooks/useAuth";

export default function ModalMovieMovil({ show, setShow, movie }) {
  // const {
  //   idUser: { username },
  // } = movie;

  // const { auth } = useAuth();

  // const { data: dataIsFollow, loading: loadingIsFollow } = useQuery(IS_FOLLOW, {
  //   variables: { username: username },
  // });

  const onClose = () => {
    setShow(false);
  };

  // if (loadingIsFollow) return null;
  // if (dataIsFollow === undefined) return null;
  // const { isFollow } = dataIsFollow;

  // const showCommentForm = () => {
  //   if (isFollow || auth.username === username) {
  //     return <CommentForm movie={post} />;
  //   } else {
  //     return null;
  //   }
  // };

  // const isTheSame = auth.username === username;

  return (
    <Modal open={show} onClose={onClose} className="modal-movie-movil">
      <Grid>
        <Grid.Row
          className="modal-movie-movil__top"
          style={{ backgroundImage: `url("${movie.file}")` }}
        ></Grid.Row>
        <Grid.Row className="modal-movie-movil__bottom">
          {/* <Text movie={movie} /> */}
          <Actions
            movie={movie}
            // isTheSame={isTheSame}
            // isFollow={isFollow}
          />
          <Comments movie={movie} />
          <CommentForm movie={movie} />
          {/* {showCommentForm()} */}
        </Grid.Row>
      </Grid>
    </Modal>
  );
}
