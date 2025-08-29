"use client";

import { Fragment, useEffect, useState } from "react";
import Paginator from "./Paginator";
import { useUser } from "@clerk/nextjs";
import usePaperTrail from "../lib/usePaperTrail";
import EntryListItem from "./EntryListItem";

export default function EntryList({ userId }) {
    /*
    A lack of a provided userId is interpreted as from all users, i.e. /latest
    */
    const { user, isLoaded: userLoaded, error: userError } = useUser();

    const [ page, setPage ] = useState(0);
    const [ perPage, setPerPage ] = useState(5);

    const [ data, isLoading, error ] = usePaperTrail({
        url: `/api/entries/${userId ? "user" : "latest"}`,
        userId: userId || undefined,
        page: page,
        perPage: perPage
    });

    if (error) {
        return (
            <p className={"w-full text-center"}>An error occurred, try again later.</p>
        )
    }

    return (
        <Paginator page={page} pageSetter={setPage} perPage={perPage} perPageSetter={setPerPage}>
            {
                isLoading ? (
                    <p className={"w-full text-center text-sm"}>Loading entries...</p>
                ) :
                    data.entries.length ? (
                        <ul className={"w-full flex flex-col gap-[10px] p-0"}>
                            {
                                data.entries.map((entry, index) => (
                                    <EntryListItem entry={entry} key={index} />
                                ))
                            }
                        </ul>
                    ) :
                        <p className={"w-full text-center text-sm"}>No entries found.</p>
            }
        </Paginator>
    )
}