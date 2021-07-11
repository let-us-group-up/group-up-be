/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { connect, set, plugin } from 'mongoose';
import mongooseLeanId from 'mongoose-lean-id';
import config from 'config';
import debugModule from 'debug';

const debug = debugModule('app:db');


set('toObject', {
  transform: (doc: any, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

plugin(mongooseLeanId);


const connectDatabase = (): void => {
  if (!config.has('db.username') || !config.get('db.password')) {
    debug('Database username or password is not specified');
    process.exit(9);
  }
  const uri = `mongodb+srv://${config.get('db.username')}:${config.get('db.password')}@main.mrvei.mongodb.net/Main?retryWrites=true&w=majority`;

  connect(
    uri,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
    .then(() => debug('Connected to MongoDB'))
    .catch(() => debug('Could not connect to MongoDB'));
};


export default connectDatabase;
