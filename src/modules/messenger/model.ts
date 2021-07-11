import {
  Schema, model, Document, Model, Types,
} from 'mongoose';
import builder from '../../builder';


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
