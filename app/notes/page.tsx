"use client"

import React from 'react'
import NoteProvider from '@/context/NoteContext'
import { Boxes } from '@/components/ui/background-boxes'
import Notespage from '../components/notes/Notespage'

const page = () => {
  return (
    <div className='w-screen h-screen' id='app'>
      <NoteProvider>
        <Boxes />
        <Notespage />
      </NoteProvider>
    </div>
  )
}

export default page