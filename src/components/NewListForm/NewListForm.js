import React from "react";
import "./NewListForm.scss";
import { Form, TextArea, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import {
  ADD_EMPTY_LIST,
  ADD_LIST_WITH_MOVIE,
  CHANGE_LIST_NAME,
} from "../../gql/lists";

export default function NewListForm({
  setShowModal,
  currentName,
  refetch,
  edit,
  withMovie,
  idMovie,
}) {
  const [addEmptyList] = useMutation(ADD_EMPTY_LIST);
  const [addListWithMovie] = useMutation(ADD_LIST_WITH_MOVIE);
  const [changeListName] = useMutation(CHANGE_LIST_NAME);

  const formik = useFormik({
    initialValues: {
      listName: currentName || "",
    },
    validationSchema: Yup.object({
      listName: Yup.string().required(),
    }),
    onSubmit: async (formData) => {
      if (edit) {
        try {
          await changeListName({
            variables: {
              listName: currentName,
              newName: formData.listName,
            },
          });

          refetch();
          setShowModal(false);
        } catch (error) {
          toast.error(error.message);
        }
      } else if (withMovie) {
        try {
          await addListWithMovie({
            variables: {
              listName: formData.listName,
              idMovie,
            },
          });

          refetch();
          setShowModal(false);
        } catch (error) {
          toast.error(error.message);
        }
      } else {
        try {
          await addEmptyList({
            variables: {
              listName: formData.listName,
            },
          });

          refetch();
          setShowModal(false);
        } catch (error) {
          toast.error(error.message);
        }
      }
    },
  });

  return (
    <Form className="new-list-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="listName"
        value={formik.values.listName}
        onChange={formik.handleChange}
        className={formik.errors.listName && "error"}
      />

      <Button type="submit" className="btn-submit">
        {edit ? "Actualizar" : " Crear"}
      </Button>
    </Form>
  );
}
