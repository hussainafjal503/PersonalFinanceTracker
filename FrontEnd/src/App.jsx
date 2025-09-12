import React from 'react'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'


import Home from './components/Home'
import ExpenseText from './components/ExpenseText'

function App() {
  

  return (
    
    <>


    <Routes>
      <Route path='/' element={<Home/>}>
        <Route index element={<ExpenseText/>} />
      
      </Route>
     


    </Routes>
      
      
    </>
  )
}

export default App
