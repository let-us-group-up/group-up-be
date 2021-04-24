import {
  Schema, model, Document, Types, Model,
} from 'mongoose';
import { UserDocument, userModelName } from '../user/model';
import { AddressDocument, addressModelName } from '../address/model';
import { MessengerDocument, messengerModelName } from '../messenger/model';


export enum Roles {
  Organizer = 'Organizer',
  Participant = 'Participant',
}

export interface Participant<T> {
  role: Roles;
  user: T;
}

export interface Event {
  title: string;
  description?: string;
  dateAndTime?: Date;
  address?: AddressDocument['_id'] | (AddressDocument | null);
  messenger?: MessengerDocument['_id'] | (MessengerDocument | null);
  participants: Array<Participant<UserDocument['_id'] | (UserDocument | null)>>;
}

export interface EventBaseDocument extends Event, Document<Types.ObjectId> {}

export interface EventDocument extends EventBaseDocument {
  address?: AddressDocument['_id'];
  messenger?: MessengerDocument['_id'];
  participants: Array<Participant<UserDocument['_id']>>;
}

export interface EventPopulatedDocument extends EventBaseDocument {
  address?: AddressDocument;
  messenger?: MessengerDocument;
  participants: Array<Participant<UserDocument>>;
}

export type EventModel = Model<EventDocument>;


export const eventModelTypeDefs = `
  enum Roles {
    Organizer
    Participant
  }

  type Participant {
    role: Roles!
    user: User!
  }

  scalar Date

  type Event {
    _id: String!
    title: String!
    description: String
    dateAndTime: Date
    address: Address
    messenger: Messenger
    participants: [Participant]!
  }
`;

export const eventModelResolvers = {
  Event: {
    title: (event: EventBaseDocument): string => event.title,
  },
};


const ParticipantSchema = new Schema({
  role: {
    type: String,
    enum: [Roles.Organizer, Roles.Participant],
    default: Roles.Participant,
  },
  user: {
    type: Types.ObjectId,
    ref: userModelName,
    required: true,
  },
});

const EventSchema = new Schema<EventDocument, EventModel>({
  title: { type: String, required: true },
  description: String,
  dateAndTime: Date,
  address: {
    type: Types.ObjectId,
    ref: addressModelName,
  },
  messenger: {
    type: Types.ObjectId,
    ref: messengerModelName,
  },
  participants: [{
    type: ParticipantSchema,
    // eslint-disable-next-line object-shorthand, func-names
    required: function (this: EventBaseDocument): boolean {
      return this.participants.filter((
        participant,
      ) => participant.role === Roles.Organizer).length === 1;
    },
  }],
});

export const eventModelName = 'events';
const EventModel = model<EventDocument, EventModel>(eventModelName, EventSchema);


export default EventModel;
