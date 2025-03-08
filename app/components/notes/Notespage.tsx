import React from 'react'
import NoteCard from './NoteCard'
import { fakeData as notes } from '@/app/assets/fakeData'

const Notespage = () => {
    return (
        <div>
            {notes.map((note) => (
                <NoteCard note={note} key={note.$id} />
            ))}
        </div>
    )
}

export default Notespage