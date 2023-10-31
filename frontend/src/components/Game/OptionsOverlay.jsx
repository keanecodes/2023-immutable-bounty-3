import React, { useState } from 'react'
// import { useRecoilState, useRecoilValue } from 'recoil'
// import { userAuth, sendUserServerUpdate } from '../recoil/users'
// import { worldsState } from '../recoil/atoms'
import { spriteIdMap, sceneIdMap } from "./phaser/importer";
import styled from 'styled-components'
import SocialButton from './SocialButton';



export default function OptionsOverlay({handleShowOpt}) {
  // const auth = useRecoilValue(userAuth)
  // const isAuthProf = auth?.isAuthenticated && auth?.user.bio.isProfessor
  // const [tab, setTab] = useState( !isAuthProf ? "color" : "world")
  const [tab, setTab] = useState("color")

  return (
    <div className="sb-task-dialog-container">
      <div className="sb-task-dialog glow-border" aria-modal="true" role="dialog">
        <OptionsHeader closeDialog={handleShowOpt}/>
        
        <OptionsTabs state={tab} changeTab={setTab} closeDialog={handleShowOpt}/>
        
        <ColourChoices state={tab} closeDialog={handleShowOpt}/>
        <Worlds state={tab} closeDialog={handleShowOpt}/>
      </div>
    </div>
  )
}

const OptionsHeader = ({closeDialog}) => {
  // const auth = useRecoilValue(userAuth)
  return (
    <div className="sb-task-header dashed" data-click onClick={closeDialog}>
      <div className="game-header-title">
        <h2>Requirements Engineering</h2>
        {/* <div className="sb-meta">{auth?.world ? auth.world : "The Skeld"} - Room: {auth?.roomNum}</div> */}
        <div className="sb-meta">{"The Skeld"} - Room: {"000000"}</div>
      </div>
      <h3>Options</h3>
    </div>
  )
}

const ColourChoices = ({state, closeDialog}) => {
  // const [auth, setAuth] = useRecoilState(userAuth)
  const [UILoading, setUILoading] = useState(false)
  
  const handleGameAvatarUpdate = async e => {
    // const reqBody = {...auth.user.bio, sprite: e.target.dataset.playerColor}
    setUILoading(true)
    // const { data } = await sendUserServerUpdate(reqBody)
    // if (data) {
    //   setAuth({...auth, user: data})
    //   // console.log(auth)
    //   setUILoading(false)
    //   closeDialog()
    // }
  }

  const slicedSpriteMap = Object.keys(spriteIdMap).slice(1)

  return(
    <>
      { (state == "color" || state == "mint") ?
        (<div className="options-selection-container">
          { UILoading 
            ? (<div style={{margin: "0 auto", fontSize: "2.5rem"}}>Painting your body... (☆v☆)</div>)
            : (slicedSpriteMap.map(id =>
              <button
                key={`{btn-color-${id}}`}
                data-player-color={id} 
                onClick={handleGameAvatarUpdate} 
                className="glow-border">
                  {spriteIdMap[id].label.toUpperCase()}
              </button>
            ))
          }
        </div>) : null
      }
    </>
  )
}

const Worlds = ({state, closeDialog}) => {
  // const [auth, setAuth] = useRecoilState(userAuth)
  // const isAuthProf = auth?.isAuthenticated && auth?.user.bio.isProfessor
  // const worlds = useRecoilValue(worldsState)
  const handleGameMapUpdate = e => {
    // setAuth({...auth, world: e.target.dataset.world})
    closeDialog()
  }

  return (
    <>
      {/* { state == "world" ? 
        <><p style={{textAlign: "center"}}>{!isAuthProf ? `Revisit Cleared World Map (SDLC Topic Revisit)` : "View Real-time Students' Topics Engagement"}</p> 
        <div className="options-selection-container">
          { auth?.worlds.map( (name, i) =>
              <button 
                key={`map-scene-btn-${i}`}
                className="glow-border"
                style={{flex:1}}
                data-world={name}
                onClick={state != "custom" ? handleGameMapUpdate : null}>
                {`${name}`} <br/><br/> {`${worlds[name].topic}`}
              </button>
                
            )
          }
        </div></> : null
      } */}
    </>
  )
}


const CheckBox = ({map, topic, setValue, checked}) => {

  const labelStyle = {
    paddingTop: "1rem",
    paddingBottom: "1rem",
  }

  return (
    <label style={labelStyle} className="dashed">
      <span>{topic}: {map}</span>
      <input checked={checked} onChange={setValue} data-map={map} data-topic={topic} type="checkbox" style={{float: "right", cursor: "pointer"}}/>
    </label> 
  )
}

const OptionsTabs = ({state, changeTab}) => {
  // const auth = useRecoilValue(userAuth)
  // const isAuthProf = auth?.isAuthenticated && auth?.user.bio.isProfessor

  const setSelected = e => {
    changeTab(e.target.dataset.tab);
  }
  
  return (
    <TabContainer>
      <Tab data-tab="color" onClick={setSelected} style={{opacity: state == "color" ? 1 : 0.5}} className={state == "color" ? "dashed" : null}>Customise Avatar</Tab>
      <TabLine className="glow-border"/>
      <Tab data-tab="world" onClick={setSelected} style={{opacity: state == "world" ? 1 : 0.5}} className={state == "world" ? "dashed" : null}>{ "Explore Worlds"}</Tab>
      <TabLine className="glow-border"/>
      <Tab data-tab="mint" onClick={setSelected} style={{opacity: state == "mint" ? 1 : 0.5}} className={state == "mint" ? "dashed" : null}>Mint New Color</Tab>
    </TabContainer>
  )
}

const TabContainer = styled.div`
  display: flex;
  margin: 2rem 1rem auto;
`;

const Tab = styled.div`
  flex: 1;
  text-align: center;
  height: 3rem;
  margin: 0 2rem;
  cursor: pointer;
`

const TabLine = styled.div`
  width: 0.1rem;
  height: 2.8rem;
  background-color: white;
`