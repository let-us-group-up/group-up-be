import UserModel, { UserDocument, UserGraphQL, User } from './model';
import builder from '../builder';

const createUser = async (email: string): Promise<UserDocument> => {
  const user = new UserModel({ email });
  await user.save();
  return user;
};

builder.mutationField('createUser', (t) => t.field({
  type: UserGraphQL,
  args: {
    email: t.arg.string({
      required: true,
    }),
  },
  resolve: async (root, { email }) => {
    const user = await createUser(email) as User;
    return user;
  },
}));
