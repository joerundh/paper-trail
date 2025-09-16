import EntryList from "@/app/ui/EntryList";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { currentUser } from "@clerk/nextjs/server";

export default async function Page({ params }) {
    const { userId } = await params;

    const client = await currentUser();

    const user = {};
    try {
        const clerkUser = await clerkClient.users.getUser(`user_${userId}`);
        user.firstName = clerkUser.firstName;
    }
    catch (e) {
        return (
            <>
                <h3 className={"font-bold"}>User not found</h3>
                <p>An invalid user reference was provided.</p>
            </>
        )
    }

    return (
        <>
            <h3 className={"font-bold"}>{userId === client?.id.split("_")[1] ? "Your" : `${user.firstName}'s`} entries</h3>
            <EntryList userId={userId} viewUsers={false} />
        </>
    )
}