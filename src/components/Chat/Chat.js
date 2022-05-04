import React, { useRef, useState, useEffect } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
  Avatar,
  TypingIndicator,
  Button,
} from "@chatscope/chat-ui-kit-react";
import LogoIcon from "../../assets/png/logoIcon.png";
import RobotIcon from "../../assets/png/robotIcon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useQuery } from "@apollo/client";
import { GET_MOVIES_CONTENT_BASED } from "../../gql/movie";
import { URL_API_3 } from "../../utils/constants";
import axios from "axios";
import MyCarousel from "../MyCarousel";
import { useMediaQuery } from "react-responsive";
import ModalMovie from "../Modal/ModalMovie";
import ModalMovieMovil from "../Modal/ModalMovieMovil";
import { Button as SemButton } from "semantic-ui-react";

const Chat = ({ onClose }) => {
  const isMovil = useMediaQuery({ query: "(max-width: 600px)" });

  const inputRef = useRef();
  const [msgInputValue, setMsgInputValue] = useState("");
  const [messages, setMessages] = useState([
    {
      message: "¿Qué géneros te interesan? (escribe skip para saltar)",
      sender: "Géneros",
    },
  ]);
  const [loadingRecommendation, setLoadingRecommendation] = useState(false);
  const [idsMoviesContent, setIdsMoviesContent] = useState([]);
  const [cargandoRecomendacion, setCargandoRecomendacion] = useState(false);

  const generos = [
    "Drama",
    "Crimen",
    "Acción",
    "Suspense",
    "Comedia",
    "Terror",
    "Bélica",
    "Romance",
    "Misterio",
    "Historia",
    "Ciencia ficción",
    "Familia",
    "Aventura",
    "Western",
    "Fantasía",
    "Animación",
  ];

  const {
    data: moviesContent,
    loading: loadingMoviesContent,
    refetch: refetchMoviesContent,
  } = useQuery(GET_MOVIES_CONTENT_BASED, {
    variables: { ids: idsMoviesContent },
  });

  const fetchRecommendationByChatBot = async () => {
    try {
      setLoadingRecommendation(true);

      const { data } = await axios.post(`${URL_API_3}/recomendacion`, {
        generos: messages[1].message,
        actores: messages[3].message,
        directores: messages[5].message,
      });

      if (data.mensaje) {
        setLoadingRecommendation(false);
        return;
      }
      setLoadingRecommendation(false);

      setIdsMoviesContent(data.Recomendacion.map((id) => parseInt(id)));
    } catch (error) {
      toast.error(error);

      setLoadingRecommendation(false);
    }
  };

  useEffect(() => {
    refetchMoviesContent();
  }, [idsMoviesContent]);

  const handleSend = (message) => {
    // cuando sea la última pregunta, se manda llamar al axios

    setMessages([
      ...messages,
      {
        message,
        direction: "outgoing",
      },
      {
        message:
          messages.length === 1
            ? "Muy bien, ¿qué actores/actrices te gusta ver? (Separa por coma cada uno) (skip para saltar) "
            : messages.length === 3
            ? "Excelente, ¿tienes algún director o directores favoritos? Escríbelos (Separa por coma cada uno) (skip para saltar)"
            : "Ok, Dame un momento...\n...",

        sender:
          messages.length === 1 ||
          messages.length === 3 ||
          messages.length === 5
            ? "Bot"
            : "Local",
      },
    ]);

    setMsgInputValue("");
    inputRef.current.focus();
  };

  useEffect(() => {
    if (messages.length === 7) {
      fetchRecommendationByChatBot();
    }
  }, [messages]);

  let moviesByChat = [];
  if (moviesContent !== undefined) {
    const { getMoviesByContentBased } = moviesContent;

    moviesByChat = [...getMoviesByContentBased];
  }

  useEffect(() => {
    if (messages.length === 7 && moviesByChat.length > 0) {
      console.log(moviesByChat);
      setMessages([
        ...messages,
        {
          message: "Aquí están tus recomendaciones:",
          sender: "Bot",
        },
      ]);
    }
  }, [messages, moviesByChat]);

  const [showModal, setShowModal] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [movieSelected, setMovieSelected] = useState(null);

  const openMovie = (movie, e) => {
    if (isMoving) {
      e.preventDefault();
    } else {
      setMovieSelected(movie);
      setShowModal(true);
    }
  };

  const construirStringGeneros = (value) => {
    if (!msgInputValue.includes(value)) {
      setMsgInputValue(msgInputValue + value);
    } else {
      setMsgInputValue(msgInputValue.replace(value, ""));
    }
  };

  const [sendDisabled, setSendDisabled] = useState(true);
  useEffect(() => {
    setSendDisabled(msgInputValue.length === 0);
  }, [msgInputValue]);

  return (
    <div
      style={{
        height: "500px",
      }}
    >
      <ChatContainer>
        <ConversationHeader>
          <Avatar src={RobotIcon} />
          <ConversationHeader.Content userName="MovieBot" />
          <ConversationHeader.Actions>
            <Button
              icon={<FontAwesomeIcon icon={faClose} onClick={onClose} />}
            />
          </ConversationHeader.Actions>
        </ConversationHeader>
        <MessageList
          scrollBehavior="smooth"
          typingIndicator={
            loadingRecommendation && (
              <TypingIndicator
                style={{ marginLeft: 70 }}
                content="MovieBot está buscando tu recomentación"
              />
            )
          }
        >
          {messages.map((m, i) => (
            <Message key={i} model={m}>
              {(m.sender === "Bot" ||
                m.sender === "Géneros" ||
                m.sender === "Calificaciones") && <Avatar src={RobotIcon} />}
              {m.sender === "Géneros" && (
                <Message.CustomContent>
                  {m.message}
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {generos.map((genero) => (
                      <SemButton
                        size="mini"
                        color="facebook"
                        style={{ width: 100, marginBottom: 5 }}
                        onClick={() => construirStringGeneros(genero + ",")}
                      >
                        {genero}
                      </SemButton>
                    ))}
                  </div>
                </Message.CustomContent>
              )}
            </Message>
          ))}

          <MyCarousel
            isInBot={true}
            items={moviesByChat}
            openMovie={openMovie}
            setIsMoving={setIsMoving}
          />
        </MessageList>
        <MessageInput
          sendDisabled={sendDisabled}
          attachButton={false}
          placeholder="Tu respuesta"
          onSend={handleSend}
          onChange={setMsgInputValue}
          value={msgInputValue}
          ref={inputRef}
        />
      </ChatContainer>

      {showModal && (
        <>
          {isMovil ? (
            <ModalMovieMovil
              show={showModal}
              setShow={setShowModal}
              movie={movieSelected}
            />
          ) : (
            <ModalMovie
              show={showModal}
              setShow={setShowModal}
              movie={movieSelected}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Chat;
