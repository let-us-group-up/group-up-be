import { makeExecutableSchema, mergeTypeDefs } from 'graphql-tools';

import userTypeDefs from './user/typeDefs';
import userResolvers from './user/resolvers';

import addressTypeDefs from './address/typeDefs';
import addressResolvers from './address/resolvers';

import messengerTypeDefs from './messenger/typeDefs';
import messengerResolvers from './messenger/resolvers';

import eventTypeDefs from './event/typeDefs';
import eventResolvers from './event/resolvers';

import customScalarsResolver from './customScalars';


const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs([
    userTypeDefs,
    addressTypeDefs,
    messengerTypeDefs,
    eventTypeDefs,
  ]),
  resolvers: [
    ...userResolvers,
    ...addressResolvers,
    ...messengerResolvers,
    ...eventResolvers,

    customScalarsResolver,
  ],
});

export default schema;
