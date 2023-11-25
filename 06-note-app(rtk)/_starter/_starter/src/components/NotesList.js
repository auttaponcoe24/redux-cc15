import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote } from "../redux/noteSlice";
import "./NotesList.css";

const NotesList = () => {
	const dispatch = useDispatch();

	// const data = useSelector((stores) => stores.note);
	// const data = useSelector((store) => store.note);
	const { notes } = useSelector((store) => store.note);
	console.log(notes);

	const handleDelete = (id) => {
		dispatch(deleteNote(id));
	};

	return (
		<>
			<h1>Notes List</h1>

			<div className="item-container">
				{notes.map((note) => (
					<div className="item-content" key={note.id}>
						<h2>{note.title}</h2>
						<p>{note.content}</p>
						<button onClick={() => handleDelete(note.id)}>
							Delete
						</button>
					</div>
				))}
			</div>
		</>
	);
};

export default NotesList;
