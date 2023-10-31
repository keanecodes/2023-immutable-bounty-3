import React from 'react'
// import { useRecoilValue } from 'recoil'
// import { userAuth } from '../recoil/users'

export default function GamePrompt() {
  // const auth = useRecoilValue(userAuth)
  // const isAuthUser = auth?.isAuthenticated
  // const isAuthProf = isAuthUser && auth?.user.bio.isProfessor

  return (
    <div className="task-prompt">
      <sb-update data-id="Beginning" data-sb="true" data-type="sb-update" tabindex="10000" style={{ order: 0 }} data-unsorted="true">
        <h3 className="dashed-h3 dashed">Welcome to Space Maze!</h3>
        <p role="article">Learn more on Software Lifecycle Phases as you progress through stations and maps! </p>
      </sb-update>
      <sb-update data-id="potato" data-sb="true" data-type="sb-update"  data-click="togglePotato" tabindex="10100" style={{ order: 100 }} data-unsorted="true">
        <h3 className="sb-dashed">Get started!</h3>
        <p role="article">&#8592; Press the blue buttons at the left side to find hints on the subtopics that need to be solved for this map's topic.</p>
      </sb-update>
    </div>
  )
}
