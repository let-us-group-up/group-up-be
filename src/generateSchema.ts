import fs from 'fs';
import path from 'path';
import debugModule from 'debug';
import { printSchema, lexicographicSortSchema } from 'graphql';
import schema from './schema';

const debug = debugModule('app:tools');

const schemaAsString = printSchema(lexicographicSortSchema(schema));

// The absolute path of the new file with its name
const filepath = path.resolve(__dirname, '..', 'static', 'schema.graphql');

fs.writeFile(filepath, schemaAsString, (err) => {
  if (err) throw err;
  debug('The file was succesfully saved!');
});
