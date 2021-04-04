import { mergeTypeDefs } from 'graphql-tools';
import { addressModelTypeDefs } from './model';

export const typeDefs = mergeTypeDefs([
  addressModelTypeDefs,
]);

export default typeDefs;
