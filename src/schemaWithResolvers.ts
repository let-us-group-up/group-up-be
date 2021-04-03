import { makeExecutableSchema } from 'graphql-tools';
import userTypeDefs from './user/typeDefs';
import userResolvers from './user/resolvers';

const schema = makeExecutableSchema({
  typeDefs: [
    userTypeDefs,
  ],
  resolvers: [
    ...userResolvers,
  ],
});

export default schema;
