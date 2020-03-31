import * as mongoose from 'mongoose';

export const NoteSchema = new mongoose.Schema({
  name: String,
  description: String,
  authorID: String,
});
