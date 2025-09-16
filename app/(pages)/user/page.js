import EntryList from "@/app/ui/EntryList";
import { auth } from "@clerk/nextjs/server";

export default async function Page() {
    const { userId } = await auth();

    if (!userId) {
        return (
            <>
                <h3>You are not logged in</h3>
                <p>Sign in to view your entries, or sign up and start adding them.</p>
            </>
        )
    }

    return (
        <>
            <h3>Your entries</h3>
            <EntryList userId={userId.split("_")[1]} viewUsers={false} />
        </>
    )
}