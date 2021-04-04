import { IResolvers } from 'graphql-tools';
import { getUserResolvers } from './getUser';
import { createUserResolvers } from './createUser';
import { userModelResolvers } from './model';

const resolvers: Array<IResolvers> = [
  userModelResolvers,
  getUserResolvers,
  createUserResolvers,
];

export default resolvers;
