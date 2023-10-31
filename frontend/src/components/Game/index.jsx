import { useState } from 'react'
import GameHeader from './GameHeader'
import GameInstance from './GameInstance'
import GamePrompt from './GamePrompt'
import GameWorldStation from './GameWorldStation'

export default function GameWrapper() {
  const [game, setGame] = useState(null)
	const attachGame = game => setGame(game);
  const [render, setRender] = useState(false)

  return (
    <>
      <GameHeader render={render} setRender={setRender}/>
      <div className="task-wrapper">
        <GameWorldStation setRender={setRender}/> 
        <div id="phaser">
          <GameInstance setGame={attachGame} game={game}/>
        </div>
        <GamePrompt/>
      </div>
    </>
  )
}