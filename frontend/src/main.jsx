import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from './components/App.jsx'
import Callback from './components/Callback.jsx'
import GameWrapper from './components/Game/index.jsx'
import Redeem from './components/Redeem.jsx';
import './index.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App/>}>
        <Route path="game" element={<GameWrapper />}/>
        <Route path="redeem" element={<Redeem />}/>
      </Route>
      <Route path="callback" element={<Callback />} />
      <Route path="*" element={<App />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
