import data, { User } from './data';

const resolvers = {
  Query: {
    getUser: (root: void, { id }: { id: string }): User => data[id],
  },
};

export default resolvers;
