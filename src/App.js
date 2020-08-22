import React from 'react'
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import RootPages from './pages'
import './App.css'

function App() {
  return (
    <Router>
      <RootPages />
    </Router>
  )
}

export default App
