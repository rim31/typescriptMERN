import { Schema, model, Document } from 'mongoose';

// Interface User Model for typeScript
export interface ISong extends Document {
  title: string,
  url: string,
  kind: string,
  valid: boolean,
  author: string,
  ranking: number,
  alert: number,
  check: boolean,
  checkUrl(url: string): Promise<Boolean>,
}

// SCHEMA of User data base
const SongSchema = new Schema({
  title: {
    type: String,
    required: true,
    min: 2,
    max: 255,
    lowercase: true,
    unique: true
  },
  url: {
    type: String,
    min: 2,
    max: 255,
    unique: true,
    required: true,
    lowercase: true
  },
  kind: {
    type: String,
    required: false
  },
  author: {
    type: String,
    required: false
  },
  valid: {
    type: Boolean,
    required: true,
    default: true
  },
  ranking: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  alert: {
    type: Number,
    min: 0,
    default: 0
  },
  check: {
    type: Boolean,
    required: true,
    default: false
  },
})

// function check url
SongSchema.methods.checkUrl = function (url: string): Boolean {
  var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return pattern.test(url);
};

export default model<ISong>('Song', SongSchema)