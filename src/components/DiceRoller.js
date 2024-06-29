import { useState } from 'react'

import DiceTray from './DiceTray'

export default function DiceRoller() {
    const dices = [
        {name: "d4", faces: 4, qnt: 0},
        {name: "d6", faces: 6, qnt: 0},
        {name: "d8", faces: 8, qnt: 0},
        {name: "d10", faces: 10, qnt: 0},
        {name: "d12", faces: 12, qnt: 0},
        {name: "d20", faces: 20, qnt: 0}
    ]
    const [selectedDices, setSeletectedDices] = useState(dices)
    const [messages, setMessages] = useState([])

    function addDice(dice_name) {
        setSeletectedDices(prev => {
            return prev.map(oldDice => {
                if(oldDice.name === dice_name) {
                    return {...oldDice, qnt: oldDice.qnt + 1}
                } else {
                    return oldDice
                }
            })
        })
    }

    function getRandomInt(min, max) {
        var cmin = Math.ceil(min)
        var fmax = Math.floor(max)
        return Math.floor(Math.random() * (fmax - cmin + 1)) + cmin
    }

    // TODO: Receive a modifier to sum at the end
    // TODO: How to deal with advantages and disadvantages?
    // TODO: Maybe this function should receive the selectedDices and be moved to App
    function roll() {

        var {rolled, newMessages} = selectedDices.reduce((acc, dice) => {
            if (dice.qnt > 0) {
                var rolled = getRandomInt(dice.qnt, (dice.faces * dice.qnt))

                return {
                    ...acc,
                    rolled: acc.rolled + rolled,
                    newMessages: [...acc.newMessages, `${dice.qnt}${dice.name}`]
                }
            } else {
                return acc
            }
        }, {rolled: 0, newMessages: []})

        rolled > 0 && setMessages(oldMessages => ([...oldMessages, `[${newMessages.join(" + ")}] Rolled: ${rolled}`]))
        setSeletectedDices(dices)
    }

    return (
        <div className="dices">
            <h2>Dices</h2>
            <DiceTray dices={selectedDices} addDice={addDice} roll={roll} />
            <div className="rolling-logs">
                <h3>Rolling Logs</h3>
                <ul>{messages.map((msg, i) => <li key={i}>{msg}</li>)}</ul>
            </div>
        </div>
    )
}
