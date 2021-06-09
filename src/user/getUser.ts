import UserModel, { UserDocument, UserGraphQL, User } from './model';
import builder from '../builder';

const getUser = async (id: string): Promise<UserDocument | null> => {
  const user = await UserModel.findById(id);
  return user;
};

builder.queryField('user', (t) => t.field({
  type: UserGraphQL,
  args: {
    id: t.arg.id({
      required: true,
    }),
  },
  resolve: async (root, { id }) => {
    const user = await getUser(String(id)) as User;
    return user;
  },
}));
