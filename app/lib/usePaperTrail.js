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

    const fetchData = async () => {
        const params = new URLSearchParams();
        if (obj.userId) {
            params.append("userId", obj.userId);
        }
        if (obj.page) {
            params.append("offset", obj.page*obj.perPage);
        }
        if (obj.perPage) {
            params.append("limit", obj.perPage);
        }

        const res = await fetch(`${obj.url}${params.size ? "?" : ""}${params.toString()}`);

        if (!res.ok) {
        setError({ message: "An error occurred." });
        }

        const json = await res.json();
        setData(json);
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (!data) {
            fetchData();
        }
    }, [ data ])

    const reload = () => {
        setError(null)
        setData(null);
    }

    return [ data, isLoading, error, reload ];
}