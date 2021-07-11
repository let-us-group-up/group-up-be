import {
  Schema, model, Document, Types, Model, PopulatedDoc, MakePopulated,
} from 'mongoose';
import builder from '../../builder';
import { getQueryObject } from '../../graphql/graphqlQueryMapper';
import {
  User, UserDocument, userModelName, UserGraphQL,
} from '../user/model';
import {
  Address, AddressDocument, addressModelName, AddressGraphQL,
} from '../address/model';
import {
  Messenger, MessengerDocument, messengerModelName, MessengerGraphQL,
} from '../messenger/model';
import getUser from '../user/getUser';
import getAddress from '../address/getAddress';
import getMessenger from '../messenger/getMessenger';


export enum Roles {
  Organizer = 'Organizer',
  Participant = 'Participant',
}

builder.enumType(Roles, {
  name: 'Roles',
});

export interface Participant<T> {
  role: Roles;
  user: T;
}


export interface BaseEvent {
  id: string;
  title: string;
  description?: string;
  dateAndTime?: Date;
  address?: Address['id'] | (Address | null);
  messenger?: Messenger['id'] | (Messenger | null);
  participants: Array<Participant<User['id'] | (User | null)>>;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  dateAndTime?: Date;
  address?: Address['id'];
  messenger?: Messenger['id'];
  participants: Array<Participant<User['id']>>;
}

interface PopulatedEventParts {
  address: Address | null;
  messenger: Messenger | null;
  participants: Array<Participant<User | null>>;
}
export type PopulatedEvent<K extends keyof PopulatedEventParts>
  = MakePopulated<Event, PopulatedEventParts, K>;

export interface BaseEventDocument extends Omit<Event, 'id'>, Document<Types.ObjectId> {
  address?: PopulatedDoc<AddressDocument | null, AddressDocument['id']>;
  messenger?: PopulatedDoc<MessengerDocument | null, MessengerDocument['id']>;
  participants: Array<Participant<PopulatedDoc<UserDocument | null, UserDocument['id']>>>;
}

export interface EventDocument extends BaseEventDocument {
  address?: AddressDocument['id'];
  messenger?: MessengerDocument['id'];
  participants: Array<Participant<UserDocument['id']>>;
}

interface PopulatedEventDocumentParts {
  address: AddressDocument | null;
  messenger: MessengerDocument | null;
  participants: Array<Participant<UserDocument | null>>;
}
export type PopulatedEventDocument<K extends keyof PopulatedEventDocumentParts>
  = MakePopulated<EventDocument, PopulatedEventDocumentParts, K>;

export type EventModel = Model<EventDocument>;


const ParticipantGraphQLRef = builder.objectRef<Participant<User['id']>>('Participant');

export const ParticipantGraphQL = builder.objectType(ParticipantGraphQLRef, {
  description: 'Participant',
  fields: (t) => ({
    user: t.field({
      type: UserGraphQL,
      nullable: true,
      resolve: (parent, params, context, info) => {
        const queryObject = getQueryObject(info);
        if (queryObject.isOnlyIdFieldQueried()) {
          return { id: parent.user } as User;
        }
        return getUser(parent.user);
      },
    }),
    role: t.field({
      type: Roles,
      resolve: (parent) => parent.role,
    }),
  }),
});

const EventGraphQLRef = builder.objectRef<Event>('Event');

export const EventGraphQL = builder.objectType(EventGraphQLRef, {
  description: 'Event',
  fields: (t) => ({
    id: t.id({
      resolve: (parent) => parent.id,
    }),
    title: t.string({
      resolve: (parent) => parent.title,
    }),
    description: t.string({
      nullable: true,
      resolve: (parent) => parent.description,
    }),
    dateAndTime: t.field({
      type: 'Date',
      nullable: true,
      resolve: (parent) => parent.dateAndTime,
    }),
    address: t.field({
      type: AddressGraphQL,
      nullable: true,
      resolve: (parent, params, context, info) => {
        if (!parent.address) return null;
        const queryObject = getQueryObject(info);
        if (queryObject.isOnlyIdFieldQueried()) {
          return { id: parent.address } as Address;
        }
        return getAddress(parent.address);
      },
    }),
    messenger: t.field({
      type: MessengerGraphQL,
      nullable: true,
      resolve: (parent, params, context, info) => {
        if (!parent.messenger) return null;
        const queryObject = getQueryObject(info);
        if (queryObject.isOnlyIdFieldQueried()) {
          return { id: parent.messenger } as Messenger;
        }
        return getMessenger(parent.messenger);
      },
    }),
    participants: t.field({
      type: [ParticipantGraphQL],
      resolve: (parent) => parent.participants,
    }),
  }),
});


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
    required: function (this: BaseEventDocument): boolean {
      return this.participants.filter((
        participant,
      ) => participant.role === Roles.Organizer).length === 1;
    },
  }],
});


export const eventModelName = 'events';
const EventModel = model<EventDocument, EventModel>(eventModelName, EventSchema);


export default EventModel;
