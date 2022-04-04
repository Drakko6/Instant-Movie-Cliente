import React from "react";
import "./ContactEmailForm.scss";
import { Form, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";

export default function ContactEmailForm({
  setShowModal,
  currentContactEmail,
  refetch,
}) {
  const [updateUser] = useMutation(UPDATE_USER);

  const formik = useFormik({
    initialValues: {
      contactEmail: currentContactEmail || "",
    },
    validationSchema: Yup.object({
      contactEmail: Yup.string().email().required(),
    }),
    onSubmit: async (formData) => {
      try {
        await updateUser({
          variables: {
            input: formData,
          },
        });

        refetch();
        setShowModal(false);
      } catch (error) {
        toast.error("Error al actualizar tu correo de contacto");
      }
    },
  });

  return (
    <Form className="contactEmail-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        placeholder="Actualiza tu correo de contacto"
        name="contactEmail"
        value={formik.values.contactEmail}
        onChange={formik.handleChange}
        error={formik.errors.contactEmail && true}
      />

      <Button type="submit" className="btn-submit">
        Actualizar
      </Button>
    </Form>
  );
}
