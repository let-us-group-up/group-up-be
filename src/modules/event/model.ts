import {
  Schema, model, Document, Types, Model,
} from 'mongoose';
import builder from '../../builder';
import { User, userModelName, UserAndIDUnionGraphQL } from '../user/model';
import { Address, addressModelName, AddressAndIDUnionGraphQL } from '../address/model';
import { Messenger, messengerModelName, MessengerAndIDUnionGraphQL } from '../messenger/model';


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

export interface Event {
  id: string;
  title: string;
  description?: string;
  dateAndTime?: Date;
  address?: Address['id'] | Address;
  messenger?: Messenger['id'] | Messenger;
  participants: Array<Participant<User['id'] | User>>;
}

export interface EventBaseDocument extends Omit<Event, 'id'>, Document<Types.ObjectId> {}

export interface EventDocument extends EventBaseDocument {
  address?: Address['id'];
  messenger?: Messenger['id'];
  participants: Array<Participant<User['id']>>;
}

export interface EventPopulatedDocument extends EventBaseDocument {
  address?: Address;
  messenger?: Messenger;
  participants: Array<Participant<User>>;
}

export type EventModel = Model<EventDocument>;


const ParticipantGraphQLRef = builder.objectRef<Participant<User | User['id']>>('Participant');

export const ParticipantGraphQL = builder.objectType(ParticipantGraphQLRef, {
  description: 'Participant',
  fields: (t) => ({
    user: t.field({
      type: UserAndIDUnionGraphQL,
      resolve: (parent) => {
        if (typeof parent.user === 'object') {
          return {
            userKind: 'User',
            user: parent.user,
          } as const;
        }

        return {
          userKind: 'UserID',
          user: parent.user,
        } as const;
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
      type: AddressAndIDUnionGraphQL,
      nullable: true,
      resolve: (parent) => {
        if (!parent.address) {
          return null;
        }

        if (typeof parent.address === 'object') {
          return {
            addressKind: 'Address',
            address: parent.address,
          } as const;
        }

        return {
          addressKind: 'AddressID',
          address: parent.address,
        } as const;
      },
    }),
    messenger: t.field({
      type: MessengerAndIDUnionGraphQL,
      nullable: true,
      resolve: (parent) => {
        if (!parent.messenger) {
          return null;
        }

        if (typeof parent.messenger === 'object') {
          return {
            messengerKind: 'Messenger',
            messenger: parent.messenger,
          } as const;
        }

        return {
          messengerKind: 'MessengerID',
          messenger: parent.messenger,
        } as const;
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
