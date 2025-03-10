import React, { useEffect, useRef, useState } from 'react';
import Trash from '../icons/Trash';

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

    const autoGrow = (textAreaRef: React.RefObject<HTMLTextAreaElement>) => {
        const { current } = textAreaRef;
        if (current) {
            current.style.height = 'auto'; // Reset the height
            current.style.height = current.scrollHeight + 'px'; // Set the new height
        }
    };

    try {
        const [position, setPosition] = useState(JSON.parse(note.position))
        const colors = JSON.parse(note.colors);
        const body = JSON.parse(note.body);
        const cardRef = useRef(null);
        
        let mouseStartPos = { x: 0, y: 0 };

        const mouseDown = (e: MouseEvent) => {
            mouseStartPos.x = e.clientX;
            mouseStartPos.y = e.clientY;
         
            document.addEventListener("mousemove", mouseMove);
            document.addEventListener("mouseup",mouseUp)
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
         
            //3 - Update card top and left position.
            setPosition({
                x: cardRef.current.offsetLeft - mouseMoveDir.x,
                y: cardRef.current.offsetTop - mouseMoveDir.y,
            });

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