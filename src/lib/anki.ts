
const ankiRequest = (action: string, params: object) => ({
    action,
    params,
    version: 6,
});


export const addCard = async (
    deckName: string,
    modelName: string,
    fields: Record<string,string>
) => {
    const body = ankiRequest('addNote', {
        note: {
            deckName,
            modelName,
            fields,
            options: {
                allowDuplicate: false
            },
            tags: ['jlpt-dojo'],
        },
    });

    try {
        const response = await fetch('http://localhost:8765', {
            method: 'POST',
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if(data.error) {
            if(data.error.includes('deck not found')) {
                return { success: false, message: `anki deck ${deckName} not found`};
            }
            if(data.error.includes('model was not found')) {
                return { success: false, message: `Anki note type ${modelName} not found`};
            }
            if(data.error.includes('duplicate')) {
                return { success : false, message: 'Card is already in your deck'};
            }
            return { success: false, message: data.error};
        }

        if(data.result) {
            return { success: true, message: 'Card added to Anki'};
        }

        return {success: false, message: 'Unknown response from AnkiCOnnect'};
    } catch (err) {
        return {
            success: false,
            message: 'Could not connect to Anki,. Make sure to install AnkiConnect'
        };
    } 
};