import { createSlice } from "@reduxjs/toolkit";

// Slice == Action
// NoteSlice = NoteAction + NoteReducer

// RTK
// GOOD : ลด Overhead ในการเขียน Redux
// - Action + Reducer => Slice
// - ไม่ต้องเขียน ActionType เอง => ชื่อ slice/methodReducers
// - ไม่ต้องเขียน ActionCreator เอง => ชื่อ methodReducers => สร้าง ActionCretor ให้
// - ไม่ต้อง integrate DevTool, Thunk (Built-in)
// - ไม่ต้อง CombineReducer สามารถติดตั้ง reducer หลายตัวได้ที่ configure
// - Immer Lib
// -

// Bad
// - ทุกอย่าง Behind The Scene (Redux Abstract ทุกอย่างให้เรา หรือซ้อนโค้ด)

// ชื่อ State
const initialState = {
	notes: [],
};

const noteSlice = createSlice({
	// ชื่อ Slice
	name: "notes", // type: "notes", type : n3/addNote, type : n3/deleteNote
	initialState: initialState,
	reducers: {
		addNote: (state, action) => {
			// Immutable ไม่แก้ไข state เติม
			// const newNotes = [...state.notes, action.payload]; // Immutable
			state.notes.push(action.payload); // syctax mutable => with Immer => ทำ Immutable

			// return { notes: newNotes }; // auto return newState
		},
		deleteNote: (state, action) => {
			// Immutable
			// const newNotes = state.notes.filter(
			// 	(note) => note.id !== action.payload
			// );
			// return { notes: newNotes };

			// Mutable
			const foundedIndex = state.notes.findIndex(
				(note) => note.id === action.payload
			);
			if (foundedIndex !== -1) state.notes.splice(foundedIndex, 1);
		},
	},
});

// AutoGenerate ActionCreator ==> noteSlice.actions
export const { addNote, deleteNote } = noteSlice.actions;
// dispatch(addNote(note))

// AutoGenerate NoteReducer ให้ด้วย => ติดตั้งที่ store
const noteReducer = noteSlice.reducer;
export default noteReducer;
