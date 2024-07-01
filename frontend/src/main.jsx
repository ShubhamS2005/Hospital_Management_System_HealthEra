import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

export const Context=createContext({isAuthenticated:false})

const Appwraper=()=>{
  const [isAuthenticated,setIsAuthenticated]=useState(false)
  const [User,setUser]=useState({})
  return (
    <Context.Provider value={{isAuthenticated,setIsAuthenticated,User,setUser}}>
    <App />
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <Appwraper/>
)
