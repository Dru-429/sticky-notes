import React from 'react';

interface Note {
    $id: number;
    body: string;
    colors: string; // Assuming colors is also a JSON string
    position: string; // Assuming position is also a JSON string
}

const NoteCard: React.FC<{ note: Note }> = ({ note }) => {
    try {

        let position = JSON.parse(note.position);
        const colors = JSON.parse(note.colors);
        const body = JSON.parse(note.body);

        return (
            <div
                className="card"
                style={{
                    backgroundColor: colors.colorBody,
                }}
            >
                <div
                    className="card-header"
                    style={{ backgroundColor: colors.colorHeader }}
                ></div>
                <div className="card-body">
                    <textarea
                        style={{ color: colors.colorText }}
                        defaultValue={body}
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