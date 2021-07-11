import SchemaBuilder from '@giraphql/core';

const builder = new SchemaBuilder<{
    Scalars: {
      Date: {
        Input: Date;
        Output: Date;
      };
    };
  }>({});

builder.scalarType('Date', {
  description: 'Date custom scalar type',
  parseValue: (value: Date) => value, // value from the client
  serialize: (value: Date) => value, // value sent to the client
});

builder.queryType({});
builder.mutationType({});

export default builder;
