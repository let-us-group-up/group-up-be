import express from 'express';
import path from 'path';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import expressPlayground from 'graphql-playground-middleware-express';
import debugModule from 'debug';
import connectDatabase from './database/connectDatabase';
import schema from './graphql/schema';
import { STATIC_FOLDER_NAME } from './constants';

const httpDebug = debugModule('app:http');

const PORT = 8080;

const app = express();

connectDatabase();

app.use(cors());

app.use(express.json());

app.get('/gql', expressPlayground({ endpoint: '/graphql' }));

app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));

app.use('/static', express.static(path.join(__dirname, '..', STATIC_FOLDER_NAME)));

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: false,
  }),
);

// localhost setup
app.listen(PORT, () => {
  httpDebug(`Graphql server now up at port ${PORT}`);
});
