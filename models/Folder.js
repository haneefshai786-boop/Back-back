import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export default mongoose.model("Folder", folderSchema);
