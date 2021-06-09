import EventModel, {
  EventDocument, Roles, EventGraphQL, Event,
} from './model';
import { User } from '../user/model';
import builder from '../builder';


const createEvent = async ({
  title,
  author,
}: {
  title: Event['title'],
  author: User['id'],
}): Promise<EventDocument> => {
  const event = await EventModel.create({
    title,
    participants: [{
      role: Roles.Organizer,
      user: author,
    }],
  });

  return event;
};

interface NewEvent extends Event {
  address: EventDocument['address'];
  messenger: EventDocument['messenger'];
  participants: EventDocument['participants'];
}

builder.mutationField('createEvent', (t) => t.field({
  type: EventGraphQL,
  args: {
    title: t.arg.string({
      required: true,
    }),
    author: t.arg.id({
      required: true,
    }),
  },
  resolve: async (root, { title, author }) => {
    const event = await createEvent({ title, author: String(author) }) as NewEvent;
    return event;
  },
}));
