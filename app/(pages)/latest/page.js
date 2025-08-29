import EntryList from "@/app/ui/EntryList";
import { auth } from "@clerk/nextjs/server"
import Link from "next/link";

export default async function Page({ params }) {
    const { userId } = await auth();

    const page = params.page || 0;
    const perPage = params.perPage || 5;

    const offset = page*perPage;

    const entries = async () => {
        const res = await fetch(`/api/entries/latest?offset=${offset}&limit=${perPage}`, {
            method: "GET"
        });
        if (!res.ok) {
            return [];
        }
        return res.json();
    }

    return (
        <>
            <div className={"w-full relative flex flex-col gap-[10px]"}>
                <h3>Latest entries</h3>
                <EntryList />
            </div>
        </>
    )
}