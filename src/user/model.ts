import {
  Schema, model, Document, Model, Types,
} from 'mongoose';


export interface User {
  email: string;
}

interface UserBaseDocument extends User, Document<Types.ObjectId> {}

export type UserDocument = UserBaseDocument;

export type UserModel = Model<UserDocument>;


export const userModelTypeDefs = `
  type User {
    _id: String!
    email: String!
  }
`;

export const userModelResolvers = {
  User: {
    email: (user: UserDocument): string => user.email,
  },
};


const userSchema = new Schema<UserDocument, UserModel>({
  email: { type: String, required: true, unique: true },
});

export const userModelName = 'users';
const UserModel = model<UserDocument, UserModel>(userModelName, userSchema);


export default UserModel;
