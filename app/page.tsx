"use client"

import React from 'react'
import Notespage from './components/notes/Notespage'
import NoteProvider from '@/context/NoteContext'

const page = () => {
  return (
    <div className='' id='app'>
      <NoteProvider>
        <Notespage />
      </NoteProvider>
    </div>
  )
}

export default page