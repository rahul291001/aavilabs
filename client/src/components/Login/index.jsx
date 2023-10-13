import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import Swal from "sweetalert2";
const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      setError("");
      // Display a SweetAlert success message
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Sign In Successfully completed",
      }).then(() => {
        window.location = "/main";
      });
    } catch (error) {
      if (error.response) {
        setError("Sign In failed. Please check your credentials.");
        // Display a SweetAlert error message
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Sign In failed. Please check your credentials.",
        });
      }
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h2>Welcome back to the magic</h2>

            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sing In
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>New Here ?</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sing Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
