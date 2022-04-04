import React from "react";
import "./PhoneForm.scss";
import { Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";

export default function PhoneForm({ setShowModal, currentPhones, refetch }) {
  const [updateUser] = useMutation(UPDATE_USER);

  return (
    <div>
      <Formik
        initialValues={{
          phone: currentPhones,
        }}
        validationSchema={Yup.object({
          phone: Yup.array().of(Yup.string()),
        })}
        onSubmit={async (formData) => {
          let bandera = false;

          formData.phone.forEach((tel) => {
            if (tel.length < 6) {
              bandera = true;
            }
          });

          if (bandera) {
            toast.error("Los teléfonos deben ser de por lo menos 6 números");
            return;
          }
          try {
            await updateUser({
              variables: {
                input: formData,
              },
            });

            refetch();
            setShowModal(false);
          } catch (error) {
            toast.error("Error al actualizar los teléfonos");
          }
        }}
        render={({ values }) => (
          <Form className="phone-form">
            <FieldArray
              name="phone"
              render={(arrayHelpers) => (
                <div>
                  {values.phone && values.phone.length > 0 ? (
                    values.phone.map((phone, index) => (
                      <div key={index} className="input-container">
                        <Field
                          name={`phone.${index}`}
                          className="input-phone"
                        />
                        <Button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                        >
                          -
                        </Button>
                        <Button
                          type="button"
                          className="btn-plus"
                          onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                        >
                          +
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="btn-container">
                      <Button
                        type="button"
                        className="btn-add-phone"
                        onClick={() => arrayHelpers.push("")}
                      >
                        Agregar nuevo teléfono
                      </Button>
                    </div>
                  )}
                  <div className="btn-container">
                    <Button type="submit" className="btn-phones-submit">
                      Actualizar
                    </Button>
                  </div>
                </div>
              )}
            />
          </Form>
        )}
      ></Formik>
    </div>
  );
}
