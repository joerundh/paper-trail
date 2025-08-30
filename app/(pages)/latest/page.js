import EntryList from "@/app/ui/EntryList";

export default async function Page() {
    return (
        <>
            <div className={"w-full flex flex-col gap-[10px]"}>
                <h3>Latest entries</h3>
                <EntryList viewUsers={true} />
            </div>
        </>
    )
}