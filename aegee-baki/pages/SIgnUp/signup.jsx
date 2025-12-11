// SignupPage.jsx
import React, { useRef, useState } from "react";
import { useAuth } from "../../src/Context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.scss";
import mapGraphic from "../../files/map-graphic.webp";

const SignupPage = () => {
  const formRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = formRef.current;
    setSubmitted(true);
    setPasswordError("");

    if (!form || !form.checkValidity()) {
      form.reportValidity?.();
      return;
    }

    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    // 🔹 custom password confirmation check
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      // optional: make browser show native bubble as well
      if (form.confirmPassword.setCustomValidity) {
        form.confirmPassword.setCustomValidity("Passwords do not match.");
        form.confirmPassword.reportValidity?.();
      }
      return;
    } else if (form.confirmPassword.setCustomValidity) {
      form.confirmPassword.setCustomValidity("");
    }

    const formData = new FormData();
    formData.append("FirstName", form.firstName.value);
    formData.append("LastName", form.lastName.value);
    formData.append("Email", email);
    formData.append("Password", password);

    try {
      const response = await register(formData);

      if (response) {
        navigate("/profile");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert(error.message || "Registration failed");
    }
  };

  return (
    <>
      <section className="signup" aria-label="Signup page">
        <div className="signup__card">
          <div className="signup__left">
            <div className="signup__content">
              <h1 className="signup__title">Welcome to AEGEE-Bakı!</h1>
              <p className="signup__lead">
                Enter your details to connect, explore, and make an impact across
                Europe.
              </p>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                action="#"
                method="post"
                className={`signup__form ${submitted ? "is-submitted" : ""}`}
              >
                {/* first / last on one line */}
                <div className="signup__row signup__row--two">
                  <div className="signup__group">
                    <label htmlFor="firstName">
                      First name <span className="req">*</span>
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                    />
                    <span className="field__error">This field is required</span>
                  </div>

                  <div className="signup__group">
                    <label htmlFor="lastName">
                      Last name <span className="req">*</span>
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                    />
                    <span className="field__error">This field is required</span>
                  </div>
                </div>

                <div className="signup__group">
                  <label htmlFor="email">
                    E-mail adress <span className="req">*</span>
                  </label>
                  <input id="email" name="email" type="email" required />
                  <span className="field__error">This field is required</span>
                </div>

                <div className="signup__group">
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
                </div>

                <div className="signup__group">
                  <label htmlFor="confirmPassword">
                    Confirm Password <span className="req">*</span>
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                  />
                  <span className="field__error">This field is required</span>
                  {passwordError && (
                    <span className="field__error">
                      {passwordError}
                    </span>
                  )}
                </div>

                <button className="signup__btn" type="submit" disabled={loading}>
                  {loading ? "Signing up..." : "Sign up"}
                </button>

                <p className="signup__login">
                  Already have an account?{" "}
                  <Link to="/log-in" className="signup__login-link">
                    Log in
                  </Link>
                </p>
              </form>
            </div>
          </div>

          <aside className="signup__right" aria-hidden="true">
            <div className="signup__right-inner">
              <h2 className="signup__hero">Explore beyond borders.</h2>
              <p className="signup__subtitle">
                Discover cultures, challenge ideas, and shape the future of
                Europe—together.
              </p>
              <img
                className="signup__map"
                src={mapGraphic}
                alt="Map graphic"
              />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};

export default SignupPage;
