import './App.css';

import {useState} from 'react'

import DiceRoller from './components/DiceRoller'
import FateChart from './components/FateChart'
import List from './components/List'
import MeaningPair from './components/MeaningPair'
import meaningTable from './data/meaningTable'
import RandomEvent from './components/RandomEvent'
import randomEventFocus from './data/randomEventFocus'


function App() {
    const [messages, setMessages] = useState([])
    const [currentRandomEvent, setCurrentRandomEvent] = useState({})
    const [currentActionMeaningPair, setCurrentActionMeaningPair] = useState([])
    const [currentDescriptorMeaningPair, setCurrentDescriptorMeaningPair] = useState([])

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

    function triggerRandomEvent(from) {
        var rolled = getRandomInt(1, 100)
        var event = randomEventFocus.find((line) => {
            return (rolled >= line.range[0] && rolled <= line.range[1])
        })
        addMessage(`${from} (${event.result}) - [1d100] Rolled: ${rolled}`)
        setCurrentRandomEvent(event)
    }

    function rollActionMeaningTable() {
        var firstRoll = getRandomInt(1, 100)
        var selectedAction1 = meaningTable.actions1[firstRoll-1]
        addMessage(`ActionMeaningTable (${selectedAction1}) - [1d100] Rolled: ${firstRoll}`)

        var secondRoll = getRandomInt(1, 100)
        var selectedAction2 = meaningTable.actions2[secondRoll-1]
        addMessage(`ActionMeaningTable (${selectedAction2}) - [1d100] Rolled: ${secondRoll}`)

        setCurrentActionMeaningPair([selectedAction1, selectedAction2])
    }

    function rollDescriptorMeaningTable() {
        var firstRoll = getRandomInt(1, 100)
        var selectedDescriptor1 = meaningTable.descriptors1[firstRoll-1]
        addMessage(`DescriptorMeaningTable (${selectedDescriptor1}) - [1d100] Rolled: ${firstRoll}`)

        var secondRoll = getRandomInt(1, 100)
        var selectedDescriptor2 = meaningTable.descriptors2[secondRoll-1]
        addMessage(`DescriptorMeaningTable (${selectedDescriptor2}) - [1d100] Rolled: ${secondRoll}`)

        setCurrentDescriptorMeaningPair([selectedDescriptor1, selectedDescriptor2])
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
            <FateChart
                getRandomInt={getRandomInt}
                addMessage={addMessage}
                triggerRandomEvent={triggerRandomEvent}
            />
            {Object.keys(currentRandomEvent).length !== 0 && <RandomEvent
                                                                 currentRandomEvent={currentRandomEvent}
                                                                 currentMeaningPair={currentActionMeaningPair}
                                                                 rollMeaningTable={rollActionMeaningTable}
                                                             />}
            <MeaningPair
                meaningTableType="Descriptor"
                rollMeaningTable={rollDescriptorMeaningTable}
                currentMeaningPair={currentDescriptorMeaningPair}
            />
            <DiceRoller roll={roll} messages={messages} />
        </div>
    );
}

export default App;
