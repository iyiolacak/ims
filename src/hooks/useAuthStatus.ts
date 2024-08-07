import { useState } from "react";
import { ClerkAPIError } from "@clerk/types";

export enum AuthState {
  Idle = "Idle",
  Submitting = "Submitting",
  Success = "Success",
  Error = "Error",
}

export enum AuthStage {
  Form = "Form",
  Verifying = "Verifying",
  Completed = "Completed",
}

type UseAuthStatusReturn = {
  authState: AuthState;
  authServerError: ClerkAPIError[] | undefined;
  authStage: AuthStage;
  startSubmission: () => void;
  markSuccess: () => void;
  handleError: (errors: ClerkAPIError[]) => void;
  setStage: (stage: AuthStage) => void;
  resetSubmittingState: () => void;
  shake: boolean;
};

/**
 * useAuthStatus - A hook to manage authentication states, stages, and errors.
 * 
 * @returns {UseAuthStatusReturn} - The current authentication state, error information, and handlers.
 */
export const useAuthStatus = (): UseAuthStatusReturn => {
  const [authState, setAuthState] = useState<AuthState>(AuthState.Idle);
  const [authServerError, setAuthServerError] = useState<ClerkAPIError[] | undefined>(undefined);
  const [authStage, setAuthStage] = useState<AuthStage>(AuthStage.Form);
  
  const [shake, setShake] = useState<boolean>(false)

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  }

  const startSubmission = () => {
    setAuthState(AuthState.Submitting);
    setAuthServerError(undefined)
  };
  const markSuccess = () => {
    setAuthState(AuthState.Success);
    setAuthServerError(undefined);
  };
  const handleServerError = (errors: ClerkAPIError[]) => {
    setAuthState(AuthState.Error);
    setAuthServerError(errors);
    triggerShake();
  };
  const setStage = (stage: AuthStage) => {
    setAuthStage(stage);
  };
  const resetSubmittingState = () => {
    setAuthState(AuthState.Idle);
  };

  return {
    authState,
    authServerError,
    startSubmission,
    markSuccess,
    handleError: handleServerError,
    setStage,
    authStage,
    resetSubmittingState,
    shake,
  };
};
