import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Form, Input, Button, Alert, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const RegistrationForm = () => {
  const navigate = useNavigate();

  const initialValues = { fullName: "", email: "", password: "" };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      // 1. Register the user
      await axios.post("http://localhost:5000/api/register", values);

      // 2. Auto-login after successful registration
      const loginRes = await axios.post("http://localhost:5000/api/login", {
        email: values.email,
        password: values.password,
      });

      localStorage.setItem("authToken", loginRes.data.token);
      setStatus({ success: "Registration successful! Redirecting..." });

      // 3. Redirect to Home
      navigate("/");
    } catch (err) {
      setStatus({
        error: err.response?.data?.message || "Registration failed",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <Title level={2}>Register</Title>
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
              label="Full Name"
              validateStatus={
                touched.fullName && errors.fullName ? "error" : ""
              }
              help={
                touched.fullName && errors.fullName ? errors.fullName : null
              }
            >
              <Input
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>

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
                Register
              </Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;
