import React from "react";
import "./AddressForm.scss";
import { Form, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";

export default function AddressForm({ setShowModal, currentAddress, refetch }) {
  const [updateUser] = useMutation(UPDATE_USER);

  const formik = useFormik({
    initialValues: {
      address: currentAddress || "",
    },
    validationSchema: Yup.object({
      address: Yup.string().required(),
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
        toast.error("Error al actualizar la dirección");
      }
    },
  });

  return (
    <Form className="address-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        placeholder="Actualiza tu dirección"
        name="address"
        value={formik.values.address}
        onChange={formik.handleChange}
        error={formik.errors.address && true}
      />

      <Button type="submit" className="btn-submit">
        Actualizar
      </Button>
    </Form>
  );
}
