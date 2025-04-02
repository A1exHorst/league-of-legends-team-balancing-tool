import { useEffect, useState } from 'react'
import PlayerListElement from './components';
import { AddPlayerBox } from './components';
import { player } from './components';
//import '../src/index.css'
//roles = /^[A-Za-z0-9]+(?: [A-Za-z0-9]+)?$/;     <-- Ein Space oder keins

const rankDistributions: number[] = [0.19, 0.19, 0.19, 0.17, 0.11, 0.086, 0.027, 0.0059, 0.00065, 0.00027]

const rankValue = (rank: number): number =>{
  //skill(r) = C*log(1/rankDistributions[r])
  return 4*Math.log10(1/rankDistributions[rank]);
}

function getPermutations<T>(arr: T[]): T[][] {
  if (arr.length === 0) return [[]];
  return arr.flatMap((value, index) =>
      getPermutations([...arr.slice(0, index), ...arr.slice(index + 1)]).map(permutation => [value, ...permutation])
  );
}


const convertRankTextToRankNumber = (rankText: string): number =>{
  switch (rankText) {
    case "Challenger":
      return 9;
    case "GrandMaster":
      return 8;
    case "Master":
      return 7;
    case "Diamond":
      return 6;
    case "Emerald":
      return 5;
    case "Platinum":
      return 4;
    case "Gold":
      return 3;
    case "Silver":
      return 2;
    case "Bronze":
      return 1;
    case "Iron":
      return 0;
    default:
      return 3;
  }
}



/*
1. Alle Spielerkombinationen für Ranks probieren dabei sich die besten Kombinationen (die, die am ausgeglichesten sind) merken
2. Innerhalb den Teams die Rollen quasi rekursiv zufällig verteilen.
*/

function App() {
  const [players, setPlayers] = useState<player[]>([])
  const [newPlayer, setNewPlayer] = useState<player>(resetNewPlayerBox());
  const [playerCounter, setPlayerCounter] = useState(0);

  useEffect(() => {
    resetNewPlayerBox();
    //let examplePlayer: player = {name: "Alex", rank: "Master", role_primary: "Bot", role_secondary: "Jungle"}
    //addPlayer(examplePlayer);
    //let examplePlayer2: player = {name: "LOL", rank: "LOL", role_primary: "LOL", role_secondary: "LOL"}
    //addPlayer(examplePlayer2);
    const testArray: number[] = [1,2,3,4,5,6,7,8]
    console.log("testArray: " + testArray)
    console.log("Combinations: " + getPermutations(testArray))
  }, []);

  function updatePlayerElement(playerIdx: number, updates: Partial<player>){
    const updatedPlayer: player = {...players[playerIdx], ...updates};  //...players[playerIdx] macht eine Kopie vom Objekt. ...updates ersetzt diese Properties vom Objekt
    const newPlayersArray = players.map((oldPlayer, index) => (index === playerIdx ? updatedPlayer : oldPlayer));
    setPlayers(newPlayersArray);
  }

  function deletePlayerElement(playerIdx: number){
    setPlayers([...players.slice(0, playerIdx), ...players.slice(playerIdx + 1)]);
    setPlayerCounter(playerCounter - 1);
  }

  function addPlayer(){
    if(newPlayer.name.trim() !== "" && playerCounter < 10 && players.every(player => newPlayer.name !== player.name)){
      setPlayers([newPlayer, ...players]);
      setNewPlayer(resetNewPlayerBox());
      setPlayerCounter(playerCounter + 1);
    }
  }

  function resetNewPlayerBox(){
    return {name: "", rank: "Gold", role_primary: "Autofill", role_secondary: "Autofill"};
  }

  return (
    <>
      <div>
        <h1>League of Legends team balancing tool</h1>
        <p>30.03.2025</p>
        <p>Player Counter: {playerCounter}</p>
        <AddPlayerBox newPlayer={newPlayer} updateNewPlayer={setNewPlayer} addPlayer={addPlayer}></AddPlayerBox>
        <br></br>
        <PlayerListElement players={players} updatePlayerElement={updatePlayerElement} deletePlayerElement={deletePlayerElement}/>
        
      </div>
    </>
  )
}

export default App;

/*
  Oben ein Feld, dort Namen eingeben, die Rollen und Ranks. In die Liste können nur 10 Leute rein.
  Darunter wird dann dargestellt, was soweit gebalanced ist. 
  Unten ein Text zum kopieren, in dem alle Teams geschrieben sind.
*/

/*
Durch das Editen der Namen können duplikate entstehen
*/