import { useState } from 'react'

function ListNpcs({npcs}) {
    return(
        <ul>
            {npcs.map((name) => <li>{name}</li>)}
        </ul>
    )
}

export default function NonPlayableCharacters() {
    const [npcs, setNpcs] = useState([]);

    const newNpc = (name) => {
        setNpcs([...npcs, name])
    }

    const handleNewNpc = (event) => {
        event.preventDefault();
        newNpc(event.target[0].value)
        event.target[0].value = ""
    }

    const handleClearList = (event) => {
        event.preventDefault();
        if (window.confirm('Are you sure you want to clear the entire NPC list?')) setNpcs([])
    }

    return(
        <div className="npcs">
            <h2>NPC List</h2>
            <ListNpcs npcs={npcs} />
            <form onSubmit={handleNewNpc}>
                <label>New NPC: <input type="text" /></label>
                <input type="submit" value="Create" />
            </form>
            <form onSubmit={handleClearList}>
                <input type="submit" value="Clear the list" />
            </form>
        </div>
    )
}
