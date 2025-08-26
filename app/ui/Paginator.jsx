export default function Paginator({ perPage, perPageSetter, sortBy, sortBySetter }) {
    return (
        <div className={"w-full p-[10px] bg-gray-500 flex flex-row justify-between items-center"}>
            <label>

            </label>
            <label>
                Sort by: <select value={sortBy}>
                    <option value={0}>Date added, desc</option>
                    <option value={1}>Date added, asc</option>
                    <option value={2}>Title, A-Z</option>
                    <option value={3}>Title, Z-A</option>
                </select>
            </label>
        </div>
    )
}