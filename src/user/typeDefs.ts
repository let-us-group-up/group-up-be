import { mergeTypeDefs } from 'graphql-tools';
import commonTypeDefs from '../graphql/typeDefs';
import { userModelTypeDefs } from './model';
import { getUserTypeDefs } from './getUser';
import { createUserTypeDefs } from './createUser';

export const typeDefs = mergeTypeDefs([
  commonTypeDefs,
  userModelTypeDefs,
  getUserTypeDefs,
  createUserTypeDefs,
]);

export default typeDefs;
