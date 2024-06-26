import './App.css';

import List from './components/List'

function App() {
    return (
        <div className="App">
            <h1>Mythic GME</h1>
            <List
                title="NPC List"
                inputLabel="New NPC"
                confirmationMessage="Are you sure you want to clear the entire NPC list?"
            />
            <List
                title="Thread List"
                inputLabel="New Thread"
                confirmationMessage="Are you sure you want to clear the entire Thread list?"
            />
        </div>
    );
}

export default App;
