import React, { useState } from "react";
import "./Actions.scss";
import { Icon } from "semantic-ui-react";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_LIKE,
  IS_LIKE,
  DELETE_LIKE,
  COUNT_LIKES,
} from "../../../../gql/like";

export default function Actions({ movie }) {
  const [loadingAction, setLoadingAction] = useState(false);

  const [deleteLike] = useMutation(DELETE_LIKE);

  const {
    data: dataCount,
    loading: loadingCount,
    refetch: refetchCount,
  } = useQuery(COUNT_LIKES, {
    variables: {
      idMovie: movie.id,
    },
  });

  const { data, loading, refetch } = useQuery(IS_LIKE, {
    variables: {
      idMovie: movie.id,
    },
  });

  const [addLike] = useMutation(ADD_LIKE);

  const onAddLike = async () => {
    setLoadingAction(true);
    try {
      await addLike({
        variables: {
          idMovie: movie.id,
        },
      });

      refetch();
      refetchCount();
    } catch (error) {
      console.log(error);
    }
    setLoadingAction(false);
  };

  const onDeleteLike = async () => {
    setLoadingAction(true);
    try {
      await deleteLike({
        variables: {
          idMovie: movie.id,
        },
      });
      refetch();
      refetchCount();
    } catch (error) {
      console.log(error);
    }

    setLoadingAction(false);
  };

  const onAction = () => {
    if (!loadingAction) {
      if (isLike) {
        onDeleteLike();
      } else {
        onAddLike();
      }
    }
  };

  if (loading || loadingCount) return null;
  const { isLike } = data;
  const { countLikes } = dataCount;

  return (
    <div className="actions">
      <>
        {isLike ? (
          <Icon name="heart" className="active" onClick={onAction} />
        ) : (
          <Icon name="heart outline" className="inactive" onClick={onAction} />
        )}
      </>
      {countLikes} {countLikes === 1 ? "Like" : "Likes"}
    </div>
  );
}
