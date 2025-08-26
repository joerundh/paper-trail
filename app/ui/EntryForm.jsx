

export default function EntryForm() {
    const [ submitted, setSubmitted ] = useState(false);

    const [ title, setTitle ] = useState("");
    const [ makePublic, setMakePublic ] = useState(false);

    return (
        <>
            <form>
                <label>
                    Title: <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                </label>
                <label>

                </label>
                <label>
                    Show in public list: <input type="checkbox" checked={makePublic} onChange={e => setMakePublic(e.target.checked)} />
                </label>
            </form>
        </>
    )
}