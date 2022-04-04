import "./messenger.css";
import Conversation from "../../components/Chat/Conversations/Conversation";
import Message from "../../components/Chat/Message/Message";
import ChatOnline from "../../components/Chat/ChatOnline/ChatOnline";
import React, { useEffect, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { io } from "socket.io-client";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../gql/user";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();

  const { auth } = useAuth();

  // useEffect(() => {
  //   socket.current = io("ws://localhost:5000");
  //   socket.current.on("getMessage", (data) => {
  //     setArrivalMessage({
  //       sender: data.senderId,
  //       text: data.text,
  //       createdAt: Date.now(),
  //     });
  //   });
  // }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  // useEffect(() => {
  //   socket.current.emit("addUser", user._id);
  //   socket.current.on("getUsers", (users) => {
  //     setOnlineUsers(
  //       user.followings.filter((f) => users.some((u) => u.userId === f))
  //     );
  //   });
  // }, [user]);

  // TO DO: cambiar esto por peticion de usuarios seguidos

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "https://chat-lomeeto-api.herokuapp.com/api/conversations/123456789"
          // + user._id

          // CAMBIAR ESTO POR AUTH ID cuando ya haya conversaciones
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [auth.id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "https://chat-lomeeto-api.herokuapp.com/api/messages/" +
            currentChat?._id
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: auth.id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find((member) => member !== auth.id);

    // socket.current.emit("sendMessage", {
    //   senderId: auth.id,
    //   receiverId,
    //   text: newMessage,
    // });

    try {
      const res = await axios.post(
        "https://chat-lomeeto-api.herokuapp.com/api/messages",
        message
      );
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={auth} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === auth.id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="Escribe un mensaje..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Enviar
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Abre una conversacion para abrir el chat
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={auth.id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}
