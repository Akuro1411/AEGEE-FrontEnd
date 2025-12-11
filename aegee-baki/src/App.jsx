import React from "react";
import Header from "../components/Header/header";
import Footer from "../components/Footer/Footer";
import Home from "../pages/Home/home";
import About from "../pages/About/about";
import Events from "../pages/Events/Events";
import Projects from "../pages/Projects/Projects";
import LoginPage from "../pages/LogIn/Login";
import SignupPage from "../pages/SIgnUp/signup";
import NotFound from "../pages/404/404";
import ProfilePage from "../pages/profile/profile-default";
import IndivitalEvent from "../pages/IndividualEvent/IndividualEvent";
import IndividualProject from '../pages/IndividualProjects/IndividualProject';
import NewsDetail from "../pages/News/News";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TitleManager } from "../src/titleManager";

const App = () => {
  return (
    <BrowserRouter>
      <TitleManager />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/log-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/events/:slugId" element={<IndivitalEvent />} />
        <Route path="/projects/:slugId" element={<IndividualProject />}/>
        <Route path="/announcements/:slugId" element={<NewsDetail />} />

       

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
