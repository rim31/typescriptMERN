require('dotenv/config');
import mongoose from "mongoose";

mongoose.connect(process.env.DB_CONNECTION as string,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log('connecting to DB'))
  .then(db => console.log("DB ok"))
  .catch(err => console.log(err));
