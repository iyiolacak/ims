"use client";
import React from "react";
import SignUpStageForm from "./_components/SignUpStageForm";
import { SignUpStage, useSignUpContext } from "@/context/SignUpContext";
import VerifyEmail from "./verify-email/_components/OTP";
import { motion, AnimatePresence } from 'framer-motion';

const transitionVariants = {
  initial: { opacity: 1, x: 150 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -150 },
};

const SignUpPage = () => {
  const { signUpStage } = useSignUpContext();
  const transitionCubicBezier = [0.05, 0.66 ,0.32 ,0.92]
  return(
    <div className="flex w-full h-full">

    <AnimatePresence mode="wait">
      {signUpStage === SignUpStage.Form && (
        <motion.div
        key="form"
        animate="animate"
        exit="exit"
        variants={transitionVariants}
        transition={{ duration: 0.2, ease: [transitionCubicBezier] }}
        >
        <SignUpStageForm />
        </motion.div>
      )}
      {signUpStage === SignUpStage.Verifying && (
        <motion.div
        key="verifying"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={transitionVariants}
        transition={{ duration: 0.2, ease: [transitionCubicBezier] }}>
          <VerifyEmail />
        </motion.div>
      )}
    </AnimatePresence>
      </div>
  )
};

export default SignUpPage;
