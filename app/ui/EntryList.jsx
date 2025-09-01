"use client";

import { useEffect, useRef, useState } from "react";
import Paginator from "./Paginator";
import { useUser } from "@clerk/nextjs";
import usePaperTrail from "../lib/usePaperTrail";
import EntryListItem from "./EntryListItem";

export default function EntryList({ userId, viewUsers }) {
    /*
    A lack of a provided userId is interpreted as from all users, i.e. /latest
    */
    const { user, isLoaded: userLoaded, error: userError } = useUser();

    const [ page, setPage ] = useState(0);
    const [ perPage, setPerPage ] = useState(5);
    const count = useRef(0);

    const [ data, isLoading, error, reload ] = usePaperTrail({
        url: `/api/entries/${userId ? "user" : "latest"}`,
        userId: userId || undefined,
        page: page,
        perPage: perPage
    });

    useEffect(() => {
        reload();
    }, [ page, perPage ])

    if (error) {
        return (
            <p className={"w-full text-center"}>An error occurred, try again later.</p>
        )
    }

    if (!isLoading) {
        count.current = data.count || 0;
    }

    return (
        <Paginator count={count} page={page} pageSetter={setPage} perPage={perPage} perPageSetter={setPerPage}>
            {
                isLoading ? (
                    <p className={"w-full text-center text-sm"}>Loading entries...</p>
                ) :
                    count.current ? (
                        <ul className={"w-full flex flex-col gap-[10px] p-0"}>
                            {
                                data.entries.map((entry, index) => (
                                    <EntryListItem entry={entry} reloader={reload} key={index} viewUser={viewUsers} />
                                ))
                            }
                        </ul>
                    ) :
                        <p className={"w-full text-center text-sm"}>No entries found.</p>
            }
        </Paginator>
    );
}