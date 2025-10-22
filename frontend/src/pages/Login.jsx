import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../schema";
import { APiRequest } from "../services/ApiRequest";
import { toast } from "react-toastify";
import { useState } from "react";

const initialValues = {
  email: "",
  password: "",
};

function Login() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values, action) => {
        try {
          setLoading(true);
          const res = await APiRequest.login(values);
          const { token, user } = res.data;

          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));

          toast.success("Login successful!");
          navigate("/add");

          action.resetForm();
        } catch (error) {
          console.error("error:", error);
          toast.error("Invalid email or password!");
        } finally {
          setLoading(false);
        }
      },
    });

  return (
    <div className="main">
      <div className="card">
        <h2 className="card__title">Login</h2>
        <form onSubmit={handleSubmit}>
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
              value={values.password}
              placeholder="Enter your password"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password ? (
              <p className="form-error">{errors.password}</p>
            ) : null}
          </div>

          <button className="btn" type="submit">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="bottom-text">
          Create an account?{" "}
          <Link to="/signup" className="login-link">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
