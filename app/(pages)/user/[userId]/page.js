import EntryList from "@/app/ui/EntryList";
import { clerkClient } from "@clerk/clerk-sdk-node";

export default async function Page({ params }) {
    const userId = await params.userId;

    try {
        const user = await clerkClient.users.getUser(`user_${userId}`);
    }
    catch (e) {
        return (
            <>
                <h3 className={"font-bold"}>User not found</h3>
                <p>An invalid user ID was provided.</p>
            </>
        )
    }

    return (
        <>
            <h3 className={"font-bold"}>{user.firstName}'s entries</h3>
            <EntryList userId={userId} viewUsers={false} />
        </>
    )
}