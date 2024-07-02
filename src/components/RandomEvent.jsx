import MeaningPair from './MeaningPair'

export default function RandomEvent({currentRandomEvent, currentMeaningPair, rollMeaningTable}){
    return (
        <div className="random-event">
            <p><strong>Event: {currentRandomEvent.result}</strong></p>
            <MeaningPair
                meaningTableType="Action"
                rollMeaningTable={rollMeaningTable}
                currentMeaningPair={currentMeaningPair}
            />
        </div>
    )
}
