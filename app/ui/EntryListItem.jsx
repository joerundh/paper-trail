import Image from "next/image";
import { useState } from "react"

import articleIcon from "@/public/article-icon.png";
import { useUser } from "@clerk/nextjs";

export default async function EntryListItem({ entry }) {
    const { user, isLoading, error } = useUser();

    const [ editing, setEditing ] = useState(false);

    return (
        <li className={"w-full [border:_1px_solid_#b0b0b0] rounded-sm p-[10px] flex flex-row gap-[10px] align-top"}>
            <div className={"w-fit h-fit"}>
                <Image src={articleIcon} width={50} height={50} />
            </div>
            <div className={"flex flex-col gap-[10px]"}>
                <h4 className={"size-[14px]"}>{entry.title}</h4>
                <p>added by <b>{ entry.userId === user.id ? "you" : entry.userFullName }</b></p>
                <p>{entry.description}</p>
            </div>
        </li>
    )
}