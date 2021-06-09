import {
  Schema, model, Document, Model, Types,
} from 'mongoose';
import builder from '../builder';


export enum Provider {
  Telegram = 'Telegram',
}

builder.enumType(Provider, {
  name: 'Provider',
});

export interface Messenger {
  id: string;
  provider: Provider;
}

interface MessengerBaseDocument extends Omit<Messenger, 'id'>, Document<Types.ObjectId> {}

export type MessengerDocument = MessengerBaseDocument;

export type MessengerModel = Model<MessengerDocument>;


const MessengerGraphQLRef = builder.objectRef<Messenger>('Messenger');

export const MessengerGraphQL = builder.objectType(MessengerGraphQLRef, {
  description: 'Messenger',
  fields: (t) => ({
    id: t.id({
      resolve: (parent) => parent.id,
    }),
    provider: t.field({
      type: Provider,
      resolve: (parent) => parent.provider,
    }),
  }),
});

const MessengerIDUnionPartGraphQL = builder.objectType(
  builder.objectRef<{ messengerKind: 'MessengerID'; messenger: Messenger['id'] }>('MessengerIDUnionPart'), {
    fields: (t) => ({
      messenger: t.field({
        type: 'String',
        resolve: (parent) => parent.messenger,
      }),
    }),
  },
);

const MessengerUnionPartGraphQL = builder.objectType(
  builder.objectRef<{ messengerKind: 'Messenger'; messenger: Messenger }>('MessengerUnionPart'), {
    fields: (t) => ({
      messenger: t.field({
        type: MessengerGraphQL,
        resolve: (parent) => parent.messenger,
      }),
    }),
  },
);

export const MessengerAndIDUnionGraphQL = builder.unionType('MessengerAndIDUnion', {
  types: [MessengerIDUnionPartGraphQL, MessengerUnionPartGraphQL],
  resolveType: (messenger) => {
    switch (messenger.messengerKind) {
      case 'MessengerID':
        return MessengerIDUnionPartGraphQL;
      case 'Messenger':
        return MessengerUnionPartGraphQL;
      default:
        return MessengerIDUnionPartGraphQL;
    }
  },
});


const MessengerSchema = new Schema<MessengerDocument, MessengerModel>({
  provider: {
    type: String,
    enum: [Provider.Telegram],
    required: true,
  },
});

export const messengerModelName = 'messengers';
const MessengerModel = model<MessengerDocument, MessengerModel>(
  messengerModelName,
  MessengerSchema,
);


export default MessengerModel;
