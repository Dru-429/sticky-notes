"use client"

import React, { useContext, useEffect, useState } from 'react'
import NoteCard from './NoteCard'
import { NoteContext } from '@/context/NoteContext'


const Notespage = () => {

    const { notes } = useContext(NoteContext)
    
    return (
        <div>
            {notes.map((note) => (
                <NoteCard note={note} key={note.$id} />
            ))}
        </div>
    )
}

export default Notespage