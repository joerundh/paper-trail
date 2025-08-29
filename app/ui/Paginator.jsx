"use client";

export default function Paginator({ children, count, page, pageSetter, perPage, perPageSetter }) {
    const pageCount = Math.ceil(count.current/perPage);

    return (
        <div className={"w-full flex flex-col gap-[10px]"}>
            <div className={"w-full py-[5px] [border-bottom:_1px_solid_black] text-sm flex flex-row justify-between"} >
                <label className={"flex flex-row gap-[5px] items-center"}>
                    <span>Entries per page:</span>
                    <select value={perPage} onChange={e => perPageSetter(e.target.value)} className={"p-[2px] [border:_1px_solid_black] outline-none"}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                    </select>
                </label>
                <span>{ count ? `${page*perPage + 1} - ${page === pageCount - 1 ? count.current : (page + 1)*perPage} out of ${count.current}` : ""}</span>
            </div>
            {
                children
            }
            <div className={"w-full [border-top:_1px_solid_black] flex flex-row justify-center gap-[10px]"}>
                {
                    // "First" button
                    page === 0 ?
                        <span className={"p-[5px] [color:_#a0a0a0] cursor-default"}>First</span>
                    :
                        <button className={"p-[5px] cursor-pointer"} onClick={() => pageSetter(0)} title={"Go to first page"}>First</button>
                }
                {
                    // "Prev" button
                    page === 0 ?
                        <span className={"p-[5px] [color:_#a0a0a0] cursor-default"}>Prev</span>
                    :
                        <button className={"p-[5px] cursor-pointer"} onClick={() => pageSetter(page - 1)} title={"Go to previous page"}>Prev</button>

                }
                {
                    // Page counter
                    count ? <span className={"p-[5px]"}>{page + 1} / {pageCount}</span> : <></>
                }
                {
                    // "Next" button
                    page === pageCount - 1 ?
                        <span className={"p-[5px] [color:_#a0a0a0] cursor-default"}>Prev</span>
                    :
                        <button className={"p-[5px] cursor-pointer"} onClick={() => pageSetter(page + 1)} title={"Go to next page"}>Next</button>
                }
                {
                    // "Last" button
                    page === pageCount - 1 ?
                        <span className={"p-[5px] [color:_#a0a0a0] cursor-default"}>Last</span>
                    :
                        <button className={"p-[5px] cursor-pointer"} onClick={() => pageSetter(0)} title={"Go to last page"}>Last</button>
                }
            </div>
        </div>
    )
}