import { ClerkAPIError } from '@clerk/types';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';

export function handleClerkError(err: unknown): ClerkAPIError[] | null {
    if(isClerkAPIResponseError(err)) {
        console.error("Clerk API Error: ", JSON.stringify(err.errors, null, 2))
        return err.errors;
    } else {
        console.error("Unknown error: ", err);
        return null;
    }
}
