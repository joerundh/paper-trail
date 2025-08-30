"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EntryForm({ entry }) {
    const { user, isLoaded: userLoaded, error: userError } = useUser();

    const router = useRouter();

    const [ submitted, setSubmitted ] = useState(false);
    const [ edited, setEdited ] = useState(false);

    const [ title, setTitle ] = useState(entry ? entry.title : "");
    const [ abstract, setAbstract ] = useState(entry ? entry.abstract : "");
    const [ url, setUrl ] = useState(entry ? entry.url : "");
    const [ makePublic, setMakePublic ] = useState(entry ? entry.isPublic : true);

    const [ titleMissing, setTitleMissing ] = useState(false);
    const [ abstractMissing, setAbstractMissing ] = useState(false);
    const [ urlMissing, setUrlMissing ] = useState(false);

    const [ error, setError ] = useState(false);

    const errorMessage = () => {
        if (titleMissing) {
            return (
                <p className={"w-full text-sm"}>A title is missing!</p>
            )
        }
        if (abstractMissing) {
            return (
                <p className={"w-full text-sm"}>An abstract is missing!</p>
            )
        }
        if (urlMissing) {
            return (
                <p className={"w-full text-sm"}>A URL is missing!</p>
            )
        }
        if (error) {
            return (
                <p className={"w-full text-sm"}>An error occurred, try again later.</p>
            )
        }
        return <></>
    }

    const submitForm = async e => {
        e.preventDefault();
        
        if (title === "") {
            setTitleMissing(true);
            return;
        }
        if (abstract === "") {
            setAbstractMissing(true);
            return;
        }
        if (url === "") {
            setUrlMissing(true);
            return;
        }

        const res = await fetch("/api/add", {
            method: "POST",
            body: JSON.stringify({
                userId: user.id,
                userFirstName: user.firstName,
                title: title,
                abstract: abstract,
                url: url,
                makePublic: makePublic
            })
        });
        if (!res.ok) {
            setError(true);
            return;
        }
        setSubmitted(true);
    }

    const clearForm = () => {
        setTitle("");
        setAbstract("");
        setUrl("");
        setMakePublic(true);
    }

    const saveEdit = async e => {
        e.preventDefault();
        
        if (title === "") {
            setTitleMissing(true);
            return;
        }
        if (abstract === "") {
            setAbstractMissing(true);
            return;
        }
        if (url === "") {
            setUrlMissing(true);
            return;
        }

        const res = await fetch("/api/edit", {
            method: "PUT",
            body: JSON.stringify({
                entryId: entry._id,
                clientId: user.id,
                userFirstName: user.firstName,
                title: title,
                abstract: abstract,
                url: url,
                makePublic: makePublic
            })
        });
        if (!res.ok) {
            setError(true);
            return;
        }
        setSubmitted(true);
    }

    const cancelEdit = async () => {
        if (confirm("Are you sure you want to cancel?")) {
            router.back();
        }
    }

    useEffect(() => {
        clearForm();
    }, [ submitted ]);

    useEffect(() => {
        setTitleMissing(false);
    }, [ title ]);

    useEffect(() => {
        setAbstractMissing(false);
    }, [ abstract ]);

    useEffect(() => {
        setUrlMissing(false)
    }, [ url ]);

    if (!userLoaded) {
        return (
            <p className={"w-full center"}>Loading...</p>
        )
    }

    if (submitted) {
        return (
            <>
                <p>You entry has been submitted. Click <span className={"font-bold cursor-pointer underline"} onClick={e => setSubmitted(false)}>here</span> to submit another one.</p>
            </>
        )
    }

    if (edited) {
        return (
            <>
                <p>You entry has been edited.</p>
            </>
        )
    }

    return (
        <>
            <form onSubmit={e => submitForm(e)} className={"w-full flex flex-col gap-[10px] justify-start items-start"}>
                {
                    error ?
                        errorMessage()
                    :
                        <p>All fields are required.</p>
                }
                <label className={"flex flex-row justify-start items-center gap-[5px]"}>
                    <span className={"w-[90px]"}>Title:</span>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} className={`w-[480px] px-[3px] [border:_1px_solid_black] rounded-sm ${titleMissing ? "bg-[#ffe0e0]" : ""}`} />
                </label>
                <label className={"flex flex-row justify-start items-start gap-[5px]"}>
                    <span className={"w-[90px]"}>Abstract:</span>
                    <textarea value={abstract} onChange={e => setAbstract(e.target.value)} className={`w-[480px] h-[200px] px-[3px] [border:_1px_solid_black] resize-y rounded-sm outline-none ${abstractMissing ? "bg-[#ffe0e0]" : ""}`}></textarea>
                </label>
                <label className={"flex flex-row justify-start items-start gap-[5px]"}>
                    <span className={"w-[90px]"}>URL:</span>
                    <input type="text" value={url} onChange={e => setUrl(e.target.value)} className={`w-[480px] [border:_1px_solid_black] px-[3px] rounded-sm  ${urlMissing ? "bg-[#ffe0e0]" : ""}`} />
                </label>
                <label className={"flex flex-row gap-[5px] justify-start items-center"}>
                    <span>Show in public list:</span>
                    <input type="checkbox" checked={makePublic} onChange={e => setMakePublic(e.target.checked)} />
                </label>
                <div className={"w-full flex flex-row gap-[10px] justify-center"}>
                    {
                        entry ?
                            <>
                                <button onClick={saveEdit} className={"w-[150px] p-[5px] [border:_1px_solid_#b0b0b0] [background-color:_#d0d0d0] rounded-md"}>Save</button>
                                <button onClick={cancelEdit} className={"w-[150px] p-[5px] [border:_1px_solid_#b0b0b0] [background-color:_#d0d0d0] rounded-md"}>Cancel</button>
                            </>
                        :
                            <>
                                <button onClick={submitForm} className={"w-[150px] p-[5px] [border:_1px_solid_#b0b0b0] [background-color:_#d0d0d0] rounded-md"}>Submit</button>
                                <button onClick={clearForm} className={"w-[150px] p-[5px] [border:_1px_solid_#b0b0b0] [background-color:_#d0d0d0] rounded-md"}>Clear</button>
                            </>
                    }
                </div>
            </form>
        </>
    )
}