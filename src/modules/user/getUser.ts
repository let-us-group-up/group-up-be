import UserModel, { UserGraphQL, User } from './model';
import builder from '../../builder';

const getUser = async (id: string): Promise<User | null> => {
  const user = await UserModel.findById(id).lean<User>();
  return user;
};

builder.queryField('user', (t) => t.field({
  type: UserGraphQL,
  args: {
    id: t.arg.id({
      required: true,
    }),
  },
  nullable: true,
  resolve: async (root, { id }) => {
    const user = await getUser(String(id));
    return user;
  },
}));

export default getUser;
