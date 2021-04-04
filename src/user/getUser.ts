import UserModel, { UserDocument } from './model';

export const getUserTypeDefs = `
  type Query {
    getUser(id: String): User
  }
`;

const getUser = async (root: void, { id }: { id: string }): Promise<UserDocument | null> => {
  const user = await UserModel.findById(id);
  return user;
};

export const getUserResolvers = {
  Query: {
    getUser,
  },
};
