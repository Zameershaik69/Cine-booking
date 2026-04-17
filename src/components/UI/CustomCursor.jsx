import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleHoverStart = (e) => {
            const target = e.target;
            if (
                target.tagName === 'BUTTON' || 
                target.tagName === 'A' || 
                target.closest('.group') ||
                target.getAttribute('role') === 'button'
            ) {
                setIsHovering(true);
            }
        };

        const handleHoverEnd = () => setIsHovering(false);

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleHoverStart);
        window.addEventListener("mouseout", handleHoverEnd);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleHoverStart);
            window.removeEventListener("mouseout", handleHoverEnd);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            {/* Outer Ring */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-cyan-neon pointer-events-none z-[10000]"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    left: -16,
                    top: -16,
                    scale: isHovering ? 2.5 : 1,
                    opacity: isHovering ? 0.5 : 1,
                    boxShadow: isHovering ? "0 0 20px #00f3ff" : "none"
                }}
            />
            {/* Inner Dot */}
            <motion.div
                className="fixed top-0 left-0 w-1.5 h-1.5 bg-pink-neon rounded-full pointer-events-none z-[10001]"
                style={{
                    translateX: cursorX,
                    translateY: cursorY,
                    left: -3,
                    top: -3,
                    scale: isHovering ? 0 : 1
                }}
            />
            {/* High-Tech Reticle */}
            {isHovering && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed top-0 left-0 pointer-events-none z-[9999]"
                    style={{
                        translateX: cursorXSpring,
                        translateY: cursorYSpring,
                        left: -40,
                        top: -40,
                    }}
                >
                    <div className="w-20 h-20 border-t border-l border-cyan-neon/30 opacity-50" />
                    <div className="absolute top-0 right-0 w-4 h-[1px] bg-cyan-neon" />
                    <div className="absolute top-0 left-0 w-[1px] h-4 bg-cyan-neon" />
                </motion.div>
            )}
        </>
    );
};

export default CustomCursor;
