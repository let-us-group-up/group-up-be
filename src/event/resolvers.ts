import { IResolvers } from 'graphql-tools';
import { eventModelResolvers } from './model';

const resolvers: Array<IResolvers> = [
  eventModelResolvers,
];

export default resolvers;
