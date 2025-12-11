import React, { useMemo, useState, useEffect } from "react";
import "./settings.scss";
import { useProfile } from "../../src/Context/ProfileContext"; 

const IconClose = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 14 14" aria-hidden="true">
    <path stroke="#898989" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 1 1 13M1 1l12 12"/>
  </svg>
);

export default function SettingsPanel({
  initialProfile,
  onSaveProfile,
  onChangePassword,
  onToggleNewsletter,
}) {
  const { getUser, changeUser, changePassword,user } = useProfile();
  const [profile, setProfile] = useState({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  gender: "",
  birthday: "",
  about: "",
  newsletter: false,
});

 useEffect(() => {
  const fetchUser = async () => {
    try {
      const userData = await getUser();
      setProfile({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        phone: userData.phone || "",
        gender: userData.gender || "",
        birthday: userData.birthday || "",
        about: userData.aboutMe || "",
        newsletter: userData.newsletter || false,
      });
    } catch (err) {
      console.error("Failed to fetch user data", err);
    }
  };
  console.log("rrrrrr",user)
  fetchUser();
}, []);


  const [showAlert, setShowAlert] = useState(true);

  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  const [pwd1, setPwd1] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [pwdMsg, setPwdMsg] = useState({ type: "", text: "" });

  const [newsMsg, setNewsMsg] = useState("");

  const setField = (k, v) => setProfile((p) => ({ ...p, [k]: v }));

  const empty = (v) => !v || String(v).trim() === "";

  // const handleSave = async (e) => {
  //   e.preventDefault();
  //   setSaving(true);
  //   setSaveMsg("");
  //   try {
  //     if (onSaveProfile) await onSaveProfile(profile);
  //     setSaveMsg("Changes saved.");
  //   } catch {
  //     setSaveMsg("Couldn’t save changes. Try again.");
  //   } finally {
  //     setSaving(false);
  //   }
  // };

  const handleSave = async (e) => {
  e.preventDefault();
  setSaving(true);
  setSaveMsg("");

  try {
    if (changeUser) {
      const updatedData = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone,
        gender: profile.gender,
        birthday: profile.birthday,
        aboutMe: profile.about,
        newsletter: profile.newsletter,
      };
      await changeUser(updatedData); 
    }

    setSaveMsg("Changes saved.");
  } catch (err) {
    console.error(err);
    setSaveMsg("Couldn’t save changes. Try again.");
  } finally {
    setSaving(false);
  }
};

  useEffect(() => {
    if (!saveMsg) return;
    const t = setTimeout(() => setSaveMsg(""), 5000);
    return () => clearTimeout(t);
  }, [saveMsg]);

