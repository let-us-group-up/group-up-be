import { mergeTypeDefs } from 'graphql-tools';
import userTypeDefs from './user/typeDefs';
import addressTypeDefs from './address/typeDefs';
import messengerTypeDefs from './messenger/typeDefs';
import eventTypeDefs from './event/typeDefs';

const typeDefs = mergeTypeDefs([
  userTypeDefs,
  addressTypeDefs,
  messengerTypeDefs,
  eventTypeDefs,
], {
  commentDescriptions: true,
});

export default typeDefs;
