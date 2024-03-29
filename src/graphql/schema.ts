import { GraphQLSchema } from 'graphql';
import builder from './builder';

import '../modules/user/model';
import '../modules/user/createUser';
import '../modules/user/getUser';

import '../modules/event/model';
import '../modules/event/createEvent';
import '../modules/event/getEvent';
import '../modules/event/getEvents';

import '../modules/messenger/model';

import '../modules/address/model';

const schema: GraphQLSchema = builder.toSchema({});

export default schema;
