import React, { useState, useEffect } from 'react';
import styled from 'styled-components'

export default function GameHeader({render, setRender}) {
  const [showOptions, setOptionsOverlay]  = useState(false)
  const handleShowOpt = () => setOptionsOverlay(!showOptions)

  useEffect(() => {
    setRender(false);
  }, [render]);


  return (
    <GameHeaderContainer>
      <div className="game-header">
        <div className="game-header-title">
          <h2><sb-var data-var="name">Topic: Software Engineering</sb-var></h2>
          <div className="sb-meta">
          </div>
        </div>
      </div>
      { showOptions ? <OptionsOverlay handleShowOpt={handleShowOpt}/> : null } 
    </GameHeaderContainer>
  )
}

const GameHeaderContainer = styled.div` 
  width: 860px;
  margin: 0 auto;
  display: flex;
  position: relative;
`


