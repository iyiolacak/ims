import { getClerkError } from "@/app/(authentication)/clerkErrorHandler";
import { useAuthStatus } from "./useAuthStatus";
import { useSignUp } from "@clerk/clerk-react"; 
import { OAuthStrategy } from "@clerk/types";

export const useOAuthHandler = () => {
  const handleOAuthClick = async (strategy: OAuthStrategy) => {
    const {
      authState,
      startSubmission,
      markSuccess,
      handleOAuthServerError,
      resetAuth,
    } = useAuthStatus();
    const { signUp } = useSignUp();
    if (!signUp) return; // ensure this check is intentional

    try {
      startSubmission();
      await signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: "/sign-up/sso-callback",
        redirectUrlComplete: "/onboarding",
      });
      markSuccess();
    } catch (err) {
      const clerkErrors = getClerkError(err);
      if (clerkErrors) {
        handleOAuthServerError(clerkErrors);
      }
    } finally {
      resetAuth();
    }
  };

  return handleOAuthClick;
};

export default useOAuthHandler;
