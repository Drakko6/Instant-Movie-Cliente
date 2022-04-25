import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { Button } from "semantic-ui-react";
import PasswordForm from "../PasswordForm";
import EmailForm from "../EmailForm";
import DescriptionForm from "../DescriptionForm";

import DeleteForm from "../DeleteForm";
import AgeForm from "../AgeForm";

import "./SettingsForm.scss";

export default function SettingsForm({
  setShowModal,
  setChildrenModal,
  setTitleModal,
  userInfo,
  refetch,
}) {
  const onChangeAge = () => {
    setTitleModal("Dinos tu edad");
    setChildrenModal(
      <AgeForm
        setShowModal={setShowModal}
        currentYears={userInfo.years}
        currentMonths={userInfo.months}
        refetch={refetch}
      />
    );
  };

  const onChangeDescription = () => {
    setTitleModal("Actualizar tu descripción");
    setChildrenModal(
      <DescriptionForm
        setShowModal={setShowModal}
        currentDescription={userInfo.description}
        refetch={refetch}
      />
    );
  };

  const onChangeEmail = () => {
    setTitleModal("Cambiar correo");
    setChildrenModal(
      <EmailForm
        setShowModal={setShowModal}
        currentEmail={userInfo.email}
        refetch={refetch}
      />
    );
  };

  const onChangePassword = () => {
    setTitleModal("Cambia tu contraseña");
    setChildrenModal(<PasswordForm logout={onLogout} />);
  };

  const onDeleteUser = () => {
    setTitleModal("¿Eliminar permanentemente tus datos?");

    setChildrenModal(
      <DeleteForm
        setShowModal={setShowModal}
        currentUser={userInfo.username}
        logout={onLogout}
      />
    );
  };

  const { logout } = useAuth();
  const history = useHistory();
  const client = useApolloClient();

  const onLogout = () => {
    client.clearStore(); //para limpiar la cache
    logout();
    history.push("/"); //redireccionar al inicio
  };

  return (
    <>
      <div className="settings-form">
        <Button onClick={onChangePassword}>Cambiar contraseña</Button>
        <Button onClick={onChangeEmail}>Cambiar correo</Button>
        <Button onClick={onChangeDescription}>Cambiar descripción</Button>
        <Button onClick={onLogout} className="logout">
          Cerrar sesión
        </Button>
        <Button onClick={onDeleteUser} className="delete">
          Borrar usuario
        </Button>
        <Button onClick={() => setShowModal(false)}>Cancelar</Button>
      </div>
    </>
  );
}
