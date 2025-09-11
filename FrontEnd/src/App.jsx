import React from 'react'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import {Provider} from 'react-redux'

import Home from './components/Home'

function App() {
  

  return (
    
    <>


    <Routes>
      <Route path='/' element={<Home/>}/>



    </Routes>
      
      
    </>
  )
}

export default App
