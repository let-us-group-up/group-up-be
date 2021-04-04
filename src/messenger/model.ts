import {
  Schema, model, Document, Model, Types,
} from 'mongoose';


export enum Provider {
  Telegram,
}

export interface Messenger {
  provider: Provider;
}

interface MessengerBaseDocument extends Messenger, Document<Types.ObjectId> {}

export type MessengerDocument = MessengerBaseDocument;

export type MessengerModel = Model<MessengerDocument>;


export const messengerModelTypeDefs = `
  enum Provider {
    Telegram
  }

  type Messenger {
    _id: String!
    provider: Provider!
  }
`;


const messengerSchema = new Schema<MessengerDocument, MessengerModel>({
  provider: {
    type: String,
    enum: [Provider.Telegram],
    required: true,
  },
});

export const messengerModelName = 'messengers';
const MessengerModel = model<MessengerDocument, MessengerModel>(
  messengerModelName,
  messengerSchema,
);


export default MessengerModel;