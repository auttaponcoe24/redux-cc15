import {
	ADD_NOTE,
	EDIT_NOTE,
	DELETE_NOTE,
	FETCH_NOTE,
} from "../actions/actionType";

//  note : {id: string, title: stringify, content: string}

const initialState = {
	notes: [],
};

// Reducer == Fn 2 parameter
const noteReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_NOTE:
			const notes = localStorage.getItem("notes")
				? JSON.parse(localStorage.getItem("notes"))
				: [];
			return { ...state, notes: notes };
		case ADD_NOTE:
			const newNotes = [...state.notes, action.payload];
			localStorage.setItem("notes", JSON.stringify(newNotes));
			return { ...state, notes: newNotes };
		case DELETE_NOTE:
			const filteredNoted = state.notes.filter(
				(note) => note.id !== action.payload
			);
			localStorage.setItem("notes", JSON.stringify(filteredNoted));
			return {
				...state,
				notes: filteredNoted,
			};
		default:
			return state;
	}
};

export default noteReducer;
