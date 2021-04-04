import { makeExecutableSchema } from 'graphql-tools';

import userTypeDefs from './user/typeDefs';
import userResolvers from './user/resolvers';

import addressTypeDefs from './address/typeDefs';
import addressResolvers from './address/resolvers';

import messengerTypeDefs from './messenger/typeDefs';
import messengerResolvers from './messenger/resolvers';

import eventTypeDefs from './event/typeDefs';
import eventResolvers from './event/resolvers';


const schema = makeExecutableSchema({
  typeDefs: [
    userTypeDefs,
    addressTypeDefs,
    messengerTypeDefs,
    eventTypeDefs,
  ],
  resolvers: [
    ...userResolvers,
    ...addressResolvers,
    ...messengerResolvers,
    ...eventResolvers,
  ],
});

export default schema;
