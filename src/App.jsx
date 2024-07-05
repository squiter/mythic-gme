import './App.css';

import {useState} from 'react'

import DiceRoller from './components/DiceRoller'
import FateChart from './components/FateChart'
import List from './components/List'
import MeaningPair from './components/MeaningPair'
import coreMeaningTable from './data/meaningTable'
import RandomEvent from './components/RandomEvent'
import randomEventFocus from './data/randomEventFocus'


function App() {
    const [messages, setMessages] = useState([])
    const [currentRandomEvent, setCurrentRandomEvent] = useState({})
    const [currentActionMeaningPair, setCurrentActionMeaningPair] = useState([])
    const [currentDescriptorMeaningPair, setCurrentDescriptorMeaningPair] = useState([])

    // TODO: messages = {title, rolls, result}
    function addMessage(title, rolls, result) {
        setMessages((prev) => [...prev, {title: title, rolls: rolls, result: result}])
    }

    function getRandomInt(min, max) {
        var cmin = Math.ceil(min)
        var fmax = Math.floor(max)
        return Math.floor(Math.random() * (fmax - cmin + 1)) + cmin
    }

    // TODO: Receive a modifier to sum at the end
    function roll(selectedDices, title, adv=false, dadv=false) {

        var {rolled, newRollMessages} = selectedDices.reduce((acc, dice) => {
            if (dice.qnt > 0) {
                var rolls = [...Array(dice.qnt).keys()].map((_) => {return getRandomInt(1, dice.faces)})
                var rolled = 0
                var rollMessage = ""

                if (adv) {
                    rolled = Math.max(...rolls)
                    rollMessage = rolls.map((roll) => `1${dice.name}kh=${roll}`).join(", ")
                } else if (dadv) {
                    rolled = Math.min(...rolls)
                    rollMessage = rolls.map((roll) => `1${dice.name}kl=${roll}`).join(", ")
                } else {
                    rolled = rolls.reduce((acc, n) => {return acc + n}, 0)
                    rollMessage = `${dice.qnt}${dice.name}`
                }

                return {
                    ...acc,
                    rolled: acc.rolled + rolled,
                    newRollMessages: [...acc.newRollMessages, rollMessage]
                }
            } else {
                return acc
            }
        }, {rolled: 0, newRollMessages: []})

        rolled > 0 && addMessage(title, newRollMessages.join(" + "), rolled)
        return rolled
    }

    function triggerRandomEvent(title) {
        var rolled = getRandomInt(1, 100)
        var event = randomEventFocus.find((line) => {
            return (rolled >= line.range[0] && rolled <= line.range[1])
        })
        addMessage(title, "1d100", `${rolled} - ${event.result}`)
        setCurrentRandomEvent(event)
    }

    function rollActionMeaningTable() {
        var firstRoll = getRandomInt(1, 100)
        var selectedAction1 = coreMeaningTable.actions1[firstRoll-1]
        addMessage("Action Meaning Table", "1d100", `${firstRoll} - ${selectedAction1}`)

        var secondRoll = getRandomInt(1, 100)
        var selectedAction2 = coreMeaningTable.actions2[secondRoll-1]
        addMessage("Action Meaning Table", "1d100", `${secondRoll} - ${selectedAction2}`)

        setCurrentActionMeaningPair([selectedAction1, selectedAction2])
    }

    function rollDescriptorMeaningTable() {
        var firstRoll = getRandomInt(1, 100)
        var selectedDescriptor1 = coreMeaningTable.descriptors1[firstRoll-1]
        addMessage("Descriptor Meaning Table", "1d100", `${firstRoll} - ${selectedDescriptor1}`)

        var secondRoll = getRandomInt(1, 100)
        var selectedDescriptor2 = coreMeaningTable.descriptors2[secondRoll-1]
        addMessage("Descriptor Meaning Table", "1d100", `${secondRoll} - ${selectedDescriptor2}`)

        setCurrentDescriptorMeaningPair([selectedDescriptor1, selectedDescriptor2])
    }

    return (
        <div className="App">
            <header>
                <h1>Mythic GME</h1>
            </header>
            <main>
                <div className="left-sidebar">
                    <List
                        title="Characters"
                        confirmationMessage="Are you sure you want to clear the entire NPC list?"
                        roll={roll}
                    />
                    <List
                        title="Threads"
                        confirmationMessage="Are you sure you want to clear the entire Thread list?"
                        roll={roll}
                    />
                </div>
                <div className="center">
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
                </div>
                <div className="right-sidebar">
                    <DiceRoller roll={roll} messages={messages} />
                </div>
            </main>
        </div>
    );
}

export default App;
