export default function DiceTray({dices, addDice, roll}) {
    return(
        <div className="dice-tray">
            <ul>
                {dices.map((dice) => <li key={dice.name} onClick={() => addDice(dice.name)}>{dice.name}: {dice.qnt}</li>)}
            </ul>
            <button onClick={roll}>Roll</button>
        </div>
    )
}
