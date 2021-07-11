import EventModel, {
  Event, Roles, EventGraphQL,
} from './model';
import { User } from '../user/model';
import builder from '../../graphql/builder';


const createEvent = async ({
  title,
  author,
}: {
  title: Event['title'],
  author: User['id'],
}): Promise<Event> => {
  const event = await EventModel.create({
    title,
    participants: [{
      role: Roles.Organizer,
      user: author,
    }],
  });

  return event.toObject<Event>();
};

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
    const event = await createEvent({ title, author: String(author) });
    return event;
  },
}));
