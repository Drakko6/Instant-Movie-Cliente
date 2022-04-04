import React from "react";
import "./SideMenu.scss";
import { Icon } from "semantic-ui-react";

const SideMenu = () => {
  return (
    <div className="side-menu">
      <div className="side-menu__emergency">
        <Icon name="medkit" />
        <p>Número de emergencia</p>
      </div>
      {/* <div className="side-menu__appointments">
        <Icon name="syringe" />
        <p>Citas a vacunas / consultas </p>
      </div> */}
      <div className="side-menu__tasks">
        <Icon name="tasks" />
        <p>Rutina de actividades </p>
      </div>
      {/* <div className="side-menu__achievements">
        <Icon name="trophy" />
        <p>Logros </p>
      </div> */}

      <div className="side-menu__advice">
        <div className="side-menu__advice__icon">
          <Icon name="info circle" />
        </div>

        <h2>Consejo del día</h2>

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

export default SideMenu;
