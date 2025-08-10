 import Notes from "../models/notes-models.js";

export const getNotes = async (req, res) => {
  try {
    const notes = await Notes.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getNotesById = async (req, res) => {
  const { id } = req.params;
    try {
    const note = await Notes.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });   
    }
    res.status(200).json(note);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
}

export const createNote = async (req, res) => {
  const {title, content} = req.body;
  const note = new Notes({
    title,
    content
  });
  try {
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updatedNote = await Notes.findByIdAndUpdate(id, { title, content }, { new: true });
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedNote = await Notes.findByIdAndDelete(id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}