import EventModel, {
  EventBaseDocument,
  EventDocument,
  EventPopulatedDocument,
  EventGraphQL,
  Event,
} from './model';
import builder from '../../builder';

interface GetEventData extends EventBaseDocument {
  address: EventDocument['address'];
  messenger: EventDocument['messenger'];
  participants: EventPopulatedDocument['participants'];
}

const getEvent = async (id: string): Promise<GetEventData | null> => {
  const event = await EventModel.findById(id).populate('participants.user') as GetEventData | null;
  return event;
};

interface PopulatedEvent extends Event {
  address: EventDocument['address'];
  messenger: EventDocument['messenger'];
  participants: EventPopulatedDocument['participants'];
}

builder.queryField('event', (t) => t.field({
  type: EventGraphQL,
  args: {
    id: t.arg.id({
      required: true,
    }),
  },
  nullable: true,
  resolve: async (root, { id }) => {
    const event = await getEvent(String(id)) as PopulatedEvent | null;
    return event;
  },
}));
