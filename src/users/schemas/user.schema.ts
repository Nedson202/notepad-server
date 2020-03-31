import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  socialID: String,
  name: String,
  picture: String,
  email: String,
});
