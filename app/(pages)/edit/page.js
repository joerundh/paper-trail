import { auth } from "@clerk/nextjs/server";

export default async function Page() {
    const { userId } = await auth();
    if (!userId) {
        return (
            <>
                <h3>You are not logged in</h3>
                <p>Log in or sign up to add entries.</p>
            </>
        )
    }

    return (
        <>
            <h3>No entry selected</h3>
            <p>Cannot open editor.</p>
        </>
    )
}