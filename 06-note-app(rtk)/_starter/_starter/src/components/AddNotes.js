import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addNote } from "../redux/noteSlice";
import "./Form.css";

const AddNotes = () => {
	const dispatch = useDispatch();
	const [note, setNote] = useState({
		title: "",
		content: "",
	});

	const handleChange = (e) => {
		setNote({
			...note,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		//prevent empty notes
		e.preventDefault();
		if (note.title === "" || note.content === "") {
			return alert("Please fill in the form");
		}
		note.id = nanoid();
		dispatch(addNote(note));
		setNote({
			title: "",
			content: "",
		});
	};

	return (
		<div className="formContainer">
			<div>
				<h3>Notes Taking App Built with React Redux</h3>
				<p>
					This is a simple notes taking app built with React Redux.
					You can add
				</p>
			</div>
			<form onSubmit={handleSubmit}>
				<input
					value={note.title}
					onChange={handleChange}
					name="title"
					type="text"
					placeholder="Add Title"
				/>
				<input
					className="btn-add"
					value={note.content}
					onChange={handleChange}
					name="content"
					type="text"
					placeholder="Add Content"
				/>
				<button className="add-btn" type="submit">
					Add
				</button>
			</form>
		</div>
	);
};

export default AddNotes;
