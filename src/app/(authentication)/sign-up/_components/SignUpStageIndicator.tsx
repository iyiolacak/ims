"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useLayoutEffect, useState } from "react";

const SignUpStageIndicator = ({
  stage,
  outOf,
}: {
  stage: number;
  outOf: number;
}) => {
  return (
    <div className="flex w-full flex-row space-x-2">
      {Array.from({ length: stage }, (_, index) => (
        <div
          key={index}
          className="flex h-2 flex-grow rounded-full bg-gray-200"
        >
          <motion.div
            className={" h-full w-[100%] rounded-full bg-primary"}
            initial={{
              scaleX: 0,
            }}
            transition={{
              delay: index * 0.2,
              duration: 0.2,
              ease: [0, 0.23, 0.43, 0.99],  // Custom cubic-bezier easing function
            }}
            animate={{
              scaleX: 1,
            }}
          />
        </div>
      ))}
      {Array.from({ length: outOf - stage }, (_, index) => (
        <div
          key={index}
          className="flex flex-grow rounded-full bg-gray-200 py-1"
        />
      ))}
    </div>
  );
};

export default SignUpStageIndicator;
