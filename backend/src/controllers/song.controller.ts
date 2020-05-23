import { Request, Response } from "express";
import Song, { ISong } from "../models/Song";

// =========== Post Add song ========== // HEADERS : Content-Type : application/json
export const addSong = async (req: Request, res: Response) => {
  // saving a new song
  const song: ISong = new Song({
    title: req.body.title,
    url: req.body.url,
    kind: req.body.kind,
    author: req.body.author,
    ranking: req.body.ranking,
    alert: req.body.alert,
    check: req.body.check
  })
  const urlOK: Promise<Boolean> = song.checkUrl(req.body.url);
  // promise / async await to save data
  if (urlOK) {
    try {
      const saveSong = await song.save();
      res.status(200).json(saveSong);
    } catch (error) {
      res.status(400).json("error data given");
      console.log(error);
    }
  }
  res.status(404).json("error data given, or already exist :-)");
};

// ============ GET all song ============ // HEADERS : Content-Type : application/json
export const getSongs = async (req: Request, res: Response) => {
  // checking the user input
  // const user = await Song.find({ kind: req.body.email });
  const songs = await Song.find();
  res.status(200).json(songs);
};

// =========== POST to GET one kind of song =========== //
export const getOneKindaSong = async (req: Request, res: Response) => {
  // console.log(req.header('auth_token')); // use a function in libs/verifyToken.ts
  // console.log(req.body.kind);// { kind: req.body.kind }
  const songs = await Song.find({ kind: req.body.kind });
  if (!songs) return res.status(404).json("no user found");
  res.status(200).json(songs);
};


// DELETE a song
export const deleteOneSong = async (req: Request, res: Response) => {
  // console.log(req.params.id);// TEST <!> console.log always return undefined
  try {
    const remove = await Song.deleteOne({ _id: req.params.id });
    res.json(remove);
  } catch (err) {
    res.json({ message: err })
  }
};


// PUT/PATCH SPECIFIC POST
export const updateSong = async (req: Request, res: Response) => {
  try {
    const updatePost = await Song.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          url: req.body.url,
          kind: req.body.kind,
          author: req.body.author,
          ranking: req.body.ranking,
          alert: req.body.alert,
          check: req.body.check
        }
      }
    );
    res.json(updatePost);
  } catch (err) {
    res.json({ message: err })
  }
};