import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const SignupForm = () => {
  const [errorMsg, seterrorMsg] = useState("");
  const [isSubmitting, setisSubmitting] = useState(false);
  const [userAdd, setuserAdd] = useState();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const redirect = urlParams.get("redirect");
  console.log("here: ", redirect);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      role: "admin",
      isBlocked: false,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(25, "Must be 25 characters or less")
        .required("Required"),
      phone: Yup.string()
        .required("required")
        .matches(phoneRegExp, "Phone number is not valid")
        .min(10, "too short")
        .max(10, "too long"),

      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
      role: Yup.string().required("Select a role"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);

      if (redirect && redirect === "add") {
        values = { ...values, ...{ create: true } };
      }
      console.log(values);
      setisSubmitting(true);
      axios({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        url: "http://localhost:3000/register",
        data: values,
      })
        .then(function (res) {
          setisSubmitting(false);
          if (res?.data?.success) {
            seterrorMsg("");
          }
          console.log(res);
          if (redirect && redirect === "add") {
            setuserAdd({
              email: res?.data?.data?.email,
              password: values?.password,
            });
          } else {
            localStorage.setItem("token", res?.data?.data?.token);
            localStorage.setItem("userData", JSON.stringify(res?.data?.data));
            navigate("/dashboard");
          }
        })
        .catch(function (res) {
          //   alert(res?.response?.data?.message);
          seterrorMsg(res?.response?.data?.message);
          setisSubmitting(false);
        });
    },
  });
  return (
    <>
      {errorMsg && (
        <div className="bg-warn text-danger alert alert-danger">{errorMsg}</div>
      )}
      {userAdd && (
        <div className="bg-warn text-danger alert alert-danger">
          User Added:
          <div>Email: {userAdd?.email}</div>
          <div>Password: {userAdd?.password}</div>
          <button
            className="btn btn-lg  btn-primary"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            {" "}
            Back to dashboard
          </button>
        </div>
      )}
      <h1 className="my-2 container px-5 my-5 mx-auto col-10 col-md-4">
        {redirect && redirect === "add" ? " Add User" : "Sign In"}
      </h1>
      <form
        className="my-2 container px-5 border border-1 border-green my-5 mx-auto col-10 col-md-4"
        onSubmit={formik.handleSubmit}
      >
        <label htmlFor="name">First Name</label>
        <input
          id="name"
          name="name"
          type="text"
          className="my-2 form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className=" form-text text-danger">{formik.errors.name}</div>
        ) : null}

        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          name="phone"
          type="number"
          className="my-2 form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
        />
        {formik.touched.phone && formik.errors.phone ? (
          <div className=" form-text text-danger">{formik.errors.phone}</div>
        ) : null}

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
        {redirect && redirect === "add" && (
          <>
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              className="my-2 form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.role}
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            {formik.touched.role && formik.errors.role ? (
              <div className="form-text text-danger">{formik.errors.role}</div>
            ) : null}
          </>
        )}
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

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="confirmPassword"
          className="my-2 form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className=" form-text text-danger">
            {formik.errors.confirmPassword}
          </div>
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

export default SignupForm;
