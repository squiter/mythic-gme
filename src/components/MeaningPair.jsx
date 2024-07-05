export default function MeaningPair({meaningTableType, rollMeaningTable, currentMeaningPair, clearMeaningPair}){
    function handleClearSelected() {
        clearMeaningPair()
    }
    return(
        <div className="meaning-pair">
            <button onClick={rollMeaningTable}>Roll for a {meaningTableType} Meaning Pair</button>
            {currentMeaningPair.length > 0 && (
                <div className="roll-result">
                    <p>
                        {currentMeaningPair.map((item, i) => `${item} `)}
                    </p>
                    <button className="close" onClick={handleClearSelected}>X</button>
                </div>
            )}
        </div>
    )
}
