import './App.css';

import {useState} from 'react'

import DiceRoller from './components/DiceRoller'
import List from './components/List'

function App() {
    const [messages, setMessages] = useState([])

    function getRandomInt(min, max) {
        var cmin = Math.ceil(min)
        var fmax = Math.floor(max)
        return Math.floor(Math.random() * (fmax - cmin + 1)) + cmin
    }

    // TODO: Receive a modifier to sum at the end
    // TODO: How to deal with advantages and disadvantages?
    function roll(selectedDices, from="") {

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
            <DiceRoller roll={roll} messages={messages} />
        </div>
    );
}

export default App;
