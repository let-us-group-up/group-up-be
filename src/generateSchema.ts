import fs from 'fs';
import path from 'path';
import debugModule from 'debug';
import typeDefs from './typeDefs';

const debug = debugModule('app:tools');

// The absolute path of the new file with its name
const filepath = path.resolve(__dirname, '..', 'static', 'schema.graphql');

fs.writeFile(filepath, typeDefs, (err) => {
  if (err) throw err;
  debug('The file was succesfully saved!');
});
