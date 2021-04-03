import { getUserResolvers } from './getUser';
import { createUserResolvers } from './createUser';

const resolvers = [
  getUserResolvers,
  createUserResolvers,
];

export default resolvers;
