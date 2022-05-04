import React from "react";
import { List } from "semantic-ui-react";
import AddToFavorite from "../Modal/ModalMovie/AddToFavorite";
import Actions from "../Modal/ModalMovieMovil/Actions";
import "./FeedMovie.scss";

export default function FeedMovie({ movie, openMovie, isInBot }) {
  return (
    <List.Item className="feed__item" key={movie.id}>
      <div>
        <List.Content>
          <div key={movie.id} className="feed__box">
            <div className="feed-movie-title-container">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div>
                  <h3 style={{ color: "white" }}>{movie.title} </h3>
                  <p>
                    <span
                      style={{
                        fontSize: "small",
                        opacity: isInBot ? 1 : 0.6,
                        color: "white",
                      }}
                    >
                      {movie.release_date}
                    </span>
                  </p>
                </div>

                {!isInBot && (
                  <div>
                    <AddToFavorite movie={movie} />
                  </div>
                )}
              </div>
            </div>
            <div
              className="feed__box-photo"
              onClick={(e) => openMovie(movie, e)}
              style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.poster_path}")`,
                padding: 0,
                backgroundSize: "cover",
              }}
            />
          </div>
        </List.Content>
      </div>

      {!isInBot && <Actions movie={movie} />}
    </List.Item>
  );
}
