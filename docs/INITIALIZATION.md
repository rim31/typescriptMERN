

## START ###

* Mac OSX
* nodejs, npm
* postman (for testing routes)


```
npm init -y
npm i typescript
npx tsc --init
npx tsc
```


change tsconfig.json : COMPLETE IT like this
```
{
  "compilerOptions": {
   "target": "es6", /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */
    "module": "commonjs", /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */

    "sourceMap": true, /* Generates corresponding '.map' file. */

   "outDir": "./dist", /* Redirect output structure to the directory. */

   "strict": true, /* Enable all strict type-checking options. */
 
  "moduleResolution": "node", /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
    "baseUrl": "./src", /* Base directory to resolve non-absolute module names. */
 
   "esModuleInterop": true, /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
 
   "skipLibCheck": true, /* Skip type checking of declaration files. */
    "forceConsistentCasingInFileNames": true /* Disallow inconsistently-cased references to the same file. */
  },
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules"
  ],
  "files": [
    "./src/types.d.ts"
  ]
}
```



## package.json

install : 
```
npm i concurrently -D
npm i nodemon  -D
```

modify package.json
```
{
  "name": "nodetypescriptapijwt",
  "version": "1.0.0",
  "description": "https://www.youtube.com/watch?v=qVUr4YC6ZXA",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "concurrently \"tsc -w\" \"nodemon dist/index.js\""//============HERE==========
  },
  "repository": {
    "type": "git",
    "url": "git+https://rim31@bitbucket.org/rim31/nodetypescriptapijwt.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "homepage": "https://bitbucket.org/rim31/nodetypescriptapijwt#readme",
  "dependencies": {
    "express": "^4.17.1",
    "typescript": "^3.9.2"
  },
  "devDependencies": {
    "concurrently": "^5.2.0"
  }
}

```


installation packages :
```
npm i express
npm i @types/express -D
```


app.ts 
```
import express, { Application } from "express";

const app: Application = express();

// settings
app.set('port', 3001);
export default app;

import authRoutes from "./roots/auth";

// routes
app.use(authRoutes);

export default app;
```

index.ts
```
import app from "./app";

//function: Running , listening port 3000
function main() {
  app.listen(app.get('port'), () => { console.log("listening port", app.get('port')) })
}


main();
```

## routing 



create folder :
/routes/auth.ts
```
import { Router } from "express";

const router: Router = Router();

// GET
router.get('/', (req, res) => {
  res.send("Hello");
})


export default router;
```

```
npm i morgan
npm i @types/morgan -D

```
### middlewares

for mo info when GET (middlewares)

some action/fonction to do when you call a route

## Database

```
npm i mongoose
npm i @types/mongoose -D

```


database.ts
```
require('dotenv/config');
import mongoose from "mongoose";

mongoose.connect(process.env.DB_CONNECTION as string,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log('connecting to DB'))
  .then(db => console.log("DB ok"))
  .catch(err => console.log(err));

```


## Controllers

all functions to know if we can access to a route : 
signup/signin/profil

/controllers/auth.controller.ts
```
import { Request, Response } from "express";

// register
export const signup = (req: Request, res: Response) => {
  res.send('signup');
};

//login
export const signin = (req: Request, res: Response) => {
  res.send('signin');
};

// user profile
export const profile = (req: Request, res: Response) => {
  res.send('profile');
};
```

auth.ts
```
import { Router } from "express";

const router: Router = Router();

import { signin, signup, profile } from '../controllers/auth.controller';
// POST SIGNUP/SIGNIN/PROFILE
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', profile);

export default router;
```


### 1.1. try routes postman
// Routes
app.use('/api/auth', authRoutes);

Postman :
GET localhost/3001/api/auth/profile

## Models

use an interface ofr user

models/User.ts
```
import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  username: String,
  email: String,
  password: String
}

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 4,
    max: 50,
    lowercase: true,
    unique: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  activated: {
    type: Boolean,
    required: true,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
})

export default model<IUser>('User', UserSchema)
```

DB : autoIncremanteIndex <!>


auth.ts routing
```
import { Request, Response } from "express";
import User, { IUser } from "../models/User";

// register
// HEADERS : Content-Type : application/json
export const signup = async (req: Request, res: Response) => {
  const user: IUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  console.log(user);
  // promise / async await to save data
  const savedUser = await user.save();
  console.log(savedUser);
  res.send('signup');
};

//login
export const signin = (req: Request, res: Response) => {
  res.send('signin');
};

// user profile
export const profile = (req: Request, res: Response) => {
  res.send('profile');
};
```

## Token

```
pm i jsonwebtoken
pm i @types/jsonwebtoken -D
```


### HASH  PASSWORD

1.1. Clean database for testing

find() : show all
drop() : delete table


1.2. bcrypt

```
npm i bcryptjs
npm i @types/bcryptjs -D
```


1.3. add this to User.ts SIGNUP
```
export interface IUser extends Document {
  username: string,
  email: string,
  password: string,
  encryptPassword(password: string): Promise<string>,
  validatePassword(password: string): Promise<boolean>,
}
...
// Crypting password
UserSchema.methods.encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// function not arrow to use this
UserSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
  await bcrypt.compare(password, this.password);
};
```


auth.controller.ts
```
// register
// HEADERS : Content-Type : application/json
export const signup = async (req: Request, res: Response) => {
  // saving a new user
  const user: IUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  user.password = await user.encryptPassword(user.password)
  console.log(user);
  // promise / async await to save data
  const savedUser = await user.save();
  console.log(savedUser);

  // TOKEN
  console.log(process.env.SESSION_SECRET)
  console.log(process.env.SESSION_SECRET)
  const token: string = jwt.sign({ _id: savedUser._id }, process.env.ACCESS_TOKEN_SECRET || 'testToken')

  // res.send(token);
  res.header('auth_token', token).json(savedUser);
};
```

test Postman
// HEADERS : Content-Type : application/json

![](./docs/POSTsignup.png)


2.1 SIGNIN

auth.controllers.ts
```
// ============ login ============ // HEADERS : Content-Type : application/json
export const signin = async (req: Request, res: Response) => {
  // checking the user input
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json('wrong email or password')
  // checking password
  const correctPassword: boolean = await user.validatePassword(req.body.password);
  if (!correctPassword) return res.status(400).json('invalid password');
  // checking jwt
  const token: string = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET || 'testToken', {
    expiresIn: 60 * 60 * 24
  })
  res.header('auth_token', token).json(user);
};

```
![](./docs/POSTsignin.png)


3.1. user profil GET

/libs/verifyToken.ts
```
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("auth_token");
  if (!token) return res.status(401).json("Access Denied");

  const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || 'testToken') as IPayload;
  // console.log(payload);
  req.userId = payload._id;

  next();
}
```


routes/auth.ts
```
import { Router } from "express";

const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken"

import { signin, signup, profile } from '../controllers/auth.controller';
// POST SIGNUP/SIGNIN/PROFILE : go to /controller/auth.controller.ts
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', TokenValidation, profile);// TokenValidation is the middleware that check the JWT


export default router;
```

![](./docs/GETjwt.png)


correction typescript extend interface because ERROR
```
// use for extends interface // import it in ts.config.json : "files": ["types.d.ts"]
declare namespace Express {
  export interface Request {
    userId: string;
  }
}

```

implement it in tsconfig.json
  "files": [
    "./src/types.d.ts"
  ]

so u can get playlod._id