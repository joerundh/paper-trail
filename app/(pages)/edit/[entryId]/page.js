import EntryEditor from "@/app/ui/EntryEditor";
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

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/entries/${entryId}`);
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
            <EntryEditor entry={entry.entry} />
        </>
    )
}