import { currentUser } from "@clerk/nextjs/dist/types/server";

export default async function Page() {
    const user = await currentUser();
}