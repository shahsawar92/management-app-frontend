import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SigninForm = () => {
  const navigate = useNavigate();
  const [errorMsg, seterrorMsg] = useState("");
  const [isSubmitting, setisSubmitting] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("No password provided."),
    }),
    onSubmit: (values) => {
      console.log(values);
      setisSubmitting(true);
      axios({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        url: "http://localhost:3000/login",
        data: values,
      })
        .then(function (res) {
          setisSubmitting(false);
          if (res?.data?.success) {
            seterrorMsg("");
          }
          console.log(res);
          localStorage.setItem("token", res?.data?.data?.token);
          localStorage.setItem("userData", JSON.stringify(res?.data?.data));
          if (res?.data?.data?.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/profile");
          }
        })
        .catch(function (res) {
          //   alert(res?.response?.data?.message);
          console.log(res?.message);
          seterrorMsg(res?.response?.data?.message || res?.message);
          setisSubmitting(false);
        });
    },
  });
  return (
    <>
      {errorMsg && (
        <div className="bg-warn text-danger alert alert-danger">{errorMsg}</div>
      )}
      <h1 className="my-2 container px-5 my-5 mx-auto col-10 col-md-4">
        Login
      </h1>
      <form
        className="my-2 container px-5 border border-1 border-green my-5 mx-auto col-10 col-md-4"
        onSubmit={formik.handleSubmit}
      >
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          className="my-2 form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className=" form-text text-danger">{formik.errors.email}</div>
        ) : null}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          className="my-2 form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className=" form-text text-danger">{formik.errors.password}</div>
        ) : null}

        <button type="submit" className="my-2 btn px-5 btn-primary ">
          {!isSubmitting && "Submit"}
          {isSubmitting && (
            <div class="spinner-border text-light" role="status">
              <span class="sr-only"></span>
            </div>
          )}
        </button>
      </form>
    </>
  );
};

export default SigninForm;
