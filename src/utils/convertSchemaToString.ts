import { printSchema, lexicographicSortSchema, GraphQLSchema } from 'graphql';

const convertSchemaToString = (
  schema: GraphQLSchema,
): string => printSchema(lexicographicSortSchema(schema));

export default convertSchemaToString;
