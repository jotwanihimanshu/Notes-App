import express, { Router } from 'express';
import { createNote, deleteNote, getNotes, getNotesById, updateNote } from '../controller/notes-controller.js';

let notesRoutes = express.Router();

notesRoutes.get('/', getNotes);
notesRoutes.get('/:id', getNotesById);
notesRoutes.post('/', createNote);
notesRoutes.put('/:id', updateNote);
notesRoutes.delete('/:id', deleteNote);

export default notesRoutes; 