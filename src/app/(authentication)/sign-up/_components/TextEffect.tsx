import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const splitText = (text: string) => text.split("");

const characterVariants = {
  hidden: { opacity: 0, y: -20, filter: "blur(3px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.03,
      type: "spring",
      damping: 12,
      stiffness: 100,
      filter: { delay: i * 0.03, duration: 0.3, ease: "easeOut" }
    },
  }),
};

const TextEffect = ({ text }: { text: string }) => {
  const characters = splitText(text);

  return (
    <div>
      <span className="sr-only">
        {text}
      </span>
      {characters.map((char: string, index: number) => {
        return (
          <motion.span
            aria-hidden
            key={`${char}-${index}`}
            initial="hidden"
            animate="visible"
            custom={index}
            variants={characterVariants}
            style={{
              display: "inline-block",
              whiteSpace: "pre", // Ensure spaces are rendered
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </div>
  );
};

export default TextEffect;
