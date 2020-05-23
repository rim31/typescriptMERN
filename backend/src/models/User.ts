import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// Interface User Model for typeScript
export interface IUser extends Document {
  username: string,
  email: string,
  password: string,
  encryptPassword(password: string): Promise<string>,
  validatePassword(password: string): Promise<boolean>,
}

// SCHEMA of User data base
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

// Crypting password
UserSchema.methods.encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// function not arrow to use this
UserSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<IUser>('User', UserSchema)