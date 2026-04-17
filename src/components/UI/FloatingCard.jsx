import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const FloatingCard = ({ children, className = "", delay = 0 }) => {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);
  
  // Glint position
  const glintX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glintY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`glass rounded-2xl relative overflow-hidden group border border-white/10 hover:border-cyan-neon/50 transition-colors ${className}`}
    >
      {/* High-Tech Glint Effect */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
            background: `radial-gradient(circle at ${glintX} ${glintY}, rgba(0, 243, 255, 0.15) 0%, transparent 60%)`,
            opacity: hovered ? 1 : 0
        }}
      />

      {/* Grid Overlay for Gritty Feel */}
      <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none" 
           style={{ backgroundImage: "radial-gradient(var(--cyan-neon) 0.5px, transparent 0.5px)", backgroundSize: "10px 10px" }} 
      />

      {/* Content with 3D Offset */}
      <div style={{ transform: "translateZ(40px)" }} className="relative z-20 h-full">
        {children}
      </div>

      {/* Animated Corner Brackets */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-cyan-neon opacity-0 group-hover:opacity-100 transition-all duration-300" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-pink-neon opacity-0 group-hover:opacity-100 transition-all duration-300" />
    </motion.div>
  );
};

export default FloatingCard;
