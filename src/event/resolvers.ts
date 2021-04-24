import { IResolvers } from 'graphql-tools';
import { eventModelResolvers } from './model';
import { getEventResolvers } from './getEvent';
import { createEventResolvers } from './createEvent';

const resolvers: Array<IResolvers> = [
  eventModelResolvers,
  getEventResolvers,
  createEventResolvers,
];

export default resolvers;
