import { useState } from "react";
import { Outlet } from "react-router-dom";
import Toolbar from "./Toolbar";

export default function Entry() {
  const [tab, setTab] = useState('home')
  return (
    <>
      <div className='border'>
        <div className='container' data-content={tab}>
          <Toolbar setTab={setTab}/>
          <Outlet/>
        </div>
      </div>
    </>
  )
}