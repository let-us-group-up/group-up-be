import { addResolversToSchema, loadSchemaSync, GraphQLFileLoader } from 'graphql-tools';
import { join } from 'path';
import resolvers from './resolvers';

const schema = loadSchemaSync(join(__dirname, 'typeDefs.gql'), { loaders: [new GraphQLFileLoader()] });

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});

export default schemaWithResolvers;
