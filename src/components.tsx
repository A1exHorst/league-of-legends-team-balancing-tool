import React from 'react';

export interface player {
  name: string,
  rank: string,
  role_primary: string,
  role_secondary: string
}

interface AddPlayerBoxProps{
    newPlayer: player,
    updateNewPlayer: (newPlayer: player) => void,
    addPlayer: () => void
}

export function AddPlayerBox({newPlayer, updateNewPlayer, addPlayer}: AddPlayerBoxProps){
    return(
        <>
            <input key="player_add_box_name" type='text' value={newPlayer.name} onChange={(e)=>{
                updateNewPlayer({...newPlayer, name: e.target.value});
            }} onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                  addPlayer();
                }
              }} placeholder="Player Name"></input>
            <select key="player_add_box_rank" name="player_add_box_rank" value={newPlayer.rank} onChange={(e) => {updateNewPlayer({...newPlayer, rank: e.target.value});}}>
                    <option value="Challenger">Challenger</option>
                    <option value="GrandMaster">GrandMaster</option>
                    <option value="Master">Master</option>
                    <option value="Diamond">Diamond</option>
                    <option value="Emerald">Emerald</option>
                    <option value="Gold">Gold</option>
                    <option value="Silver">Silver</option>
                    <option value="Bronze">Bronze</option>
                    <option value="Iron">Iron</option>  
                </select>
                <select key="player_add_box_role_primary" name="player_add_box_role_primary" value={newPlayer.role_primary} onChange={(e) => {
                        const input: string = e.target.value;
                        updateNewPlayer({...newPlayer, role_primary: e.target.value});
                        newPlayer.role_primary = input;
                        if (input === "Autofill" || newPlayer.role_secondary === input){
                            updateNewPlayer({...newPlayer, role_secondary: "Autofill"});
                            newPlayer.role_secondary = "Autofill";
                        }
                    }}>
                    <option value="Top">Top</option>
                    <option value="Jungle">Jungle</option>
                    <option value="Mid">Mid</option>
                    <option value="Bot">Bot</option>
                    <option value="Support">Support</option>
                    <option value="Autofill">Autofill</option>
                </select>
                <select key="player_add_box_role_secondary" name="player_add_box_role_secondary" value={newPlayer.role_secondary} onChange={(e) => {
                        const input: string = e.target.value;
                        if (newPlayer.role_primary !== "Autofill" && input !== newPlayer.role_primary){
                            updateNewPlayer({...newPlayer, role_secondary: e.target.value});
                            newPlayer.role_secondary = input;
                        }
                    }}>
                    <option value="Top">Top</option>
                    <option value="Jungle">Jungle</option>
                    <option value="Mid">Mid</option>
                    <option value="Bot">Bot</option>
                    <option value="Support">Support</option>
                    <option value="Autofill">Autofill</option>
                </select>
                <button onClick={()=>{addPlayer()}}>Add</button>
        </>
    )
}

interface PlayerListElementProps {
    players: player[]; // n should be a number
    updatePlayerElement: (playerIdx: number, updates: Partial<player>) => void
    deletePlayerElement: (playerIdx: number) => void
}
    
function PlayerListElement({ players, updatePlayerElement, deletePlayerElement }: PlayerListElementProps) {

    return <div>
        {players.map((player, playerIdx) => (
            <>
                <input key={"player_name"+playerIdx+""} type='text' name={playerIdx+""} value={player.name} onChange={(e) => {updatePlayerElement(playerIdx, {name: e.target.value})}}></input>
                <select key={"player_rank" + playerIdx} name={"rank" + playerIdx} value={player.rank} onChange={(e) => {updatePlayerElement(playerIdx, {rank: e.target.value})}}>
                    <option value="Challenger">Challenger</option>
                    <option value="GrandMaster">GrandMaster</option>
                    <option value="Master">Master</option>
                    <option value="Diamond">Diamond</option>
                    <option value="Emerald">Emerald</option>
                    <option value="Gold">Gold</option>
                    <option value="Silver">Silver</option>
                    <option value="Bronze">Bronze</option>
                    <option value="Iron">Iron</option>  
                </select>
                <select key={"player_role_primary" + playerIdx} name={"role_primary" + playerIdx} value={player.role_primary} onChange={(e) => {
                        const input: string = e.target.value;
                        updatePlayerElement(playerIdx, {role_primary: input});
                        player.role_primary = input;
                        if (input === "Autofill" || player.role_secondary === input){
                            updatePlayerElement(playerIdx, {role_secondary: "Autofill"});
                            player.role_secondary = "Autofill";
                        }
                    }}>
                    <option value="Top">Top</option>
                    <option value="Jungle">Jungle</option>
                    <option value="Mid">Mid</option>
                    <option value="Bot">Bot</option>
                    <option value="Support">Support</option>
                    <option value="Autofill">Autofill</option>
                </select>
                <select key={"player_role_secondary" + playerIdx} name={"role_secondary" + playerIdx} value={player.role_secondary} onChange={(e) => {
                        const input: string = e.target.value;
                        if (player.role_primary !== "Autofill" && input !== player.role_primary){
                            updatePlayerElement(playerIdx, {role_secondary: e.target.value});
                            player.role_secondary = input;
                        }
                    }}>
                    <option value="Top">Top</option>
                    <option value="Jungle">Jungle</option>
                    <option value="Mid">Mid</option>
                    <option value="Bot">Bot</option>
                    <option value="Support">Support</option>
                    <option value="Autofill">Autofill</option>
                </select>
                <button key={"remove_player" + playerIdx} onClick={()=>{deletePlayerElement(playerIdx)}}>X</button>
                <br />
            </>
            ))}
    </div>;
}

/*
<li key={idx}>
    {player.name} - {player.rank}
</li>
*/

export default PlayerListElement;