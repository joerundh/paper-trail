/*
Custom hook to fetch entries from the database via the API routes.
This function is simply to contain the relevant parts, and not have
all of the code beneath smeared out inside other functions, i.e. 
components et.al..

Is that what's called compartentalization? Huge word meaning
"keep it separate". But it works, and it cleans up. And 
cleaning up is important.

This code was written as the suggestion of LG.
*/

import { useEffect, useState } from "react";

export default function usePaperTrail(obj) {
    const [ data, setData ] = useState(null);
    const [ error, setError ] = useState(null);

    const isLoading = !(data || error);

    useEffect(() => {
        (async () => {
            const params = new URLSearchParams();
            if (obj.userId) {
                params.append("userId", obj.userId);
            }
            params.append("page", obj.page || 0);
            params.append("perPage", obj.perPage || 5);

            const res = await fetch(`${obj.url}?${params.toString()}`);            
            if (!res.ok) {
                setError({ message: "An error occurred." })
            }
            const json = await res.json();
            setData(json);
        })();
    }, []);

    return [ data, isLoading, error ];
}