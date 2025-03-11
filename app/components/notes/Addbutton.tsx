import { useRef } from "react";
import Plus from "../icons/Plus";
import colors from "../../assets/colors.json"
import { db } from "@/appwrite/databases";

const AddButton = () => {

    const addNote = async () => {

        const startingPos = useRef(10)

        const payload = {
            position: JSON.stringify({
                x: startingPos.current,
                y: startingPos.current,   
            }),
            colors: JSON.stringify( colors[0] )
        }

        startingPos.current += 15

        const response = await db.notes.create(payload)
    }

    return (
        <div 
            id="add-btn" 
            onClick={addNote}
        >
            <Plus />
        </div>
    );
};

export default AddButton