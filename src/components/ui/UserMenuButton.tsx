import React from 'react';
import { UserButton, useAuth, useClerk, useUser } from '@clerk/clerk-react';
import { Skeleton } from './skeleton';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Button } from './button';
import Image from 'next/image';

const UserMenuButton = () => {
    const { openUserProfile } = useClerk();

    const { user, isSignedIn, isLoaded } = useUser();
    const { signOut } = useAuth();

    // Show a skeleton if user data isn't loaded yet
    if (!isLoaded) {
        return <Skeleton className='bg-red-900 rounded-full size-10'/>
    }

    // If the user is not signed in, perhaps redirect or show nothing
    if (!isSignedIn) {
        return null; // or redirect, or a sign-in prompt
    }

    // Handle sign out
    const handleSignOut = async () => {
        await signOut();
    };

    // Function to generate avatar initials
    const getAvatarFallback = () => {
        if (user && user.firstName) {
            return user.firstName.substring(0, 2).toUpperCase();
        }
        return '??'; // Fallback initials
    };
    const handleProfileClick = () => {
        openUserProfile(); // This opens the Clerk user profile modal
    };

    return (
        <div>
           <UserButton
           /> 
        <button 
        onClick={handleProfileClick}
        className='p-2 hover:bg-gray-100 rounded-xl'>
            <Avatar className='rounded-xl'>
                {user.imageUrl ? (
                    <AvatarImage src={user.imageUrl} alt="User's profile image" />
                ) : (
                    <AvatarFallback>{getAvatarFallback()}</AvatarFallback>
                )}
            </Avatar>
        </button>
                </div>
    );
}

export default UserMenuButton;
