import { SignUpResource } from '@clerk/types';
import react, { useState, useEffect } from 'react'

const useSignUpStage = (signUp: SignUpResource) => {
    useEffect(() => {
    
    }, [signUp.status])
}




export default useSignUpStage;