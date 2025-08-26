import { currentUser } from "@clerk/nextjs/dist/types/server"

export default async function Page() {
    const user = await currentUser();
    if (!user) {
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
        </>
    )
}