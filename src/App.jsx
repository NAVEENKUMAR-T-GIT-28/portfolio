import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { ParticleBackground } from "./components/ui/ParticleBackground";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";

// Pages
import Home from "./pages/Home";
import Overview from "./pages/Overview";
import Experience from "./pages/Experience";
import Technologies from "./pages/Technologies";
import Projects from "./pages/Projects";
import Certifications from "./pages/Certifications";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-dvh text-foreground flex flex-col">
        <ParticleBackground />
        <div className="relative z-10 flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1" id="main-content" tabIndex={-1}>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/"               element={<Home />} />
                <Route path="/overview"       element={<Overview />} />
                <Route path="/experience"     element={<Experience />} />
                <Route path="/technologies"   element={<Technologies />} />
                <Route path="/projects"       element={<Projects />} />
                <Route path="/certifications" element={<Certifications />} />
                <Route path="/contact"        element={<Contact />} />
                <Route path="*"              element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}

function NotFound() {
  return (
    <div className="page-shell flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <p className="text-7xl font-extrabold text-gradient mb-4" style={{ fontFamily: "var(--font-display)" }}>
          404
        </p>
        <h1 className="text-xl font-bold mb-2">Page not found</h1>
        <p className="text-sm text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a href="/" className="btn btn-primary">
          Go home
        </a>
      </div>
    </div>
  );
}