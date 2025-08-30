import Image from "next/image";
import { useState } from "react"

import articleIcon from "@/public/article-icon.png";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function EntryListItem({ entry, viewUser, reloader }) {
    const { user, isLoading, error } = useUser();

    const router = useRouter();

    const [ viewAbstract, setViewAbstract ] = useState(false);

    const [ editing, setEditing ] = useState(false);

    const [ title, setTitle ] = useState(entry.title);
    const [ abstract, setAbstract ] = useState(entry.abstract);
    const [ url, setUrl ] = useState(entry.url);
    const [ makePublic, setMakePublic ] = useState(entry.isPublic);

    const editEntry = async () => {
        
    }

    const deleteEntry = async () => {
        if (confirm("Are you sure you want to delete the entry?")) {
            const params = new URLSearchParams();
            params.append("clientId", user.id);
            params.append("entryId", entry._id);

            const res = await fetch(`/api/delete?${params.toString()}`, {
                cache: "no-cache",
                method: "DELETE"
            });
            if (!res.ok) {
                alert("An error occurred, try again later.");
                return;
            }
            reloader();
            alert("Entry successfully deleted.")
        }
    }

    const cutoffAbstractCss = {
        height: 50,
        overflow: "hidden",
        maskImage: "linear-gradient(to top, transparent 0%, white 100%)",
        maskPosition: "top center",
        maskRepeat: "no-repeat"

    };
    const fullAbstractCss = {
        height: "fit-content",
        mask: "none"
    }

    return (
        <li className={"w-full [border:_1px_solid_#b0b0b0] rounded-sm p-[10px] flex flex-col gap-[10px]"}>
            <div className={"w-full flex flex-row gap-[10px]"}>
                <Image src={articleIcon} width={80} height={97} alt={"Article icon"} className={"mx-[20px]"} />
                <div className={"w-full flex flex-col gap-[10px]"}>
                    <h4 className={"w-full text-lg font-bold"}>{entry.title}</h4>
                    {
                        viewUser ?
                            <p className={"text-sm"}>added by <Link href={`/user/${entry.userId}`} className={"font-bold hover:underline"}>{user ? user.id.split("_")[1] === entry.userId ? "you" : entry.userFirstName : entry.userFirstName}</Link></p>
                        : <></>
                    }
                    {
                        user && user.id.split("_")[1] === entry.userId ? (
                            <div className={"flex flex-row gap-[10px]"}>
                                <button className={"p-[3px] [border:_1px_solid_#b0b0b0] [background-color:_#d0d0d0] w-[100px] flex flex-row gap-[5px] justify-center items-center cursor-pointer"} onClick={() => router.push(`/edit/${entry._id}`)}><Image src={"/pencil-icon.png"} alt={"Edit icon"} width={15} height={15} /> Edit</button>
                                <button className={"p-[3px] [border:_1px_solid_#b0b0b0] [background-color:_#d0d0d0] w-[100px] flex flex-row gap-[5px] justify-center items-center cursor-pointer"} onClick={deleteEntry}><Image src={"/recycle-bin-icon.png"} alt={"Delete icon"} width={15} height={15} /> Delete</button>
                            </div>
                        ) : <></>
                    }
                </div>
            </div>
            <div className={"flex flex-col gap-[10px]"}>
                <p><b>Link:</b> <Link href={entry.url} className={"hover:underline"} target={"_blank"}>{entry.url}</Link></p>
                <div>
                    <h5 className={"font-bold"}>Abstract:</h5>
                    <div className={"flex flex-col items-center cursor-pointer"}>
                        <p className={"w-full"} style={viewAbstract ? fullAbstractCss : cutoffAbstractCss} onClick={() => setViewAbstract(!viewAbstract)} title={viewAbstract ? "Hide abstract" : "Show abstract"}>{entry.abstract}</p>
                        <Image src={viewAbstract ? "/angle-top-icon.png" : "/angle-bottom-icon.png"} width={20} height={13} alt={viewAbstract ? "Up arrow icon" : "Down arrow icon"} />
                    </div>
                </div>
            </div>
        </li>
    )
}