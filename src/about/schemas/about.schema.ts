import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const AboutSchema = new mongoose.Schema({
  text: String,
});
