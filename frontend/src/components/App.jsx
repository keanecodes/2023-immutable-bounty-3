import { useState } from "react";
import { Outlet } from "react-router-dom";
import Toolbar from "./Toolbar";

import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

export default function Entry() {
  const [tab, setTab] = useState('home')
  return (
    <>
      <div className='border'>
        <div className='container' data-content={tab}>
          <Toolbar setTab={setTab}/>
          {tab !== "home" && <Outlet/>}
        </div>
      </div>
    </>
  )
}