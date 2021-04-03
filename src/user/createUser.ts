import UserModel, { User } from './model';

export const createUserTypeDefs = `
  type Mutation {
    createUser(email: String): User
  }
`;

const createUser = async (root: void, { email }: { email: string }): Promise<User> => {
  const user = new UserModel({ email });
  await user.save();
  return user;
};

export const createUserResolvers = {
  Mutation: {
    createUser,
  },
};