const handlePwd = async (e) => {
  e.preventDefault();
  setPwdMsg({ type: "", text: "" });

  if (!pwd1 || !pwd2) {
    setPwdMsg({ type: "error", text: "Both password fields are required." });
    return;
  }

  if (pwd1 !== pwd2) {
    setPwdMsg({ type: "error", text: "Passwords do not match." });
    return;
  }

  try {
    await changePassword(pwd1, pwd2);  
    setPwdMsg({ type: "success", text: "Password changed successfully." });
    setPwd1("");
    setPwd2("");
  } catch (err) {
    console.error(err);
    setPwdMsg({ type: "error", text: "Failed to change password. Try again." });
  }
};


  const toggleNewsletter = async () => {
    const next = !profile.newsletter;
    setProfile((p) => ({ ...p, newsletter: next }));
    setNewsMsg("");
    try {
      if (onToggleNewsletter) await onToggleNewsletter(next);
      setNewsMsg(next ? "Subscribed to newsletter." : "Unsubscribed from newsletter.");
    } catch {
      setNewsMsg("Couldn’t update newsletter preference.");
    }
  };

  return (
    <div className="settings">
      <section className="card about">
        <h3 className="card-title">About</h3>

        {showAlert && (
          <div className="about__alert">
            <img
              className="about__alert-stripe"
              src="../../files/vertical-line-f.svg"
              alt=""
              aria-hidden="true"
            />
            <div className="about__alert-content">
              <div className="about__alert-head">
                <span className="about__alert-title">Complete your profile</span>
                <button className="about__alert-close" onClick={() => setShowAlert(false)} aria-label="Close">
                  <IconClose />
                </button>
              </div>
              <p className="about__alert-text">
                Fill out your profile info completely to increase your chances of getting chosen for
                exclusive events and opportunities!
              </p>
            </div>
          </div>
        )}

        <form className="form" onSubmit={handleSave}>
          <div className="form-grid">
            <div className={`field ${empty(profile.firstName) ? "is-empty" : ""}`}>
              <label>
                First name<span className="req">*</span>
              </label>
              <input
                type="text"
                value={profile.firstName}
                onChange={(e) => setField("firstName", e.target.value)}
                placeholder="Enter first name"
                required
              />
              <small className="hint">{empty(profile.firstName) ? "Not provided yet" : "Saved"}</small>
            </div>

            <div className={`field ${empty(profile.lastName) ? "is-empty" : ""}`}>
              <label>
                Last name<span className="req">*</span>
              </label>
              <input
                type="text"
                value={profile.lastName}
                onChange={(e) => setField("lastName", e.target.value)}
                placeholder="Enter last name"
                required
              />
              <small className="hint">{empty(profile.lastName) ? "Not provided yet" : "Saved"}</small>
            </div>

            <div className={`field ${empty(profile.email) ? "is-empty" : ""}`}>
              <label>
                E-mail address<span className="req">*</span>
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setField("email", e.target.value)}
                placeholder="you@example.com"
                required
              />
              <small className="hint">{empty(profile.email) ? "Not provided yet" : "Saved"}</small>
            </div>

            <div className={`field ${empty(profile.phone) ? "is-empty" : ""}`}>
              <label>Phone</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setField("phone", e.target.value)}
                placeholder="+994 55 123 45 67"
              />
              <small className="hint">{empty(profile.phone) ? "Not provided yet" : "Saved"}</small>
            </div>

            <div className={`field ${empty(profile.gender) ? "is-empty" : ""}`}>
              <label>Gender</label>
              <select
                value={profile.gender}
                onChange={(e) => setField("gender", e.target.value)}
              >
                <option value="">Choose gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="nonbinary">Non-binary</option>
                <option value="na">Prefer not to say</option>
              </select>
              <small className="hint">{empty(profile.gender) ? "Not provided yet" : "Saved"}</small>
            </div>

            <div className={`field ${empty(profile.birthday) ? "is-empty" : ""}`}>
              <label>Birthday</label>
              <input
                type="date"
                value={profile.birthday}
                onChange={(e) => setField("birthday", e.target.value)}
              />
              <small className="hint">{empty(profile.birthday) ? "Not provided yet" : "Saved"}</small>
            </div>

            <div className={`field field--full ${empty(profile.about) ? "is-empty" : ""}`}>
              <label>About me</label>
              <textarea
                rows={4}
                value={profile.about}
                onChange={(e) => setField("about", e.target.value)}
                placeholder="Tell us a bit about yourself"
              />
              <small className="hint">{empty(profile.about) ? "Not provided yet" : "Saved"}</small>
            </div>
          </div>

          <div className="form__actions">
            <button className="btn-primary" type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
            {saveMsg && (
              <span className="form__status" aria-live="polite" role="status">
                {saveMsg}
              </span>
            )}
          </div>
        </form>
      </section>

      <section className="card account">
        <h3 className="card-title">Account Settings</h3>

        <div className="account__section account__section--divider">
          <h4 className="section-title">Change Password</h4>

          <form className="form" onSubmit={handlePwd}>
            <div className="form-grid form-grid--2">
              <div className="field">
                <label>
                  New Password<span className="req">*</span>
                </label>
                <input
                  type="password"
                  value={pwd1}
                  onChange={(e) => setPwd1(e.target.value)}
                  placeholder="Enter new password"
                  required
                />
              </div>
              <div className="field">
                <label>
                  Confirm Password<span className="req">*</span>
                </label>
                <input
                  type="password"
                  value={pwd2}
                  onChange={(e) => setPwd2(e.target.value)}
                  placeholder="Re-enter new password"
                  required
                />
              </div>
            </div>

            <div className="form__actions">
              <button className="btn-primary" type="submit">Change</button>
              {pwdMsg.text && (
                <span
                  className={`form__status ${pwdMsg.type === "error" ? "is-error" : "is-success"}`}
                  aria-live="polite"
                  role="status"
                >
                  {pwdMsg.text}
                </span>
              )}
            </div>
          </form>
        </div>

        {/* <div className="account__section">
          <h4 className="section-title">Newsletter</h4>

          <label className="newsletter__option">
            <input
              type="checkbox"
              checked={profile.newsletter}
              onChange={toggleNewsletter}
            />
            <span className="checkbox-box" aria-hidden="true" />
            <span className="newsletter__label">Subscribe to the AEGEE-Bakı Newsletter</span>
          </label>

          {newsMsg && <div className="form__status" aria-live="polite" role="status">{newsMsg}</div>}
        </div> */}
      </section>
    </div>
  );
}