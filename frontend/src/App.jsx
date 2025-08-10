import React from 'react'
import Homepage from './pages/Homepage'
import Createpage from './pages/Createpage'
import NoteDetails from './pages/NoteDetails'
import {  Routes, Route } from 'react-router'

function App() {
  return (
    <div data-theme="forest">
        
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/create" element={<Createpage />} />
          <Route path="/note/:id" element={<NoteDetails />} />
        </Routes>
    </div>
  )
}

export default App
