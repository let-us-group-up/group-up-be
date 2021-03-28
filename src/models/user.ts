import { Schema, model } from 'mongoose';


export interface User {
  _id: string;
  email: string;
}

const userSchema = new Schema({
  email: String,
});

const User = model('users', userSchema);


export default User;
