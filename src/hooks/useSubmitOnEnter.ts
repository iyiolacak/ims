import { useEffect } from 'react';

const useSubmitOnEnter = (callback: () => void) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                callback();
                
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [callback])
}

export default useSubmitOnEnter;