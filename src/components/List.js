import { useState } from 'react'

export default function List(props) {
    const [items, setItems] = useState([])

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

    function ItemLists() {
        return(
            items.map(item => (
                <li key={item.id}>{item.content} <button onClick={() => deleteItem(item.id)}>X</button></li>
            ))
        )
    }

    return(
        <div className="items">
            <h2>{props.title}</h2>
            <div>
                {items.length > 0 && <ul><ItemLists /></ul>}
            </div>
            <form onSubmit={handleNewItem}>
                <label>{props.inputLabel}: <input type="text" /></label>
                <input type="submit" value="Create" />
            </form>
            <form onSubmit={handleClearItems}>
                <input type="submit" value="Clear the list" />
            </form>
        </div>
    )
}
