import { useLocation } from "react-router-dom";
import { useTheme } from "@/components/theme/ThemeProvider";
import Particles from "./Particles";

export function ParticleBackground() {
  const { theme } = useTheme();
  const { pathname } = useLocation();

  const isDark = theme === "dark";
  const isHome = pathname === "/";
  const show = isDark || isHome;
  if (!show) return null;

  const colors = isDark
    ? ["#ffffff", "#22d3ee", "#60a5fa"]
    : ["#0ea5e9", "#2563eb", "#1e40af"];

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Particles
        particleColors={colors}
        particleCount={300}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={false}
        alphaParticles={false}
        disableRotation={false}
        pixelRatio={1}
      />
      <div className="absolute inset-0 bg-radial-glow" />
    </div>
  );
}
