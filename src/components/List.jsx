import { useState, useEffect } from 'react'

export default function List(props) {
    const [items, setItems] = useState(
        () => JSON.parse(localStorage.getItem(props.title)) || []
    )
    const [selected, setSelected] = useState("")

    useEffect(() => (localStorage.setItem(props.title, JSON.stringify(items))), [items, props.title])

    function lastId() {
        var sorted = items.sort((first, second) => first.id - second.id)
        return sorted.length === 0 ? 0 : sorted[sorted.length -1].id
    }

    function buildItem(content) {
        return {id: lastId() + 1, content: content}
    }

    function createItem(content) {
        setItems(prevItems => [...prevItems, buildItem(content)])
    }

    function deleteItem(id) {
        setItems(prevItems => {
            return prevItems.filter(item => (item.id !== id))
        })
    }

    function clearItems() {
        setItems([])
    }

    function handleNewItem(event) {
        event.preventDefault();
        var target = event.target[0]
        createItem(target.value)
        target.value = ""
    }

    function handleClearItems(){
        if (window.confirm(props.confirmationMessage)) clearItems()
    }

    function handleClearSelected(){
        setSelected("")
    }

    function ItemLists() {
        return(
            items.map(item => (
                <li key={item.id}>{item.content} <button className="close" onClick={() => deleteItem(item.id)}>X</button></li>
            ))
        )
    }

    function handleRoll() {
        var qnt = items.length
        var rolled = props.roll([{qnt: 1, faces: qnt, name: `d${qnt}`}], `${props.title} List`)

        setSelected(items[rolled-1].content)
    }

    return(
        <div className="items">
            <h2>{props.title} List</h2>
            <div>
                {items.length > 0 && <ol><ItemLists /></ol>}
            </div>
            <form onSubmit={handleNewItem}>
                <label>New {props.title}: <input type="text" /></label>
                <input type="submit" value="Create" />
            </form>
            {items.length > 0 && <button onClick={handleClearItems}>Clear the list</button>}
            {items.length > 0 && <button onClick={handleRoll}>Roll</button>}
            {selected !== "" && (
                <div className="roll-result">
                    <p><strong>Rolled for:</strong> {selected}</p>
                    <button className="close" onClick={handleClearSelected}>X</button>
                </div>
            )}
        </div>
    )
}
