import React from 'react'
import Home from './Home'
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
export default function App() {
  return (
    <Router>
      <Routes>
        <Route  path='/' element={<Home/>}/>
        <Route path="*" element={ '404 not found' }/>
      </Routes>
    </Router>
  )
}
