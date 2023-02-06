import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import styles from "@/styles/PostForm.module.css";

const EditCommentForm = ({ comment, fetchData, setIsEditing }) => {
  const UploadImageSchema = Yup.object().shape({
    texto: Yup.string().required("Required"),
  });

  return (
    <Formik
      initialValues={{
        texto: comment.texto,
      }}
      validationSchema={UploadImageSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const post = new FormData();
        post.append("texto", values.texto);
        setSubmitting(true);
        fetch(`http://localhost:3000/api/comment/${comment.id}`, {
          method: "PATCH",
          body: post,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            fetchData();
            resetForm();
            setIsEditing(false);
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

export default EditCommentForm;
