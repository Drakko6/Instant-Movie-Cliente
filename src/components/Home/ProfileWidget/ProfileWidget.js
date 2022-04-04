import React from "react";
import { Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ImageNotFound from "../../../assets/png/avatar.png";
import useAuth from "../../../hooks/useAuth";
import "./ProfileWidget.scss";

const ProfileWidget = ({ getUser }) => {
  const { auth } = useAuth();

  return (
    <div className="profile-widget">
      <Link to={`/${auth.username}`} className="profile-widget__link-avatar">
        <Image src={getUser.avatar ? getUser.avatar : ImageNotFound} avatar />
        <span className="profile-widget__name">{getUser.name}</span>
      </Link>
    </div>
  );
};

export default ProfileWidget;
