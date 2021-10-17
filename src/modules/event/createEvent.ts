import EventModel, {
  Event, Roles, EventGraphQL,
} from './model';
import { User } from '../user/model';
import builder from '../../graphql/builder';


const createEvent = async ({
  title,
  description,
  author,
}: {
  title: Event['title'],
  description: Event['description'],
  author: User['id'],
}): Promise<Event> => {
  const event = await EventModel.create({
    title,
    description,
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
    description: t.arg.string(),
    author: t.arg.id({
      required: true,
    }),
  },
  resolve: async (root, {
    title,
    description,
    author,
  }) => {
    const event = await createEvent({
      title,
      description: description || undefined,
      author: String(author),
    });
    return event;
  },
}));
