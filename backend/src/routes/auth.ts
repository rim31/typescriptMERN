import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken"
import { signin, signup, profile, updatePassword } from '../controllers/auth.controller';
import { addSong, getSongs, getOneKindaSong, deleteOneSong, updateSong } from '../controllers/song.controller';

import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger.json";// https://stackoverflow.com/questions/49996456/importing-json-file-in-typescript


// === USER === POST SIGNUP/SIGNIN/PROFILE : go to /controller/auth.controller.ts
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', TokenValidation, profile);// TokenValidation is the middleware that check the JWT
router.patch('/:id', updatePassword);// TokenValidation is the middleware that check the JWT


// === SONG === POST addSong, getSongs, getOneKindaSong in /controllers/song.controller';
router.post('/addsong', TokenValidation, addSong);
router.get('/getsongs', TokenValidation, getSongs);
router.post('/getonekindasong', TokenValidation, getOneKindaSong);
router.delete('/song/:id', TokenValidation, deleteOneSong);
router.patch('/song/:id', TokenValidation, updateSong);// TokenValidation is the middleware that check the JWT


export default router;