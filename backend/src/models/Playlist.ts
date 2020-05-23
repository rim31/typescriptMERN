import { Schema, model, Document } from 'mongoose';
import Song, { ISong } from './Song';

// schema : mongoose.Schema({example: String})
// example :
// {
// 	"title":"Test playlist 2",
// 	"description": "1rst description",
// 	"songs":[
// 	  { "id": 1, "url": "https://www.youtube.com/watch?v=YQHsXMglC9A", "solution": "hello" },
// 	  { "id": 2, "url": "https://www.youtube.com/watch?v=fNFzfwLM72c", "solution": "stayin alive" },
// 	  { "id": 3, "url": "https://www.youtube.com/watch?v=25rL-ooWICU", "solution": "i swear" },
// 	  { "id": 4, "url": "https://www.youtube.com/watch?v=4m1EFMoRFvY", "solution": "single ladies" },
// 	  { "id": 5, "url": "https://www.youtube.com/watch?v=oRdxUFDoQe0", "solution": "beat it" },
// 	  { "id": 6, "url": "https://www.youtube.com/watch?v=H9tEvfIsDyo", "solution": "kiss" },
// 	  { "id": 7, "url": "https://www.youtube.com/watch?v=79fzeNUqQbQ", "solution": "like a prayer" },
// 	  { "id": 8, "url": "https://www.youtube.com/watch?v=8UVNT4wvIGY", "solution": "somebody that i used to know" },
// 	  { "id": 9, "url": "https://www.youtube.com/watch?v=JGwWNGJdvx8", "solution": "shape of you" }
// 	],
// 	"valid":"true"
// }

// Interface User Model for typeScript

export interface IPlaylist extends Document {
  title: string,
  songs: Array<ISong>,
  kind: string,
  valid: boolean,
  author: string,
  ranking: number,
  checkUrl(url: string): Promise<Boolean>,
}

// SCHEMA of User data base
const PlaylistSchema = new Schema({
  title: {
    type: String,
    required: true,
    min: 2,
    max: 255,
    lowercase: true,
    unique: true
  },
  songs: {
    type: Array,
    required: true,
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
    default: false
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
  }
})

export default model<IPlaylist>('Playlist', PlaylistSchema)