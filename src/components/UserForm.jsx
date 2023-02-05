import React, { useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UploadImageSchema = Yup.object().shape({
  nome_completo: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  data_nascimento: Yup.date().required("Required"),
  nome_usuario: Yup.string().required("Required"),
  senha: Yup.string().required("Required"),
  cpf: Yup.string().required("Required"),
  foto_perfil: Yup.mixed().required("Required"),
});

const UserForm = () => {
  const inputRef = useRef(null);

  return (
    <Formik
      initialValues={{
        nome_completo: "",
        email: "",
        data_nascimento: "",
        nome_usuario: "",
        senha: "",
        cpf: "",
        foto_perfil: null,
      }}
      validationSchema={UploadImageSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const data = new FormData();
        data.append("nome_completo", values.nome_completo);
        data.append("email", values.email);
        data.append("data_nascimento", values.data_nascimento);
        data.append("nome_usuario", values.nome_usuario);
        data.append("senha", values.senha);
        data.append("cpf", values.cpf);
        data.append("foto_perfil", values.foto_perfil);

        try {
          const res = await axios.post("http://localhost:3000/api/user", data);
          console.log(res);
          setSubmitting(false);
          resetForm();
        } catch (err) {
          console.log(err);
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          <div>
            <label htmlFor="nome_completo">Nome completo</label>
            <Field type="text" name="nome_completo" />
            <ErrorMessage name="nome_completo" component="div" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <label htmlFor="data_nascimento">Data nascimento</label>
            <Field type="date" name="data_nascimento" />
            <ErrorMessage name="data_nascimento" component="div" />
          </div>
          <div>
            <label htmlFor="nome_usuario">Nome de usuário</label>
            <Field type="text" name="nome_usuario" />
            <ErrorMessage name="nome_usuario" component="div" />
          </div>
          <div>
            <label htmlFor="senha">Senha</label>
            <Field type="password" name="senha" />
            <ErrorMessage name="senha" component="div" />
          </div>
          <div>
            <label htmlFor="cpf">CPF</label>
            <Field type="text" name="cpf" />
            <ErrorMessage name="cpf" component="div" />
          </div>
          <div>
            <label htmlFor="foto_perfil">Foto de perfil</label>
            <input
              type="file"
              name="foto_perfil"
              ref={inputRef}
              onChange={(event) => {
                setFieldValue("foto_perfil", event.currentTarget.files[0]);
              }}
            />
            <ErrorMessage name="foto_perfil" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};
export default UserForm;
