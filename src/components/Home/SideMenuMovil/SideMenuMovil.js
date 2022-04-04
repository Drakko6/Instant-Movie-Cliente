import React from "react";
import "./SideMenuMovil.scss";
import { Icon } from "semantic-ui-react";

const SideMenuMovil = () => {
  return (
    <div className="side-menu-movil">
      <div className="side-menu-movil__emergency">
        <Icon name="medkit" />
        <p>Número de emergencia</p>
      </div>
      <div className="side-menu-movil__appointments">
        <Icon name="syringe" />
        <p>Citas a vacunas / consultas </p>
      </div>
      <div className="side-menu-movil__tasks">
        <Icon name="tasks" />
        <p>Rutina de actividades </p>
      </div>
      <div className="side-menu-movil__achievements">
        <Icon name="trophy" />
        <p>Logros </p>
      </div>

      <div className="side-menu-movil__advice">
        <div className="side-menu-movil__advice__icon">
          <Icon name="info circle" />
          <p>Consejo del día</p>
        </div>

        <p>
          Es fundamental para tu perro estar bien alimentado. Puedes optar por
          dietas secas o húmedas, incluso por una alimentación natural y cocinar
          tus propias recetas. Lo importante es elegir un alimento de gama alta,
          completo, cuyos ingredientes sean de calidad.
        </p>
      </div>
    </div>
  );
};

export default SideMenuMovil;
