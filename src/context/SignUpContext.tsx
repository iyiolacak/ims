"use client";
import { useSignUp } from '@clerk/clerk-react';
import { SetActive, SignUpResource } from '@clerk/types';
import React, { createContext, useContext } from 'react';

type SignUpContextValue = {
    isLoaded: boolean;
    signUp: SignUpResource | undefined;
    setActive: SetActive | undefined;
}

const SignUpContext = createContext<SignUpContextValue | undefined>(undefined);

const SignUpProvider = ({ children }: { children: React.ReactNode }) => {
    const { isLoaded, signUp, setActive } = useSignUp();
    return (
        <SignUpContext.Provider value={{ isLoaded, signUp, setActive }}>
            {children}
        </SignUpContext.Provider>
    )
}

const useSignUpContext = () => {
    const context = useContext(SignUpContext);
    if(!context) {
     throw new Error("useSignUpContext must be used within SignUpProvider");
    }
    return context;
};

export { useSignUpContext, SignUpProvider };