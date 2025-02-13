import { useState } from 'react'

import fateChart from '../data/fateChart'

export default function FateChart({getRandomInt, addMessage, triggerRandomEvent}) {
    const [chaosFactor, setChaosFactor] = useState(5)
    const [currentOdd, setCurrentOdd] = useState("50/50")
    const [currentFate, setCurrentFate] = useState("")

    function decreaseChaosFactor() {
        setChaosFactor((prev) => prev > 1 ? prev - 1 : prev)
    }

    function increaseChaosFactor() {
        setChaosFactor((prev) => prev < 9 ? prev + 1 : prev)
    }

    function handleChange(event) {
        const {value} = event.target
        setCurrentOdd(value)
    }

    function handleClearSelected(){
        setCurrentFate("")
    }

    function rollFate() {
        var first = getRandomInt(0, 9)
        var second = getRandomInt(0, 9)
        var total = parseInt(`${first}${second}`)
        console.log(currentOdd, chaosFactor, first, second, total)
        var fateTripple = fateChart.find((line) => line.odd === currentOdd).by_chaos[chaosFactor - 1]

        var result = ""
        if (total <= fateTripple[0]) {
            result = "Extremely Yes"
        } else if (total <= fateTripple[1]){
            result = "Yes"
        } else if (total < fateTripple[2]){
            result = "No"
        } else {
            result = "Extremely No"
        }
        setCurrentFate(result)
        addMessage("Fate Chart", `1d10=${first}, 1d10=${second}`, `${total} - ${result}`)

        if ((first === second) && first <= chaosFactor) {
            triggerRandomEvent("Fate Chart [Random Event]")
        }
    }

    return (
        <div className="fate-chart">
            <h2>Fate Chart</h2>
            <div className="chaos-factor">
                <div className="indicator"><span className="number">{chaosFactor}</span></div>
                <div className="buttons">
                    <div className="change decrease" onClick={decreaseChaosFactor}>-</div>
                    <div className="change increase" onClick={increaseChaosFactor}>+</div>
                </div>
            </div>
            <div className="radios-wrapper">
                <h3>Odds</h3>
                <div className="radios">
                    {fateChart.map((line) => {
                        return(
                            <div key={`d-${line.odd}`}>
                                <input
                                    type="radio"
                                    key={line.odd}
                                    id={line.odd}
                                    value={line.odd}
                                    checked={currentOdd === line.odd}
                                    onChange={handleChange}
                                    name="odds"
                                />
                                <label key={`l-${line.odd}`} htmlFor={line.odd}>{line.odd}</label>
                            </div>
                        )
                    })}
                </div>
            </div>
            <button onClick={rollFate}>Roll fate</button>
            {currentFate !== "" && (
                <div className="roll-result">
                    <p><strong>{currentFate}</strong></p>
                    <button className="close" onClick={handleClearSelected}>X</button>
                </div>
            )}
        </div>
    )
}
