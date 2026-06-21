
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { ProjectsPage, ProjectDetailPage } from "./pages/Projects";
import { BlogPage, BlogDetailPage } from "./pages/Blog";
import "./index.css";
import "./pages/Home.css";
import "./pages/Projects.css";
import "./pages/Blog.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = window.location;
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
