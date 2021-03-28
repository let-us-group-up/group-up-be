export interface User {
  id: string;
  firstName: string;
  lastName: string;
}

const data: Record<string, User> = {
  1: {
    id: '1',
    firstName: 'Jon',
    lastName: 'Filter',
  },
  2: {
    id: '2',
    firstName: 'Marry',
    lastName: 'Corson',
  },
};

export default data;
