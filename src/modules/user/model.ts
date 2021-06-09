import {
  Schema, model, Document, Model, Types,
} from 'mongoose';
import builder from '../../builder';


export interface User {
  id: string;
  email: string;
}

interface UserBaseDocument extends Omit<User, 'id'>, Document<Types.ObjectId> {}

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

const UserIDUnionPartGraphQL = builder.objectType(
  builder.objectRef<{ userKind: 'UserID'; user: User['id'] }>('UserIDUnionPart'), {
    fields: (t) => ({
      user: t.field({
        type: 'String',
        resolve: (parent) => parent.user,
      }),
    }),
  },
);

const UserUnionPartGraphQL = builder.objectType(
  builder.objectRef<{ userKind: 'User'; user: User }>('UserUnionPart'), {
    fields: (t) => ({
      user: t.field({
        type: UserGraphQL,
        resolve: (parent) => parent.user,
      }),
    }),
  },
);

export const UserAndIDUnionGraphQL = builder.unionType('UserAndIDUnion', {
  types: [UserIDUnionPartGraphQL, UserUnionPartGraphQL],
  resolveType: (user) => {
    switch (user.userKind) {
      case 'UserID':
        return UserIDUnionPartGraphQL;
      case 'User':
        return UserUnionPartGraphQL;
      default:
        return UserIDUnionPartGraphQL;
    }
  },
});


const UserSchema = new Schema<UserDocument, UserModel>({
  email: { type: String, required: true, unique: true },
});

export const userModelName = 'users';
const UserModel = model<UserDocument, UserModel>(userModelName, UserSchema);


export default UserModel;
