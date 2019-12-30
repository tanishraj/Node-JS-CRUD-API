const Note = require('../models/note.model');

// create and save a new note
exports.create = (req, res) => {
	// validate request
	if(!req.body.content){
		return res.status(400).send({
			message: 'Note content can not be empty'
		})
	}

	// create a note
	const note = new Note({
		title:req.body.title || 'Untitled Note',
		content:req.body.content
	})

	// save a note
	note.save()
	.then((data) => {
		res.send(data);
	})
	.catch(error => {
		res.status(500).send({
			message: error.message || 'Some error occured while creating a note.'
		})
	})
}

// returieve and return all notes from database
exports.findAll = (req, res) => {
	Note.find()
	.then(notes => {
		res.send(notes);
	})
	.catch(error => {
		res.status(500).send({
			message: error.message || 'Some error occured while retrieving notes'
		})
	})
}

// find a single note with a note id
exports.findOne = (req, res) => {
	Note.findById(req.params.noteId)
	.then(note => {
		if(!note){
			return res.status(404).send({
				message: "Note not found with id " + req.params.noteId
			})
		}
		res.send(note);
	})
	.catch(error => {
		if(error.kind = 'ObjectId'){
			return res.status(404).send({
				message: "Note not found with id " + req.params.noteId
			})
		}

		return res.status(500).send({
			message: error.message || 'Some error occured while retrieving the note with id'
		})
	})
}

// update a single note with a note id
exports.update = (req, res) => {
	// validate request input
	if(!req.body.content){
		return res.status(400).send({
			message: 'Note content can not be empty.'
		})
	}

	// find note and update it with the request body
	Note.findByIdAndUpdate(req.params.noteId, {
		title: req.body.title || 'Untitled Note',
		content: req.body.content
	}, {new: true})
	.then(note => {
		if(!note){
			return res.status(404).send({
				message: "Note not found with id " + req.params.noteId
			})
		}
		res.send(note);
	})
	.catch(error => {
		res.status(500).send({
			message: error.message || 'Error updating note with id ' + req.params.noteId
		})
	})
}

// delete a single note with a note id
exports.delete = (req, res) => {
	Note.findByIdAndRemove(req.params.noteId)
	.then(note => {
		if(!note){
			return res.status(404).send({
				message: 'Note not found with id ' + req.params.noteId
			})
		}
		res.send({
			message: 'Note deleted successfully.'
		})
	})
	.catch(error => {
		if(error.kind === 'ObjectId' || error.name === 'NotFound'){
			return res.status(404).send({
				message: 'Note not found with id ' + req.params.noteId
			})
		}
		return res.status(500).send({
			message: 'Could not delete note with id ' + req.params.noteId
		})
	})
}
