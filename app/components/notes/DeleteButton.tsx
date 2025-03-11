import { db } from "@/appwrite/databases";
import Trash from "../icons/Trash";
import { useContext } from "react";
import { NoteContext } from "@/context/NoteContext";
 
const DeleteButton = ( { noteId } ) => {
 
    const { setNotes } = useContext(NoteContext)

    const handleDelete = async (e) => {
        setNotes((prevState) =>
            prevState.filter((note) => note.$id !== noteId)
        );

        // db.notes.delete(noteId)
    };
 
    return (
        <div onClick={handleDelete}>
            <Trash />
        </div>
    );
};

export default DeleteButton