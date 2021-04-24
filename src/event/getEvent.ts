import EventModel, {
  EventBaseDocument,
  EventDocument,
  EventPopulatedDocument,
} from './model';

export const getEventTypeDefs = `
  type Query {
    getEvent(id: String!): Event
  }
`;

interface GetEventData extends EventBaseDocument {
  address: EventDocument['address'];
  messenger?: EventDocument['messenger'];
  participants: EventPopulatedDocument['participants'];
}

const getEvent = async (root: void, { id }: { id: string }): Promise<GetEventData | null> => {
  const event = await EventModel.findById(id).populate('participants.user') as GetEventData | null;
  return event;
};

export const getEventResolvers = {
  Query: {
    getEvent,
  },
};
