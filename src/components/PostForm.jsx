import React, { useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "@/styles/PostForm.module.css";
import { useRouter } from "next/router";

const UploadImageSchema = Yup.object().shape({
  legenda: Yup.string().required("Required"),
});

const PostForm = ({ user, fetchData }) => {
  const inputRef = useRef(null);
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        legenda: "",
        conteudo: null,
      }}
      validationSchema={UploadImageSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const post = new FormData();
        post.append("legenda", values.legenda);
        post.append("user", user.cpf);
        post.append("nome_usuario", user.nome_usuario);
        if (values.conteudo)
          post.append("conteudo", values?.conteudo, values?.conteudo?.name);
        setSubmitting(true);
        fetch("http://localhost:3000/api/post/", {
          method: "POST",
          body: post,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            fetchData();
          })
          .catch((error) => {
            console.error("Error:", error);
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
            Postar
          </button>
        </Form>
      )}
    </Formik>
  );
};
export default PostForm;
