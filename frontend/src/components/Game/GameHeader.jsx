import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useRecoilValue } from 'recoil'
// import { userAuth } from '../recoil/users'
// import { worldsState } from '../recoil/atoms'
import OptionsOverlay from './OptionsOverlay'
import styled from 'styled-components'
import SocialButton from './SocialButton'


export default function GameHeader({render, setRender}) {
  const [showOptions, setOptionsOverlay]  = useState(false)
  const [showSocial, setShowSocial] = useState(false)
  const handleShowOpt = () => setOptionsOverlay(!showOptions)
  const [user, setUser] = useState([]);
//   const auth = useRecoilValue(userAuth)
//   const worlds = useRecoilValue(worldsState)
  


  useEffect(() => {
    
    axios.get("/user/get/score")
            .then(data => {
              setUser(cleanUp(data));
            });  
    setRender(false);
          
  }, [render]);


  // const cleanUp = (data) => {
  //   let items = []
  //   const channel = data.data

  //   channel.forEach(element => {
  //     let item = {
  //           username: element.displayName.stringValue,
  //           score: element.score.integerValue
  //       }
  //       items.push(item);  
  //     })
    
  //   let user = items.find((e) => {
  //     return e.username === auth.user.bio.displayName
  //   });


  //   return user;
  // }
    
  return (
    <GameHeaderContainer>
      <SocialButton show={showSocial} social="twitter" score={user?.score}/>
      <SocialButton show={showSocial} social="telegram" score={user?.score}/>
      <div className="game-header">
          <div className="game-header-title">
            <h2><sb-var data-var="name">Score: {user?.score}</sb-var></h2>
          </div>
        <div className="game-header-title">
          {/* <h2><sb-var data-var="name">Room: {auth?.roomNum}</sb-var></h2> */}
          <h2><sb-var data-var="name">Room: {"000000"}</sb-var></h2>
          <div className="sb-meta">
            {/* <sb-var data-var="label">{auth?.world} - {worlds[auth?.world].topic}</sb-var> */}
            <sb-var data-var="label">{"The Skeld"} - {"Software Engineering"}</sb-var>
          </div>
        </div>
        <button onClick={handleShowOpt}>Options</button>
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
const ShareButton = styled.button`
  height: 4rem;
  width: 8.5rem;
  background: transparent;
  font-family: var(--fonts-secondary);
  font-size: var(--heading-4-text-size);
  text-transform: uppercase;
  border: 2px solid var(--task-heading-text-color);
  color: var(--task-heading-text-color);
  border-radius: 10%;
  margin: 0.5rem 0;
  cursor: pointer;
  outline: none;
`


