import { useState } from 'react'
// import GameHeader from '../components/GameHeader'
import GameInstance from './GameInstance'
// import GamePrompt from '../components/GamePrompt'
// import GameWorldStation from '../components/GameWorldStation'

export default function GameWrapper() {
  const [game, setGame] = useState(null)
	const attachGame = game => setGame(game);
  const [render, setRender] = useState(false)

  return (
    <>
      {/* <GameHeader render={render} setRender={setRender}/> */}
      <div className="task-wrapper">
        {/* <GameWorldStation setRender={setRender}/> : <div style={{flex:1}}/> */}
        <div id="phaser">
          <GameInstance setGame={attachGame} game={game}/>
        </div>
        {/* <GamePrompt/> : <div style={{flex:1}}/> */}
      </div>
    </>
  )
}