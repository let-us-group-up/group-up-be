import express from 'express';
import path from 'path';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import expressPlayground from 'graphql-playground-middleware-express';
import debugModule from 'debug';
import schemaWithResolvers from './schemaWithResolvers';
import connectDatabase from './connectDatabase';


const httpDebug = debugModule('app:http');

const PORT = 8080;

const app = express();

connectDatabase();

app.use(cors());

app.use(express.json());

app.get('/gql', expressPlayground({ endpoint: '/graphql' }));

app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));

app.use('/static', express.static(path.join(__dirname, '..', 'static')));

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
