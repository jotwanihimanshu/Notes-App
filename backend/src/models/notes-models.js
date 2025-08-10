 import mongoose from "mongoose";

let noteschema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content:{
    type: String,
    required:true,
  }
},
{timestamps:true}
);

const Notes = mongoose.model("Note", noteschema);

export default Notes;