// LoginPage.jsx
import React, { useRef, useState } from "react";
import { useAuth } from "../../src/Context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Login.scss";
import mapGraphic from "../../files/map-graphic.webp";

const LoginPage = () => {
  const formRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setErrorMessage(""); // clear previous error

    const form = formRef.current;
    if (!form || !form.checkValidity()) {
      form.reportValidity?.();
      return;
    }

    const email = form.email.value;
    const password = form.password.value;

    const formData = new FormData();
    formData.append("EmailAdress", email); // make sure this matches backend
    formData.append("Password", password);

    try {
      const success = await login(formData);

      if (success) {
        sessionStorage.setItem("userEmail", email);
        navigate("/");
      } else {
        setErrorMessage("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage(error.message || "Login failed. Please try again.");
    }
  };

  return (
    <section className="login" aria-label="Login page">
      <div className="login__card">
        <div className="login__left">
          <div className="login__content">
            <h1 className="login__welcome">Welcome back!</h1>
            <p className="login__lead">
              Welcome back home, welcome back to the action.
            </p>

            {/* Inline error alert */}
            {errorMessage && (
              <div
                className="login__alert login__alert--error"
                role="alert"
              >
                <span className="login__alert-icon">!</span>
                <span className="login__alert-text">{errorMessage}</span>
              </div>
            )}

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className={`login__form ${submitted ? "is-submitted" : ""}`}
            >
              <div className="login__group">
                <label htmlFor="email">
                  E-mail address <span className="req">*</span>
                </label>
                <input id="email" name="email" type="email" required />
                <span className="field__error">This field is required</span>
              </div>

              <div className="login__group">
                <label htmlFor="password">
                  Password <span className="req">*</span>
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  minLength={8}
                  required
                />
                <span className="field__error">This field is required</span>
                {/* <a className="login__forgot" href="/forgot">
                  Forgot password?
                </a> */}
              </div>

              <button className="login__btn" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>

            <p className="login__signup">
              Don't have an account yet?{" "}
              <Link to="/sign-up" className="login__signup-link">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        <aside className="login__right" aria-hidden="true">
          <div className="login__right-inner">
            <h2 className="login__hero">Explore beyond borders.</h2>
            <p className="login__subtitle">
              Discover cultures, challenge ideas, and shape the future of
              Europe—together.
            </p>
            <img
              className="login__map"
              src={mapGraphic}
              alt="Map graphic"
            />
          </div>
        </aside>
      </div>
    </section>
  );
};

export default LoginPage;
