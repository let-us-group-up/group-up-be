import UserModel, { User } from './models/user';

const resolvers = {
  Mutation: {
    createUser: async (root: void, { email }: { email: string }): Promise<User> => {
      const user = new UserModel({ email });
      await user.save();
      return user;
    },
  },
  Query: {
    getUser: async (root: void, { id }: { id: string }): Promise<User> => {
      const user = await UserModel.findById(id);
      return user;
    },
  },
};

export default resolvers;
