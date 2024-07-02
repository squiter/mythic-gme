export default function RandomEvent({currentRandomEvent, currentMeaningPair, rollMeaningTable}){
    return (
        <div className="random-event">
            <p><strong>Event: {currentRandomEvent.result}</strong></p>
            <button onClick={rollMeaningTable}>Roll for a Meaning Pair</button>
            {currentMeaningPair.map((item, i) => <p key={`meaning-table-${i}`}>{item}</p>)}
        </div>
    )
}
