// pages/IndividualProjects/IndividualProject.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./IndividualProject.scss";

import { fetchProjectDetails } from "../../src/api/individualProject";

import ProjectHero from "./sections/projectHero/projectHero";
import ProjectInfo from "./sections/ProjectInfo/projectInfo";
import ActivitiesSection from "./sections/activities/Activities";
import Contributors from "../../components/Contributors/Contributors";
import GallerySection from "./sections/galery/galery";
// import FaqSection from "./sections/FaqSection/FaqSection";
import FinalCta from "./sections/cta/cta";

const ProjectPage = () => {
  const { slugId } = useParams(); // now matches :slugId in route
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      if (!slugId) {
        if (isMounted) {
          setError("Invalid project slug.");
          setLoading(false);
        }
        return;
      }

      try {
        setLoading(true);
        const data = await fetchProjectDetails(slugId); // 👈 pass slug directly
        if (isMounted) {
          setProject(data);
          setError("");
        }
      } catch (err) {
        console.error("Failed to load project details:", err);
        if (isMounted) {
          setError("Something went wrong while loading this project.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [slugId]);

  if (loading) {
    return (
      <main className="project-page container">
        <div className="project-page__loading">Loading…</div>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="project-page container">
        <div className="project-page__error">
          {error || "Project not found."}
        </div>
      </main>
    );
  }

  const heroImage = project.images?.[0] || "";
  const activityImages = project.images?.slice(0, 4) || [];
  const galleryImages = project.images?.slice(4) || [];

  return (
    <main className="project-page">
      <ProjectHero
        headline={project.slogan || project.title}
        backgroundImage={heroImage}
      />

      <ProjectInfo
        image={heroImage}
        title={project.title}
        description={project.description}
      />

      <ActivitiesSection
        title="ACTIVITIES"
        description={project.activities}
        images={activityImages}
      />

       <div className="partners ">
        <div className="container text">
          <h2>Our Partners</h2>
          <p>
            We are proud to collaborate with leading youth and community
            organizations that share our vision for an active, engaged and
            forward-thinking generation. Together with our partners, we support
            projects that empower young people, strengthen civil society and
            create lasting positive impact.
          </p>
        </div>
        <Contributors />
      </div>
      
      <GallerySection title="GALERY" images={galleryImages} />

      {/* <FaqSection faqs={project.faqs} /> */}
      <FinalCta />
    </main>
  );
};

export default ProjectPage;
