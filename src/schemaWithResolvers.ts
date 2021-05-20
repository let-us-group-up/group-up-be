import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './typeDefs';
import userResolvers from './user/resolvers';
import addressResolvers from './address/resolvers';
import messengerResolvers from './messenger/resolvers';
import eventResolvers from './event/resolvers';
import customScalarsResolver from './graphql/customScalars';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: [
    ...userResolvers,
    ...addressResolvers,
    ...messengerResolvers,
    ...eventResolvers,

    customScalarsResolver,
  ],
});

export default schema;
