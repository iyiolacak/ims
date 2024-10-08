"use client";
import React, { useEffect } from "react";
import SignUpStageForm from "./_components/SignUpStageForm";
import { useAuthContext } from "@/context/AuthContext";
import VerifyEmail from "./verify-email/_components/OTP";
import { motion, AnimatePresence } from "framer-motion";
import { AuthStage, useAuthStatus } from "@/hooks/useAuthStatus";
import { SignUpButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/clerk-react";


const transitionVariants = {
  initial: { opacity: 1, x: 150 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -150 },
};

const SignUpPage = () => {

  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  useEffect(() => {
    router.push("/dashboard");
  }, [isLoaded, isSignedIn, router]);

  
  const { authStage } = useAuthContext();
  const transitionCubicBezier = [0.05, 0.66, 0.32, 0.92];
  return (
    <div className="h-full">
      <AnimatePresence mode="wait">
        {authStage === AuthStage.Form && (
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
        {authStage === AuthStage.Verifying && (
          <motion.div
            key="verifying"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={transitionVariants}
            transition={{ duration: 0.2, ease: [transitionCubicBezier] }}
            className="h-full"
          >
            <VerifyEmail />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SignUpPage;
