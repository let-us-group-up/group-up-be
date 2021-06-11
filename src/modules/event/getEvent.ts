import EventModel, {
  PopulatedEventDocument,
  Event,
  PopulatedEvent,
  EventGraphQL,
} from './model';
import builder from '../../builder';


type PopulatedEventType = PopulatedEvent<'participants'>;

const getEvent = async (id: Event['id']): Promise<PopulatedEventType | null> => {
  const event = await EventModel.findById(id).populate('participants.user') as PopulatedEventDocument<'participants'>;
  return event && event.toObject<PopulatedEventType>();
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
