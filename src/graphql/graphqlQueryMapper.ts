import { GraphQLResolveInfo } from 'graphql';
import {
  getQueryObject as getQueryObjectModule,
  QueryObject as QueryObjectModule,
} from '@aerogear/graphql-query-mapper';

const isOnlyIdFieldQueried = (
  queryData: QueryObjectModule,
): boolean => queryData.fields.length === 1 && queryData.fields[0] === 'id';


export interface QueryObject {
  fields: Array<string>;
  isOnlyIdFieldQueried: () => boolean;
}

export const getQueryObject = (info: GraphQLResolveInfo): QueryObject => {
  const queryData = getQueryObjectModule(info);

  return {
    fields: queryData.fields,
    isOnlyIdFieldQueried: () => isOnlyIdFieldQueried(queryData),
  };
};
