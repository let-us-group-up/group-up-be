import {
  Types,
  Document as MongooseDocument,
} from 'mongoose';

export {
  Schema,
  Types,
  model,
  Model,
  PopulatedDoc,
} from 'mongoose';

export type Document<T> = Omit<T, 'id'> & MongooseDocument<Types.ObjectId>;

export type MakePopulated<Type, Parts, K extends keyof Parts> =
  Omit<Type, K> & {
    [P in K]: Parts[P];
  };
