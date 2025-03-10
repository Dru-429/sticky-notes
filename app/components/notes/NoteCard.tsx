import React, { useEffect, useRef } from 'react';
import Trash from '../icons/Trash';

interface Note {
    $id: number;
    body: string;
    colors: string; // Assuming colors is also a JSON string
    position: string; // Assuming position is also a JSON string
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

        let position = JSON.parse(note.position);
        const colors = JSON.parse(note.colors);
        const body = JSON.parse(note.body);

        return (
            <div
                className="card absolute"
                style={{
                    backgroundColor: colors.colorBody,
                    left: `${position.x}px`,
                    top: `${position.y}px`,
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