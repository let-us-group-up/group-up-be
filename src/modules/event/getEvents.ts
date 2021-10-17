import EventModel, {
  Event,
  EventGraphQL,
} from './model';
import builder from '../../graphql/builder';


const getEvents = async (): Promise<Array<Event>> => {
  const events = await EventModel.find().lean<Array<Event>>();
  return events;
};

builder.queryField('events', (t) => t.field({
  type: [EventGraphQL],
  resolve: async () => {
    const events = await getEvents();
    return events;
  },
}));
