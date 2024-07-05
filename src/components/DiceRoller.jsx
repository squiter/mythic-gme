import { useState } from 'react'

import dices from '../data/dices'

export default function DiceRoller({roll, messages}) {
    const [selectedDices, setSeletectedDices] = useState(dices)
    const [formData, setFormData] = useState({rollType: "normal"})

    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

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
        var rollType = []
        if(formData.rollType === "normal") {
            rollType = [false, false]
        }else if(formData.rollType === "isAdv") {
            rollType = [true, false]
        }else if(formData.rollType === "isDadv") {
            rollType =[false, true]
        }
        roll(selectedDices, "", ...rollType)
        setSeletectedDices(dices)
    }

    return (
        <div className="dices">
            <div className="dice-tray">
                <h2>Dices</h2>
                <ul className="dices">
                    {selectedDices.map((dice) => <li
                                                     key={dice.name}
                                                     className={dice.name}
                                                     onClick={() => addDice(dice.name)}
                                                 >
                                                     {dice.qnt}
                                                 </li>)}
                </ul>
                <fieldset>
                    <legend>Roll type</legend>
                    <input
                        type="radio"
                        id="normal"
                        value="normal"
                        checked={formData.rollType === "normal"}
                        onChange={handleChange}
                        name="rollType"
                    />
                    <label htmlFor="normal">Normal</label>
                    <input
                        type="radio"
                        id="isAdv"
                        value="isAdv"
                        checked={formData.rollType === "isAdv"}
                        onChange={handleChange}
                        name="rollType"
                    />
                    <label htmlFor="isAdv">Advantage</label>
                    <input
                        type="radio"
                        id="isDadv"
                        value="isDadv"
                        checked={formData.rollType === "isDadv"}
                        onChange={handleChange}
                        name="rollType"
                    />
                    <label htmlFor="isDadv">Disadvantage</label>
                </fieldset>
                <button onClick={rollAndClear}>Roll</button>
            </div>
            <div className="rolling-logs">
                <h3>Rolling Logs</h3>
                <ul>{messages.map((msg, i) => <li key={i}>{msg}</li>)}</ul>
                <small>kh = keep highest, kl = keep = lowest</small>
            </div>
        </div>
    )
}
