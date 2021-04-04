import { mergeTypeDefs } from 'graphql-tools';
import { eventModelTypeDefs } from './model';

export const typeDefs = mergeTypeDefs([
  eventModelTypeDefs,
]);

export default typeDefs;
