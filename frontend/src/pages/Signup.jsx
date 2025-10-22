import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signupSchema } from "../schema";
import { APiRequest } from "../services/ApiRequest";
import { toast } from "react-toastify";
import { useState } from "react";

const initialValues = {
  fullname: "",
  email: "",
  password: "",
};

function Signup() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signupSchema,
      onSubmit: async (values, action) => {
        try {
          setLoading(true);
          const res = await APiRequest.signup(values);
          console.log(res?.data);
          toast.success("Signup successful!");
          action.resetForm();
          navigate("/login")
        } catch (error) {
          console.error("error:::::", error);
          toast.error("Signup failed!");
        } finally {
          setLoading(false);
        }
      },
    });

  return (
    <div className="main">
      <div className="card">
        <h2 className="card__title">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={values.fullname}
              name="fullname"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.fullname && touched.fullname ? (
              <p className="form-error">{errors.fullname}</p>
            ) : null}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email ? (
              <p className="form-error">{errors.email}</p>
            ) : null}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password ? (
              <p className="form-error">{errors.password}</p>
            ) : null}
          </div>

          <button className="btn" type="submit">
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>

        <p className="bottom-text">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
