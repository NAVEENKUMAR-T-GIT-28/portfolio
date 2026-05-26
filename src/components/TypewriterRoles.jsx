import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function TypewriterRoles({ roles = [] }) {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (roles.length === 0) return;

    const currentRole = roles[roleIndex];
    let timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setText(currentRole.substring(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }, 40); // Deleting speed
    } else {
      timeout = setTimeout(() => {
        setText(currentRole.substring(0, text.length + 1));
        if (text.length === currentRole.length) {
          timeout = setTimeout(() => setIsDeleting(true), 2500); // Pause before deleting
        }
      }, 80); // Typing speed
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex, roles]);

  if (roles.length === 0) return null;

  return (
    <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start">
      <p className="text-xl sm:text-2xl font-medium text-muted-foreground whitespace-nowrap">
        {text}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          className="inline-block w-0.5 h-6 sm:h-7 ml-1.5 bg-primary align-middle rounded-full"
        />
      </p>
    </div>
  );
}
