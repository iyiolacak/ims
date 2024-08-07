import { useEffect } from 'react';


// Prevent trigger if an input is focused.
const useShortcut = (key: string, callback: () => void) => {
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
            callback();
        }
        };

        window.addEventListener("keydown", handleKeyPress);

    return () => {
        window.removeEventListener("keydown", handleKeyPress)
    }
    }, [key, callback])
};

export default useShortcut