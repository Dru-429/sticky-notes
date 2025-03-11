"use client"

import { db } from '@/appwrite/databases'
import { NoteContext } from '@/context/NoteContext'
import React, { useContext } from 'react'

const ColorPallet = ({ color }) => {
    const { selectedNote, notes, setNotes } = useContext(NoteContext)

    const changeColor = () => {
        // console.log("Selected color:", selectedNote);
        console.log("CHange color clicked:", color);
        // try {
        //     const currentNoteIndex = notes.findIndex(
        //         (note) => note.$id === selectedNote.$id
        //     );

        //     const updatedNote = {
        //         ...notes[currentNoteIndex],
        //         colors: JSON.stringify(color),
        //     };

        //     const newNotes = [...notes];
        //     newNotes[currentNoteIndex] = updatedNote;
        //     setNotes(newNotes);

        //     db.notes.update(selectedNote.$id, {
        //         colors: JSON.stringify(color),
        //     });
        // } catch (error) {
        //     alert("You must select a note before changing colors");
        // }
    };

    return (
        <div
            className='color'
            onChange={changeColor()}
            style={{ backgroundColor: color.colorHeader }}
        >
        </div>
    )
}

export default ColorPallet