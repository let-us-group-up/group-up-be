import {
  Schema, model, Document, Model,
} from '../../database/model';
import builder from '../../graphql/builder';


export interface User {
  id: string;
  email: string;
}

type UserBaseDocument = Document<User>;

export type UserDocument = UserBaseDocument;

export type UserModel = Model<UserDocument>;


const UserGraphQLRef = builder.objectRef<User>('User');

export const UserGraphQL = builder.objectType(UserGraphQLRef, {
  description: 'User',
  fields: (t) => ({
    id: t.id({
      resolve: (parent) => parent.id,
    }),
    email: t.string({
      resolve: (parent) => parent.email,
    }),
  }),
});

const UserSchema = new Schema<UserDocument, UserModel>({
  email: { type: String, required: true, unique: true },
});

export const userModelName = 'users';
const UserModel = model<UserDocument, UserModel>(userModelName, UserSchema);


export default UserModel;
