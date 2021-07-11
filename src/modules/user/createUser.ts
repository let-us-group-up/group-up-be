import UserModel, { UserGraphQL, User } from './model';
import builder from '../../graphql/builder';

const createUser = async (email: string): Promise<User> => {
  const user = await UserModel.create({ email });
  return user.toObject<User>();
};

builder.mutationField('createUser', (t) => t.field({
  type: UserGraphQL,
  args: {
    email: t.arg.string({
      required: true,
    }),
  },
  resolve: async (root, { email }) => {
    const user = await createUser(email);
    return user;
  },
}));
