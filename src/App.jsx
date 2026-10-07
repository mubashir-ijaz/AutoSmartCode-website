import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { FeedbackProvider } from "./components/FeedbackModal";
import { RouteProgress, RouteFade } from "./components/RouteTransition";
import Home from "./pages/Home";
import About from "./pages/About";
import { ProjectsPage, ProjectDetailPage } from "./pages/Projects";
import { BlogPage, BlogDetailPage } from "./pages/Blog";
import { ServicesPage, ServiceDetailPage } from "./pages/Services";
import RootSlug from "./pages/RootSlug";

import "./index.css";
import "./pages/Home.css";
import "./pages/Projects.css";
import "./pages/Blog.css";
import "./pages/Services.css";

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
        <RouteProgress />
        <Navbar />
        <RouteFade>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          {/* Scraper and web-design landing pages live at the root so the URL
              is an exact match for the query ("/autotrader-scraper"). Static
              routes above always win in React Router, so this only catches the
              rest — and unknown slugs render a noindex not-found state. */}
          <Route path="/:slug" element={<RootSlug />} />
          {/* Deeper unknown paths ("/a/b") get the same noindex not-found
              state, rather than an empty page between the nav and footer. */}
          <Route path="*" element={<RootSlug />} />
        </Routes>
        </RouteFade>
        <Footer />
      </FeedbackProvider>
    </BrowserRouter>
  );
}
