import { mergeTypeDefs } from 'graphql-tools';
import { userModelTypeDefs } from './model';
import { getUserTypeDefs } from './getUser';
import { createUserTypeDefs } from './createUser';

export const typeDefs = mergeTypeDefs([
  userModelTypeDefs,
  getUserTypeDefs,
  createUserTypeDefs,
]);

export default typeDefs;
