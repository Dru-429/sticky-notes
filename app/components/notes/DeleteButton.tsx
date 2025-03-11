import { db } from "@/appwrite/databases";
import Trash from "../icons/Trash";

 
const DeleteButton = ( { noteId, setNotes } ) => {
 
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