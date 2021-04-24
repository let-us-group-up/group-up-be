import EventModel, { EventDocument, Roles } from './model';

export const createEventTypeDefs = `
  type Mutation {
    createEvent(title: String!, author: String!): Event
  }
`;

const createEvent = async (root: void, {
  title,
  author,
}: {
  title: string,
  author: string,
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

export const createEventResolvers = {
  Mutation: {
    createEvent,
  },
};
