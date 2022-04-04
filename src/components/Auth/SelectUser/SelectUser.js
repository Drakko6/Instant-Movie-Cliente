import React, { useState } from "react";
import "./SelectUser.scss";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import RegisterForm from "../RegisterForm";
import RegisterBusinessForm from "../RegisterBusinessForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore } from "@fortawesome/free-solid-svg-icons";

const SelectUser = ({ setShowLogin }) => {
  //  Estado para guardar si es usuario y negocio
  const [userType, setUserType] = useState("");

  return (
    <>
      {userType === "" && (
        <>
          <h2 className="select-user-title">¿Qué tipo de usuario eres?</h2>

          <div className="select-user">
            <Link to="/" onClick={() => setUserType("user")}>
              <Icon name="paw" />
              <h6>Lomito</h6>
            </Link>
            <Link to="/" onClick={() => setUserType("business")}>
              <FontAwesomeIcon icon={faStore} />

              <h6>Negocio</h6>
            </Link>
          </div>
        </>
      )}
      {userType === "user" && <RegisterForm setShowLogin={setShowLogin} />}
      {userType === "business" && (
        <RegisterBusinessForm setShowLogin={setShowLogin} />
      )}
    </>
  );
};

export default SelectUser;
