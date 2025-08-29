"use client";

export default function Paginator({ children, page, pageSetter, perPage, perPageSetter }) {
    const setPerPage = num => redirect(`?page=${page}&perPage=${num}`);

    return (
        <div className={"w-full flex flex-col gap-[10px]"}>
            <div className={"w-full py-[5px] [border-bottom:_1px_solid_black] text-sm"} >
                <label className={"flex flex-row gap-[5px] items-center"}>
                    <span>Entries per page:</span>
                    <select value={perPage} onChange={e => setPerPage(e.target.value)} className={"p-[2px] [border:_1px_solid_black] outline-none"}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                    </select>
                </label>
            </div>
            {
                children
            }
            <div className={"w-full [border-top:_1px_solid_black]"}>

            </div>
        </div>
    )
}