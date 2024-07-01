import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

export const Context=createContext({isAuthenticated:false})

const AppWraper=()=>{
  const[isAuthenticated,setIsAuthenticated]=useState(false)
  const[user,setUser]=useState(false)
  const [id,setId]=useState(false)
  return(
    <Context.Provider value={{isAuthenticated,setIsAuthenticated,user,setUser,id,setId}}>
      <App/>
    </Context.Provider>

  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <AppWraper/>
)
