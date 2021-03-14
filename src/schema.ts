import { makeExecutableSchema } from 'graphql-tools';

interface User {
  id: string;
  firstName: string;
  lastName: string;
}

const data: Record<string, User> = {
  1: {
    id: '1',
    firstName: 'Jon',
    lastName: 'Filter',
  },
  2: {
    id: '2',
    firstName: 'Marry',
    lastName: 'Corson',
  },
};

const typeDefs = `
  type User {
    id: String
    firstName: String
    lastName: String
  }

  type Query {
    getUser(id: String): User
  }
`;

const resolvers = {
  Query: {
    getUser: (root: void, { id }: { id: string }) => data[id],
  },
};

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default executableSchema;
