import fs from 'fs';
import path from 'path';
import debugModule from 'debug';
import schema from './schema';
import convertSchemaToString from './utils/convertSchemaToString';

const debug = debugModule('app:tools');

const schemaAsString = convertSchemaToString(schema);

// The absolute path of the new file with its name
const filepath = path.resolve(__dirname, '..', 'static', 'schema.graphql');

fs.writeFile(filepath, schemaAsString, (err) => {
  if (err) throw err;
  debug('The file was succesfully saved!');
});
