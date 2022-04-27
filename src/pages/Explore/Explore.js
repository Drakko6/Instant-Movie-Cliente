import React, { useEffect, useState } from "react";
import { Dimmer, Grid, Loader, Button, Icon } from "semantic-ui-react";
import "./Explore.scss";
import {
  GET_MOVIES_CONTENT_BASED,
  GET_RECOMMENDED_MOVIES,
} from "../../gql/movie";
import { useQuery } from "@apollo/client";
import Movies from "../../components/Movies";

import { useMediaQuery } from "react-responsive";
import { URL_API_2 } from "../../utils/constants";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import ModalBasic from "../../components/Modal/ModalBasic";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Explore() {
  const { auth } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [loadingContentBased, setLoadingContentBased] = useState(false);
  const [idsMoviesContent, setIdsMoviesContent] = useState([]);
  const [perfil, setPerfil] = useState([]);
  const isMovil = useMediaQuery({ query: "(max-width: 600px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 601px) and (max-width: 1099px)",
  });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1100px)",
  });

  const { data, loading, refetch } = useQuery(GET_RECOMMENDED_MOVIES);
  const {
    data: moviesContent,
    loading: loadingMoviesContent,
    refetch: refetchMoviesContent,
  } = useQuery(GET_MOVIES_CONTENT_BASED, {
    variables: { ids: idsMoviesContent },
  });

  useEffect(() => {
    refetch();

    // pedir datos de recomendaciones
    fetchRecommendationsByContent();
  }, []);

  const fetchRecommendationsByContent = async () => {
    try {
      setLoadingContentBased(true);

      const { data } = await axios.get(
        `${URL_API_2}/recomendacion/${auth.username}`
      );

      if (data.mensaje) {
        setLoadingContentBased(false);
        return;
      }
      setLoadingContentBased(false);

      setIdsMoviesContent(data.Peliculas.map((objeto) => objeto.id));

      setPerfil(data.Perfil.slice(0, 15));
    } catch (error) {
      toast.error(error);

      setLoadingContentBased(false);
    }
  };

  useEffect(() => {
    refetchMoviesContent();
  }, [idsMoviesContent]);

  if (loading)
    return (
      <Dimmer
        active
        style={{
          backgroundColor: "rgba(0,0, 0, 0)",
        }}
      >
        <Loader size="huge" />
      </Dimmer>
    );
  if (data === undefined) return null;
  const { getRecommendedMovies } = data;

  let moviesContentBased = [];
  if (moviesContent !== undefined) {
    const { getMoviesByContentBased } = moviesContent;

    moviesContentBased = [...getMoviesByContentBased];
  }

  return (
    <>
      {isDesktopOrLaptop && (
        <Grid className="explore">
          <Grid.Column className="explore__left" width={8}>
            <Movies
              refetch={refetch}
              getMovies={getRecommendedMovies}
              recomendations={true}
            />
          </Grid.Column>
          <Grid.Column className="explore__left" width={8}>
            <Movies
              refetch={refetchMoviesContent}
              getMovies={moviesContentBased}
              contentBased={true}
              idsMoviesContent={idsMoviesContent}
              loadingContentBased={loadingContentBased}
              perfil={perfil}
              setShowModal={setShowModal}
            />
          </Grid.Column>
        </Grid>
      )}

      {isTablet && (
        <Grid className="explore">
          <Grid.Column className="explore__left" width={8}>
            <Movies
              refetch={refetch}
              getMovies={getRecommendedMovies}
              recomendations={true}
            />
          </Grid.Column>
          <Grid.Column className="explore__left" width={8}>
            <Movies
              refetch={refetchMoviesContent}
              getMovies={moviesContentBased}
              contentBased={true}
              idsMoviesContent={idsMoviesContent}
              loadingContentBased={loadingContentBased}
            />
          </Grid.Column>
        </Grid>
      )}

      {isMovil && (
        <Grid className="explore-movil">
          <Grid.Row>
            <Movies
              refetch={refetch}
              getMovies={getRecommendedMovies}
              recomendations={true}
            />
          </Grid.Row>
          <Grid.Row>
            <Movies
              refetch={refetchMoviesContent}
              getMovies={moviesContentBased}
              contentBased={true}
              idsMoviesContent={idsMoviesContent}
              loadingContentBased={loadingContentBased}
            />
          </Grid.Row>
        </Grid>
      )}

      {showModal && (
        <ModalBasic
          size={"large"}
          show={showModal}
          setShow={setShowModal}
          title={"Géneros que has calificado"}
        >
          <div style={{ padding: 20 }}>
            <Bar
              data={{
                labels: perfil.map((object) => object.genero),
                datasets: [
                  {
                    label: "Puntuación de género",
                    data: perfil.map((object) => object.Total),
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 206, 86, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                      "rgba(153, 102, 255, 0.2)",
                      "rgba(255, 159, 64, 0.2)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(255, 159, 64, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>
        </ModalBasic>
      )}
    </>
  );
}
