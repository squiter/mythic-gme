import { useState } from 'react'

import dices from '../data/dices'

export default function DiceRoller({roll, messages}) {
    const [selectedDices, setSeletectedDices] = useState(dices)

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

    function rollAndClear() {
        roll(selectedDices)
        setSeletectedDices(dices)
    }

    return (
        <div className="dices">
            <div className="dice-tray">
                <h2>Dices</h2>
                <ul>
                    {selectedDices.map((dice) => <li key={dice.name} onClick={() => addDice(dice.name)}>{dice.name}: {dice.qnt}</li>)}
                </ul>
                <button onClick={rollAndClear}>Roll</button>
            </div>
            <div className="rolling-logs">
                <h3>Rolling Logs</h3>
                <ul>{messages.map((msg, i) => <li key={i}>{msg}</li>)}</ul>
            </div>
        </div>
    )
}
