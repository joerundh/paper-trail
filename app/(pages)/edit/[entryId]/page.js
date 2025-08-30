import EntryForm from "@/app/ui/EntryForm";
import { auth } from "@clerk/nextjs/server";

export default async function Page({ params }) {
    const { userId } = await auth();
    if (!userId) {
        return (
            <>
                <h3>You are not logged in</h3>
                <p>Log in or sign up to add entries.</p>
            </>
        )
    }

    const { entryId } = await params;

    const res = await fetch(`/api/entries?entryId=${entryId}`);
    if (!res.ok) {
        return (
            <>
                <h3 className={"font-bold"}>Could not open editor</h3>
                <p>Entry not found.</p>
            </>
        )
    }
    const entry = await res.json();

    return (
        <>
            <h3 className={"font-bold"}>Edit entry</h3>
            <EntryForm entry={entry} />
        </>
    )
}