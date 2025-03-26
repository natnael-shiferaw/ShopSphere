import { useEffect, useState } from "react";

/**
 *  a hook to detect window width and return a number
 *  that indicates how many products to show
*/

export default function useProductLimit(): number {
    const [limit, setLimit] = useState<number>(4);

    useEffect(() => {
        const updateLimit = () => {
            const width = window.innerWidth;
        if(width < 648) { // extra small devices
            setLimit(2)
        } else if (width < 768) { // small devices
            setLimit(3)
        } else { // medium devices
            setLimit(4);
        }
        }

        updateLimit();
        window.addEventListener("resize", updateLimit)
        return () => window.removeEventListener("resize", updateLimit)
    } , 
    [])

    return limit;
}
