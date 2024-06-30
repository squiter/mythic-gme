import './App.css';

import {useState} from 'react'

import DiceRoller from './components/DiceRoller'
import FateChart from './components/FateChart'
import List from './components/List'

function App() {
    const [messages, setMessages] = useState([])

    function addMessage(message) {
        setMessages((prev) => [...prev, message])
    }

    function getRandomInt(min, max) {
        var cmin = Math.ceil(min)
        var fmax = Math.floor(max)
        return Math.floor(Math.random() * (fmax - cmin + 1)) + cmin
    }

    // TODO: Receive a modifier to sum at the end
    function roll(selectedDices, from="", adv=false, dadv=false) {

        var {rolled, newMessages} = selectedDices.reduce((acc, dice) => {
            if (dice.qnt > 0) {
                var rolls = [...Array(dice.qnt).keys()].map((_) => {return getRandomInt(1, dice.faces)})
                var rolled = 0
                var msg = ""

                if (adv) {
                    rolled = Math.max(...rolls)
                    msg = rolls.map((roll) => `1${dice.name}kh=${roll}`).join(", ")
                } else if (dadv) {
                    rolled = Math.min(...rolls)
                    msg = rolls.map((roll) => `1${dice.name}kl=${roll}`).join(", ")
                } else {
                    rolled = rolls.reduce((acc, n) => {return acc + n}, 0)
                    msg = `${dice.qnt}${dice.name}`
                }

                return {
                    ...acc,
                    rolled: acc.rolled + rolled,
                    newMessages: [...acc.newMessages, msg]
                }
            } else {
                return acc
            }
        }, {rolled: 0, newMessages: []})

        var baseMessage = `[${newMessages.join(" + ")}] Rolled: ${rolled}`
        var message = from !== "" ? `${from} - ${baseMessage}` : baseMessage

        rolled > 0 && setMessages(oldMessages => ([...oldMessages, message]))
        return rolled
    }

    return (
        <div className="App">
            <h1>Mythic GME</h1>
            <List
                title="NPC List"
                inputLabel="New NPC"
                confirmationMessage="Are you sure you want to clear the entire NPC list?"
                roll={roll}
            />
            <List
                title="Thread List"
                inputLabel="New Thread"
                confirmationMessage="Are you sure you want to clear the entire Thread list?"
                roll={roll}
            />
            <FateChart getRandomInt={getRandomInt} addMessage={addMessage}/>
            <DiceRoller roll={roll} messages={messages} />
        </div>
    );
}

export default App;
