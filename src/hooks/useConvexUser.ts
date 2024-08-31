type UserResource = {
    id: string;
    externalId: string | null;
}

type UseConvexUserReturn = {
    isLoaded: false;
    isSignedIn: undefined;
    user: undefined;
} | {
    isLoaded: true;
    isSignedIn: false;
    user: null;
} | {
    isLoaded: true;
    isSignedIn: true;
    user: UserResource;
};
