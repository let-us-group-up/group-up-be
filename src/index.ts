import express from 'express';
import path from 'path';
import { graphqlHTTP } from 'express-graphql';
import expressPlayground from 'graphql-playground-middleware-express';
import debugModule from 'debug';
import schemaWithResolvers from './schemaWithResolvers';

const httpDebug = debugModule('app:http');

const PORT = 8080;

const app = express();
app.use(express.json());

app.get('/gql', expressPlayground({ endpoint: '/graphql' }));

app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schemaWithResolvers,
    graphiql: false,
  }),
);

// localhost setup
app.listen(PORT, () => {
  httpDebug(`Graphql server now up at port ${PORT}`);
});
