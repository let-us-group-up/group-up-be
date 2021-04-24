import { mergeTypeDefs } from 'graphql-tools';
import { eventModelTypeDefs } from './model';
import { getEventTypeDefs } from './getEvent';
import { createEventTypeDefs } from './createEvent';

export const typeDefs = mergeTypeDefs([
  eventModelTypeDefs,
  getEventTypeDefs,
  createEventTypeDefs,
]);

export default typeDefs;
