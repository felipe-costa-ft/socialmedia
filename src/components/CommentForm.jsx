import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import styles from "@/styles/PostForm.module.css";

const CommentForm = ({ key, postId, userCPF, username, fetchData }) => {
  const UploadImageSchema = Yup.object().shape({
    texto: Yup.string().required("Required"),
  });

  return (
    <Formik
      initialValues={{
        texto: "",
      }}
      validationSchema={UploadImageSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const post = new FormData();
        post.append("texto", values.texto);
        post.append("postagem_id", postId);
        post.append("fk_usuario_cpf", userCPF);
        post.append("fk_usuario_nome_usuario", username);
        setSubmitting(true);
        fetch("http://localhost:3000/api/comment/", {
          method: "POST",
          body: post,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            fetchData();
            resetForm();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className={styles.formContainer}>
          <div className={styles.formField}>
            <label htmlFor="texto" className={styles.formLabel}>
              Texto
            </label>
            <Field type="text" name="texto" className={styles.formInput} />
            <ErrorMessage name="texto" component="div" />
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

export default CommentForm;
