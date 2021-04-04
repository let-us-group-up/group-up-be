import { mergeTypeDefs } from 'graphql-tools';
import { messengerModelTypeDefs } from './model';

export const typeDefs = mergeTypeDefs([
  messengerModelTypeDefs,
]);

export default typeDefs;
