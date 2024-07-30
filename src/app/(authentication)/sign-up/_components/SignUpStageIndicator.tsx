"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useSignUpFormContext } from "@/context/SignUpFormContext";
import { usePathname } from 'next/navigation'

const SignUpStageIndicator = ({ outOf }: { outOf: number }) => {
  const { setStage, stage } = useSignUpFormContext();
  const pathname = usePathname();
  switch(pathname) {
    case("/sign-up"):
    setStage(1);
    break;
    case("/sign-up/verify-email"):
    setStage(2);
    break;
  }
  // Memoize the filled stages
  const filledStages = useMemo(() => {
    return Array.from({ length: stage }, (_, index) => (
      <div
        key={index}
        className="flex h-2 flex-grow rounded-full bg-gray-200"
      >
        <motion.div
          className="h-full w-[100%] rounded-full bg-primary"
          initial={{ scaleX: 0 }}
          transition={{
            duration: 0.2,
            type: "spring",
            ease: [0, 0.23, 0.43, 0.99],
          }}
          animate={{ scaleX: 1 }}
        />
      </div>
    ));
  }, [stage]);

  // Memoize the entire indicator list
  const indicators = useMemo(() => {
    return (
      <div className="flex w-full flex-row space-x-2 mb-4">
        {filledStages}
        {Array.from({ length: outOf - stage }, (_, index) => (
          <div
            key={index}
            className="flex flex-grow rounded-full bg-gray-200 py-1"
          />
        ))}
      </div>
    );
  }, [filledStages, outOf, stage]);

  return indicators;
};

export default SignUpStageIndicator;
