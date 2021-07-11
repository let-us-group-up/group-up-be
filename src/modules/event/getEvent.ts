import EventModel, {
  Event,
  EventGraphQL,
} from './model';
import builder from '../../builder';


const getEvent = async (id: Event['id']): Promise<Event | null> => {
  const event = await EventModel.findById(id).lean<Event>();
  return event;
};

builder.queryField('event', (t) => t.field({
  type: EventGraphQL,
  args: {
    id: t.arg.id({
      required: true,
    }),
  },
  nullable: true,
  resolve: async (root, { id }) => {
    const event = await getEvent(String(id));
    return event;
  },
}));
