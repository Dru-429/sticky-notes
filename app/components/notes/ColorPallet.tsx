"use client"

import { db } from '@/appwrite/databases'
import { NoteContext } from '@/context/NoteContext'
import React, { useContext } from 'react'

const ColorPallet = ({ color }) => {
    const { selectedNote, notes, setNotes } = useContext(NoteContext)

    const changeColor = () => {
        // console.log("Selected Note:", selectedNote);
        // console.log("CHange color clicked:", color);
        try {
            const currentNoteIndex = notes.findIndex(
                (note) => note.$id === selectedNote?.$id
            );

            if (currentNoteIndex === -1) {
                alert("You must select a note before changing colors");
                return;
            }

            const updatedNote = {
                ...notes[currentNoteIndex],
                colors: JSON.stringify(color),
            };

            const newNotes = [...notes];
            newNotes[currentNoteIndex] = updatedNote;
            setNotes(newNotes);

            // console.log("Updated Notes:", newNotes);

            // Optional: update in database if needed
            db.notes.update(selectedNote.$id, {
                colors: JSON.stringify(color),
            });

        } catch (error) {
            console.log(error);
            alert("An error occurred while changing the color.");
        }
    };

    return (
        <div
            className="color"
            onClick={changeColor}
            style={{ backgroundColor: color.colorHeader, cursor: 'pointer' }}
        ></div>
    );
}

export default ColorPallet