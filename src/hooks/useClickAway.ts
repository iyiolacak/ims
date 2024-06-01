import React, { useEffect } from "react";

const useClickAway = (ref: React.RefObject<HTMLElement>, handler: (event: MouseEvent | TouchEvent) => void) => {
    useEffect(() => {

        const listener = (event: MouseEvent | TouchEvent) => {
            // Do nothing if clicking ref's element or descendent elements
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            handler(event);
        };
        
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
        // if (event.key === "Escape") {
        //   event.preventDefault();
    
        
        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        }
    }), [ref, handler]
    }

    export default useClickAway