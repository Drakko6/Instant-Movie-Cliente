import axios from "axios";
import React, { useEffect, useState } from "react";
import "./conversation.css";
import ImageNotFound from "../../../assets/png/avatar.png";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  // const { data, loading, error } = useQuery(GET_USER, {
  //   variables: { username: auth.username },
  // });

  // if (loading || error) return null;
  // const { getUser } = data;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          ImageNotFound
          // user?.profilePicture
          //   ? PF + user.profilePicture
          //   : PF + "person/noAvatar.png"
        }
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}
