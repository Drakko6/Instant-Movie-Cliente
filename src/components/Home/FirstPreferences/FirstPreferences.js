import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_FIRST_PREFERENCES } from "../../../gql/user";
import { toast } from "react-toastify";
import "./FirstPreferences.scss";
import { Button } from "semantic-ui-react";
import { Grid, Card } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSnowman,
  faGrinTears,
  faChildren,
  faUserSecret,
  faPersonMilitaryRifle,
  faGun,
  faGem,
  faSadCry,
  faDragon,
  faSkull,
  faRobot,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

const FirstPreferences = ({ setPreferencesUploaded, refetch }) => {
  //MUTATION para guardar preferencias
  const [registerPreferences] = useMutation(REGISTER_FIRST_PREFERENCES);

  //estado para guardar las preferencias y mandarlas a BD
  const [preferences, setPreferences] = useState([]);

  //estado para cambiar estilos de categorias
  const [categoriesStyles, setCategoriesStyles] = useState([
    {
      category: 28,

      style: "",
    },
    {
      category: 12,

      style: "",
    },
    {
      category: 16,

      style: "",
    },
    {
      category: 27,

      style: "",
    },
    {
      category: 35,

      style: "",
    },
    {
      category: 80,

      style: "",
    },
    {
      category: 18,

      style: "",
    },
    {
      category: 10751,

      style: "",
    },
    {
      category: 878,

      style: "",
    },
    {
      category: 10749,

      style: "",
    },
    {
      category: 14,

      style: "",
    },
    {
      category: 10752,

      style: "",
    },
  ]);

  const [errorSave, setErrorSave] = useState(false);
  //funcion para manejar el clic de las preferencias
  const onClickPreference = (preference, index) => {
    //  Comprobar que sólo sean 3, si sí, borrar 1 y poner el nuevo. Comprobar tambien que no es el mismo
    if (preferences.length === 3 && !preferences.includes(preference)) {
      //borramos del array de preferencias la categoria
      const categoryErased = preferences.splice(0, 1)[0];
      setPreferences(preferences);

      //Buscamos el indice que corresponde a la categoria para cambiar el estilo
      let ind = -1;
      categoriesStyles.forEach((cat, i) => {
        if (cat.category === categoryErased) {
          ind = i;
        }
      });
      categoriesStyles[ind] = { category: categoryErased, style: "" };
    }

    //  Comprobar que no se repitan
    if (!preferences.includes(preference)) {
      setPreferences([...preferences, preference]);
      //  Cambiar el classname a active
      categoriesStyles[index] = { category: preference, style: "active" };
    } else {
      setPreferences(preferences.filter((pref) => pref !== preference));
      categoriesStyles[index] = { category: preference, style: "" };
    }

    setErrorSave(false);
  };

  const onClickSave = async () => {
    console.log(preferences);
    if (preferences.length < 3) {
      setErrorSave(true);
    } else {
      //Hacer mutation para guardar primeras preferencias
      try {
        await registerPreferences({
          variables: {
            input: {
              preferences,
            },
          },
        });
        setPreferencesUploaded(true);
        refetch();
        toast.success("Preferencias guardadas correctamente");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  return (
    <>
      <div className="first-preferences">
        <h3 className="title">
          Antes de empezar, déjanos saber qué géneros de películas te gustan más
        </h3>
        <h4>Elige tres de para conocerte mejor </h4>

        <Button
          type="submit"
          className="save-preferences-button"
          onClick={() => onClickSave()}
        >
          Guardar Preferencias
        </Button>
        {errorSave && (
          <p className="error-message">Debes elegir 3 categorías</p>
        )}

        <Grid className="grid-preferences">
          <Grid.Row columns={4}>
            <Grid.Column>
              <Card
                onClick={() => onClickPreference(28, 0)}
                className={categoriesStyles[0].style}
              >
                <FontAwesomeIcon icon={faGun} />
                <h6>Acción</h6>
              </Card>
            </Grid.Column>

            <Grid.Column>
              <Card
                onClick={() => onClickPreference(12, 1)}
                className={categoriesStyles[1].style}
              >
                <FontAwesomeIcon icon={faGem} />
                <h6>Aventura</h6>
              </Card>
            </Grid.Column>

            <Grid.Column>
              <Card
                onClick={() => onClickPreference(16, 2)}
                className={categoriesStyles[2].style}
              >
                <FontAwesomeIcon icon={faSnowman} />
                <h6>Animación</h6>
              </Card>
            </Grid.Column>

            <Grid.Column>
              <Card
                onClick={() => onClickPreference(27, 3)}
                className={categoriesStyles[3].style}
              >
                <FontAwesomeIcon icon={faSkull} />
                <h6>Terror</h6>
              </Card>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={4}>
            <Grid.Column>
              <Card
                onClick={() => onClickPreference(35, 4)}
                className={categoriesStyles[4].style}
              >
                <FontAwesomeIcon icon={faGrinTears} />
                <h6>Comedia</h6>
              </Card>
            </Grid.Column>

            <Grid.Column>
              <Card
                onClick={() => onClickPreference(80, 5)}
                className={categoriesStyles[5].style}
              >
                <FontAwesomeIcon icon={faUserSecret} />
                <h6>Crimen</h6>
              </Card>
            </Grid.Column>

            <Grid.Column>
              <Card
                onClick={() => onClickPreference(18, 6)}
                className={categoriesStyles[6].style}
              >
                <FontAwesomeIcon icon={faSadCry} />
                <h6>Drama</h6>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card
                onClick={() => onClickPreference(10751, 7)}
                className={categoriesStyles[7].style}
              >
                <FontAwesomeIcon icon={faChildren} />
                <h6>Familiar</h6>
              </Card>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={4}>
            <Grid.Column>
              <Card
                onClick={() => onClickPreference(878, 8)}
                className={categoriesStyles[8].style}
              >
                <FontAwesomeIcon icon={faRobot} />
                <h6>Ciencia Ficción</h6>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card
                onClick={() => onClickPreference(10749, 9)}
                className={categoriesStyles[9].style}
              >
                <FontAwesomeIcon icon={faHeart} />
                <h6>Romance</h6>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card
                onClick={() => onClickPreference(14, 10)}
                className={categoriesStyles[10].style}
              >
                <FontAwesomeIcon icon={faDragon} />
                <h6>Fantasía</h6>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card
                onClick={() => onClickPreference(10752, 11)}
                className={categoriesStyles[11].style}
              >
                <FontAwesomeIcon icon={faPersonMilitaryRifle} />
                <h6>Bélica</h6>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </>
  );
};

export default FirstPreferences;
