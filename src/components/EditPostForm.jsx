import React, { useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "@/styles/PostForm.module.css";
import { useRouter } from "next/router";

const UploadImageSchema = Yup.object().shape({
  legenda: Yup.string().required("Required"),
});

const EditPostForm = ({ post, fetchData, setIsEditing }) => {
  const inputRef = useRef(null);

  return (
    <Formik
      initialValues={{
        legenda: post.legenda,
        conteudo: null,
      }}
      validationSchema={UploadImageSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const edited = new FormData();
        edited.append("legenda", values.legenda);
        if (values.conteudo)
          edited.append("conteudo", values?.conteudo, values?.conteudo?.name);
        setSubmitting(true);
        fetch(`http://localhost:3000/api/post/${post.id}`, {
          method: "PATCH",
          body: edited,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            fetchData();
            setIsEditing(false);
          })
          .catch((error) => {
            console.error("Error:", error);
            setIsEditing(false);
          });
      }}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className={styles.formContainer}>
          <div className={styles.formField}>
            <label htmlFor="legenda" className={styles.formLabel}>
              Texto
            </label>
            <Field type="text" name="legenda" className={styles.formInput} />
            <ErrorMessage name="legenda" component="div" />
          </div>
          <div className={styles.formField}>
            <label htmlFor="conteudo" className={styles.formLabel}>
              Imagem
            </label>
            <input
              type="file"
              name="conteudo"
              ref={inputRef}
              onChange={(event) => {
                setFieldValue("conteudo", event.currentTarget.files[0]);
              }}
              className={styles.formInput}
            />
            <ErrorMessage name="conteudo" component="div" />
          </div>
          <button
            type="submit"
            className={styles.formSubmit}
            disabled={isSubmitting}
          >
            Salvar
          </button>
        </Form>
      )}
    </Formik>
  );
};
export default EditPostForm;
