import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Form, Input, Button, Alert, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const LoginForm = () => {
  const navigate = useNavigate();

  const initialValues = { email: "", password: "" };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", values);
      localStorage.setItem("authToken", res.data.token);
      setStatus({ success: res.data.message });
      navigate("/"); // Redirect to home after login
    } catch (err) {
      setStatus({ error: err.response?.data?.message || "Login failed" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <Title level={2}>Login</Title>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          isSubmitting,
          handleBlur,
          errors,
          touched,
          status,
        }) => (
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Email"
              validateStatus={touched.email && errors.email ? "error" : ""}
              help={touched.email && errors.email ? errors.email : null}
            >
              <Input
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              validateStatus={
                touched.password && errors.password ? "error" : ""
              }
              help={
                touched.password && errors.password ? errors.password : null
              }
            >
              <Input.Password
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>

            {status?.success && (
              <Alert
                message={status.success}
                type="success"
                style={{ marginBottom: 10 }}
              />
            )}
            {status?.error && (
              <Alert
                message={status.error}
                type="error"
                style={{ marginBottom: 10 }}
              />
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={isSubmitting}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
