"use client";
import Logo from "@/app/(dashboard)/dashboard/components/Logo";
import React from "react";
import { useState, useEffect } from "react";
import TextEffect from "./TextEffect";
import { AnimatePresence } from "framer-motion";

const adjectives = [
  "Hassle-free inventory management.",
];

const SignUpPageOtherHalf = () => {
  const [currentAdjective, setCurrentAdjective] = useState(adjectives[0]);

  useEffect(() => {
    const changeAdjective = () => {
      setCurrentAdjective((prevAdjective) => {
        const currentIndex = adjectives.indexOf(prevAdjective);
        let nextIndex = currentIndex + 1;
        if (nextIndex >= adjectives.length) {
          nextIndex = adjectives.length - 1;
        }
        return adjectives[nextIndex];
      });
    };
    const interval = setInterval(changeAdjective, 2000); // Change every 2 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);
  return (
    <div className="flex min-h-full min-w-full items-center justify-start bg-primary">
      <h2 className="flex h-full justify-center items-center space-x-4 px-3 text-start text-6xl text-white">
        <Logo size={64} />
        <TextEffect
          seqIndex={adjectives.indexOf(currentAdjective)}
          text={currentAdjective}
        />
      </h2>
    </div>
  );
};

export default SignUpPageOtherHalf;
