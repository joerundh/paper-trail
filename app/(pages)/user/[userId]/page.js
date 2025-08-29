import { clerkClient } from "@clerk/clerk-sdk-node";

export default async function Page({ params }) {
    const userId = params.userId;

    try {
        const user = await clerkClient.users.getUser(userId);
    }
    catch (e) {
        return (
            <>
                <h3>User not found</h3>
                <p>An invalid user ID was provided.</p>
            </>
        )
    }

    return (
        <>
            <h3>{user.firstName}'s entries</h3>
        </>
    )
}