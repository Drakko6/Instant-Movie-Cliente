import React from "react";
import "./Text.scss";
import { Link } from "react-router-dom";

export default function Text({ post }) {
  return (
    <div className="text">
      <p>
        <Link to={`/${post.idUser.username}`}>
          <span>{post.idUser.username}</span>
        </Link>
        {post.text}
      </p>
    </div>
  );
}
