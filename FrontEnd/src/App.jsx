import React from 'react'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'


import Home from './components/Home'
import ExpenseText from './components/ExpenseText'
import ExpenseHistory from './components/ExpenseHistory'

function App() {
  

  return (
    
    <>


    <Routes>
      <Route path='/' element={<Home/>}>
        <Route index element={<ExpenseText/>} />
        <Route path='your-expenses' element={<ExpenseHistory/>}/>
        <Route path="your-income" element={<ExpenseHistory/>}/>
      
      </Route>
     


    </Routes>
      
      
    </>
  )
}

export default App
