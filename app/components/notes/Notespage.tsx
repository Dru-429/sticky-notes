"use client"

import React, { useEffect, useState } from 'react'
import NoteCard from './NoteCard'
import { databases } from '@/appwrite/config'
import { db } from '@/appwrite/databases'
// import { fakeData as notes } from '@/app/assets/fakeData'

const Notespage = () => {

    const [notes, setNotes] = useState([])

    const init = async () => {

        const response = await db.notes.list()

        console.log(response)
        setNotes(response.documents)
    }

    useEffect( () => {
        init()
    }, [])

    return (
        <div>
            {notes.map((note) => (
                <NoteCard note={note} key={note.$id} setNotes={setNotes} />
            ))}
        </div>
    )
}

export default Notespage