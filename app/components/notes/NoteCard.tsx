import React, { useEffect, useRef, useState } from 'react';
import Trash from '../icons/Trash';
import { autoGrow, bodyParser, setNewOffset, setZIndex } from '../utils/utils';
import { db } from '@/appwrite/databases';

interface Note {
    $id: number;
    body: string;
    colors: string; // Assuming colors is also a JSON string
    position: string; // Assuming position is also a JSON string
}

interface Position {
    x: number;
    y: number;
  }
  
const NoteCard: React.FC<{ note: Note }> = ({ note }) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textAreaRef.current) {
            autoGrow(textAreaRef);
        }
    },);

    try {
        const [position, setPosition] = useState(JSON.parse(note.position))
        const colors = bodyParser(note.colors);
        const body = bodyParser(note.body);
        const cardRef = useRef(null);
        const [saving, setSaving] = useState(false)
        const keyUpTimer = useRef(null)

        let mouseStartPos = { x: 0, y: 0 };

        const saveData = async (key, value) => {
            const payload = { [key]: JSON.stringify(value) };
            try {
                await db.notes.update(note.$id, payload);
            } catch (error) {
                console.error(error);
            }
        };


        const mouseDown = (e: MouseEvent) => {
            mouseStartPos.x = e.clientX;
            mouseStartPos.y = e.clientY;
         
            document.addEventListener("mousemove", mouseMove);
            document.addEventListener("mouseup",mouseUp)

            setZIndex(cardRef.current)
        };

        const mouseMove = (e: MouseEvent) => {
            //1 - Calculate move direction
            let mouseMoveDir = {
                x: mouseStartPos.x - e.clientX,
                y: mouseStartPos.y - e.clientY,
            };
         
            //2 - Update start position for next move.
            mouseStartPos.x = e.clientX;
            mouseStartPos.y = e.clientY;
         
            const newPosition = setNewOffset(cardRef.current, mouseMoveDir)

            //3 - Update card top and left position.
            setPosition(newPosition);
            setTimeout( () => {
                saveData("position", newPosition)
            }, 1000)
        };

        const mouseUp = () => {
            document.removeEventListener("mousemove", mouseMove);
            document.removeEventListener("mouseup", mouseUp);
        };

        return (
            <div
                ref={cardRef}
                className="card absolute"
                style={{
                    backgroundColor: colors.colorBody,
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                }}
                onMouseDown={mouseDown}
                onFocus={ () => {
                    setZIndex(cardRef.current)
                }}
            >
                <div
                    className="card-header"
                    style={{ backgroundColor: colors.colorHeader }}
                >
                    <Trash />
                </div>

                <div className="card-body">
                    <textarea
                        ref={textAreaRef}
                        style={{ color: colors.colorText }}
                        defaultValue={body}
                        onInput={() => {
                            autoGrow(textAreaRef)
                        }}
                    ></textarea>
                </div>

            </div>
        );

    }
    catch (error) {
        console.error('Error parsing note body:', error);
        return <div>Error loading note</div>;
    }
};

export default NoteCard;