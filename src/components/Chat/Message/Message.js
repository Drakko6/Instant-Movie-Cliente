import React from "react";
import "./message.css";
import { format, register } from "timeago.js";

register(
  "es_ES",
  (number, index, total_sec) =>
    [
      ["justo ahora", "ahora mismo"],
      ["hace %s segundos", "en %s segundos"],
      ["hace 1 minuto", "en 1 minuto"],
      ["hace %s minutos", "en %s minutos"],
      ["hace 1 hora", "en 1 hora"],
      ["hace %s horas", "in %s horas"],
      ["hace 1 dia", "en 1 dia"],
      ["hace %s dias", "en %s dias"],
      ["hace 1 semana", "en 1 semana"],
      ["hace %s semanas", "en %s semanas"],
      ["1 mes", "en 1 mes"],
      ["hace %s meses", "en %s meses"],
      ["hace 1 año", "en 1 año"],
      ["hace %s años", "en %s años"],
    ][index]
);

export default function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          //TO DO: reemplazar con el avatar del usuario
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt, "es_ES")}</div>
    </div>
  );
}
