import React, { useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "@/styles/PostForm.module.css";
import { useRouter } from "next/router";

const UploadImageSchema = Yup.object().shape({
  nome_completo: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  data_nascimento: Yup.date().required("Required"),
  nome_usuario: Yup.string().required("Required"),
  senha: Yup.string().required("Required"),
  cpf: Yup.string().required("Required"),
});

const EditUserForm = ({ user }) => {
  const inputRef = useRef(null);
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        nome_completo: user.nome_completo,
        email: user.email,
        data_nascimento: new Date(user.data_nascimento)
          .toISOString()
          .slice(0, 10),
        nome_usuario: user.nome_usuario,
        senha: user.senha,
        cpf: user.cpf,
        foto_perfil: null,
      }}
      validationSchema={UploadImageSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const edited = new FormData();
        edited.append("nome_completo", values.nome_completo);
        edited.append("email", values.email);
        edited.append("data_nascimento", values.data_nascimento);
        edited.append("nome_usuario", values.nome_usuario);
        edited.append("senha", values.senha);
        edited.append("cpf", values.cpf);
        if (values.foto_perfil)
          edited.append(
            "foto_perfil",
            values.foto_perfil,
            values.foto_perfil.name
          );
        setSubmitting(true);
        fetch(`http://localhost:3000/api/user/${user.cpf}`, {
          method: "PATCH",
          body: edited,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            router.push("/");
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className={styles.formContainer}>
          <div className={styles.formField}>
            <label htmlFor="nome_completo" className={styles.formLabel}>
              Nome completo
            </label>
            <Field
              type="text"
              name="nome_completo"
              className={styles.formInput}
            />
            <ErrorMessage name="nome_completo" component="div" />
          </div>
          <div className={styles.formField}>
            <label htmlFor="email" className={styles.formLabel}>
              Email
            </label>
            <Field type="email" name="email" className={styles.formInput} />
            <ErrorMessage name="email" component="div" />
          </div>
          <div className={styles.formField}>
            <label htmlFor="data_nascimento" className={styles.formLabel}>
              Data nascimento
            </label>
            <Field
              type="date"
              name="data_nascimento"
              className={styles.formInput}
            />
            <ErrorMessage name="data_nascimento" component="div" />
          </div>
          <div className={styles.formField}>
            <label htmlFor="nome_usuario" className={styles.formLabel}>
              Nome de usuário
            </label>
            <Field
              type="text"
              name="nome_usuario"
              className={styles.formInput}
            />
            <ErrorMessage name="nome_usuario" component="div" />
          </div>
          <div className={styles.formField}>
            <label htmlFor="senha" className={styles.formLabel}>
              Senha
            </label>
            <Field type="password" name="senha" className={styles.formInput} />
            <ErrorMessage name="senha" component="div" />
          </div>
          <div className={styles.formField}>
            <label htmlFor="cpf" className={styles.formLabel}>
              CPF
            </label>
            <Field type="text" name="cpf" className={styles.formInput} />
            <ErrorMessage name="cpf" component="div" />
          </div>
          <div className={styles.formField}>
            <label htmlFor="foto_perfil" className={styles.formLabel}>
              Foto de perfil
            </label>
            <input
              type="file"
              name="foto_perfil"
              ref={inputRef}
              onChange={(event) => {
                setFieldValue("foto_perfil", event.currentTarget.files[0]);
              }}
              className={styles.formInput}
            />
            <ErrorMessage name="foto_perfil" component="div" />
          </div>
          <button
            type="submit"
            className={styles.formSubmit}
            disabled={isSubmitting}
          >
            Registrar
          </button>
        </Form>
      )}
    </Formik>
  );
};
export default EditUserForm;
