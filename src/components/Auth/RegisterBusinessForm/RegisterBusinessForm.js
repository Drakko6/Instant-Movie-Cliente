import React, { useState } from "react";
import "./RegisterBusinessForm.scss";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import "../../../gql/user";
import { REGISTER } from "../../../gql/user";
import { toast } from "react-toastify";
import { estados } from "./estados";

const RegisterBusinessForm = ({ setShowLogin }) => {
  const states = estados.map((estado, index) => ({
    key: index,
    text: estado.name,
    value: estado.name,
  }));

  const productOptions = [
    { key: "Veterinaria", value: "Veterinaria", text: "Veterinaria" },
    { key: "Comida", value: "Comida", text: "Comida" },
    { key: "Juguetes", value: "Juguetes", text: "Juguetes" },
    { key: "Ropa", value: "Ropa", text: "Ropa" },
    { key: "Estética", value: "Estética", text: "Estética" },
    { key: "Guardería", value: "Guardería", text: "Guardería" },
    { key: "Entrenamiento", value: "Entrenamiento", text: "Entrenamiento" },
  ];

  const [register] = useMutation(REGISTER);
  const [cities, setCities] = useState([]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio"),

      username: Yup.string()
        .matches(/^[a-zA-Z0-9-]*$/, "Sólo letras y/o números y sin espacios")
        .required("El nombre de usuario es obligatorio"),
      email: Yup.string()
        .email("El correo no es válido")
        .required("El correo es obligatorio"),
      password: Yup.string()
        .required("La contraseña es obligatoria")
        .min(6, "Mínimo 6 caracteres")
        .oneOf([Yup.ref("repeatPassword")], "Las contraseñas deben coincidir"),

      repeatPassword: Yup.string()
        .required("La contraseña es obligatoria")
        .min(6, "Mínimo 6 caracteres")
        .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir"),
      type: Yup.string().required("El tipo de negocio es obligatorio"),

      state: Yup.string().required("El estado es obligatorio"),

      town: Yup.string().required("El municipio es obligatorio"),
    }),

    onSubmit: async (formData) => {
      try {
        const newUser = formData;
        delete newUser.repeatPassword;
        newUser.business = true;

        await register({
          variables: {
            input: newUser,
          },
        });
        toast.success("Usuario Registrado correctamente");
        toast.info("Revisa tu correo para confirmar tu cuenta");
        setShowLogin(true);
      } catch (error) {
        toast.error(error.message);
        console.log(error.message);
      }
    },
  });

  const onSelectState = (e, value) => {
    // setStateSelected(value);
    if (!value) {
      return;
    }
    let ciudades = estados.find((state) => state.name === value).states;

    ciudades = ciudades.map((ciudad, index) => ({
      key: index,
      text: ciudad,
      value: ciudad,
    }));
    setCities(ciudades);
  };

  const handleChange = (e, { name, value }) =>
    formik.setFieldValue(name, value);

  return (
    <>
      <h2 className="register-form-title">
        Participa ofreciendo tus productos a la comunidad de perritos
      </h2>
      <Form className="register-form" onSubmit={formik.handleSubmit}>
        <Form.Input
          type="text"
          placeholder="Nombre de tu negocio"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={
            formik.errors.name &&
            formik.errors.name && {
              content: `${formik.errors.name}`,
              pointing: "below",
            }
          }
        />
        <Form.Input
          type="text"
          placeholder="Nombre de usuario"
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          error={
            formik.errors.username &&
            formik.errors.username && {
              content: `${formik.errors.username}`,
              pointing: "below",
            }
          }
        />
        <Form.Input
          type="text"
          placeholder="Correo electronico"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={
            formik.errors.email &&
            formik.errors.email && {
              content: `${formik.errors.email}`,
              pointing: "below",
            }
          }
        />
        <Form.Input
          type="password"
          placeholder="Contraseña"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={
            formik.errors.password &&
            formik.errors.password && {
              content: `${formik.errors.password}`,
              pointing: "below",
            }
          }
        />
        <Form.Input
          type="password"
          placeholder="Repetir Contraseña"
          name="repeatPassword"
          onChange={formik.handleChange}
          value={formik.values.repeatPassword}
          error={
            formik.errors.repeatPassword &&
            formik.errors.repeatPassword && {
              content: `${formik.errors.repeatPassword}`,
              pointing: "below",
            }
          }
        />

        {/* Aquí select de negocios */}

        <Form.Dropdown
          clearable
          fluid
          name="type"
          value={formik.values.type}
          placeholder="Tipo de negocio/producto en que te especializas"
          options={productOptions}
          selection
          onChange={(e, { value, name }) => {
            handleChange(e, { name, value });
          }}
          error={
            formik.errors.type &&
            formik.errors.type && {
              content: `${formik.errors.type}`,
              pointing: "below",
            }
          }
        ></Form.Dropdown>

        {/* Aquí select de estados */}

        <Form.Dropdown
          clearable
          fluid
          search
          onChange={(e, { value, name }) => {
            handleChange(e, { name, value });
            onSelectState(e, value);
          }}
          name="state"
          value={formik.values.state}
          placeholder="Estado"
          options={states}
          selection
          error={
            formik.errors.state &&
            formik.errors.state && {
              content: `${formik.errors.state}`,
              pointing: "below",
            }
          }
        ></Form.Dropdown>

        {/* Aquí select de ciudades */}

        <Form.Dropdown
          clearable
          fluid
          search
          onChange={handleChange}
          name="town"
          value={formik.values.town}
          placeholder="Municipio"
          options={cities}
          selection
          error={
            formik.errors.town &&
            formik.errors.town && {
              content: `${formik.errors.town}`,
              pointing: "below",
            }
          }
        ></Form.Dropdown>

        <Button type="submit" className="btn-submit">
          Registrarse
        </Button>

        {/* <Button type="button" onClick={formik.handleReset}>
          Reiniciar Formulario
        </Button> */}
      </Form>
    </>
  );
};

function initialValues() {
  return {
    name: "",
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
    type: "",
    state: "",
    town: "",
  };
}

export default RegisterBusinessForm;
