export default function MeaningPair({meaningTableType, rollMeaningTable, currentMeaningPair}){
    return(
        <div className="meaning-pair">
            <button onClick={rollMeaningTable}>Roll for a {meaningTableType} Meaning Pair</button>
            {currentMeaningPair.map((item, i) => <p key={`${meaningTableType}-meaning-table-${i}`}>{item}</p>)}
        </div>
    )
}
