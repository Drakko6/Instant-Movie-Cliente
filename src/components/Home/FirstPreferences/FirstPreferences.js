import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_FIRST_PREFERENCES } from "../../../gql/user";
import { toast } from "react-toastify";
import "./FirstPreferences.scss";
import { Icon, Button } from "semantic-ui-react";
import { Grid, Card } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBone,
  faCookieBite,
  faTshirt,
  faDog,
  faAward,
} from "@fortawesome/free-solid-svg-icons";

const FirstPreferences = ({ setPreferencesUploaded, refetch }) => {
  //MUTATION para guardar preferencias
  const [registerPreferences] = useMutation(REGISTER_FIRST_PREFERENCES);

  //estado para guardar las preferencias y mandarlas a BD
  const [preferences, setPreferences] = useState([]);

  //estado para cambiar estilos de categorias
  const [categoriesStyles, setCategoriesStyles] = useState([
    {
      category: "Veterinaria",

      style: "",
    },
    {
      category: "Comida",

      style: "",
    },
    {
      category: "Juguetes",

      style: "",
    },
    {
      category: "Ropa",

      style: "",
    },
    {
      category: "Estética",

      style: "",
    },
    {
      category: "Guardería",

      style: "",
    },
    {
      category: "Entrenamiento",

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
          Antes de empezar, déjanos saber qué tipo de productos te gustan más
        </h3>
        <h4>Elige tres de nuestras categorías </h4>

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
          <Grid.Row columns={3}>
            <Grid.Column>
              <Card
                onClick={() => onClickPreference("Veterinaria", 0)}
                className={categoriesStyles[0].style}
              >
                <Icon name="hospital" />
                <h6>Veterinaria</h6>
              </Card>
            </Grid.Column>

            <Grid.Column>
              <Card
                onClick={() => onClickPreference("Comida", 1)}
                className={categoriesStyles[1].style}
              >
                <FontAwesomeIcon icon={faCookieBite} />
                <h6>Comida</h6>
              </Card>
            </Grid.Column>

            <Grid.Column>
              <Card
                onClick={() => onClickPreference("Juguetes", 2)}
                className={categoriesStyles[2].style}
              >
                <FontAwesomeIcon icon={faBone} />
                <h6>Juguetes</h6>
              </Card>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={3}>
            <Grid.Column>
              <Card
                onClick={() => onClickPreference("Ropa", 3)}
                className={categoriesStyles[3].style}
              >
                <FontAwesomeIcon icon={faTshirt} />
                <h6>Ropa</h6>
              </Card>
            </Grid.Column>

            <Grid.Column>
              <Card
                onClick={() => onClickPreference("Estética", 4)}
                className={categoriesStyles[4].style}
              >
                <Icon name="bath" />
                <h6>Estética</h6>
              </Card>
            </Grid.Column>

            <Grid.Column>
              <Card
                onClick={() => onClickPreference("Guardería", 5)}
                className={categoriesStyles[5].style}
              >
                <FontAwesomeIcon icon={faDog} />
                <h6>Guardería</h6>
              </Card>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={3}>
            <Grid.Column></Grid.Column>

            <Grid.Column>
              <Card
                onClick={() => onClickPreference("Entrenamiento", 6)}
                className={categoriesStyles[6].style}
              >
                <FontAwesomeIcon icon={faAward} />
                <h6>Entrenamiento</h6>
              </Card>
            </Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </>
  );
};

export default FirstPreferences;
