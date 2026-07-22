import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { FeedbackProvider } from "./components/FeedbackModal";
import Home from "./pages/Home";
import { ProjectsPage, ProjectDetailPage } from "./pages/Projects";
import { BlogPage, BlogDetailPage } from "./pages/Blog";

import "./index.css";
import "./pages/Home.css";
import "./pages/Projects.css";
import "./pages/Blog.css";

/**
 * Jump to the top on navigation — unless the URL carries a hash,
 * in which case scroll to that section (e.g. "/#contact" from the footer).
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait a frame so the target section exists in the DOM.
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <FeedbackProvider>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
        </Routes>
        <Footer />
      </FeedbackProvider>
    </BrowserRouter>
  );
}
