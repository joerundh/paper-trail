import EntryList from "@/app/ui/EntryList";
import { auth } from "@clerk/nextjs/server"
import Link from "next/link";

export default async function Page({ params }) {
    return (
        <>
            <div className={"w-full flex flex-col gap-[10px]"}>
                <h3>Latest entries</h3>
                <EntryList />
            </div>
        </>
    )
}