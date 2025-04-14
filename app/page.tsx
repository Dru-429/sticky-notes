"use client"

import React from 'react'
import Notespage from './components/notes/Notespage'
import NoteProvider from '@/context/NoteContext'
import { Boxes } from '@/components/ui/background-boxes'

const page = () => {
  return (
    <div className='w-screen h-screen'>
      <LandingPage />
    </div>
  )
}

export default page