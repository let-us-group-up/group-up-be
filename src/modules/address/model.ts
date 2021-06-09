import {
  Schema, model, Document, Model, Types,
} from 'mongoose';
import builder from '../../builder';


export interface Address {
  id: string;
  address1: string;
  address2: string;
}

interface AddressBaseDocument extends Omit<Address, 'id'>, Document<Types.ObjectId> {}

export type AddressDocument = AddressBaseDocument;

export type AddressModel = Model<AddressDocument>;


const AddressGraphQLRef = builder.objectRef<Address>('Address');

export const AddressGraphQL = builder.objectType(AddressGraphQLRef, {
  description: 'Address',
  fields: (t) => ({
    id: t.id({
      resolve: (parent) => parent.id,
    }),
    address1: t.string({
      resolve: (parent) => parent.address1,
    }),
    address2: t.string({
      resolve: (parent) => parent.address2,
    }),
  }),
});
const AddressIDUnionPartGraphQL = builder.objectType(
  builder.objectRef<{ addressKind: 'AddressID'; address: Address['id'] }>('AddressIDUnionPart'), {
    fields: (t) => ({
      address: t.field({
        type: 'String',
        resolve: (parent) => parent.address,
      }),
    }),
  },
);

const AddressUnionPartGraphQL = builder.objectType(
  builder.objectRef<{ addressKind: 'Address'; address: Address }>('AddressUnionPart'), {
    fields: (t) => ({
      address: t.field({
        type: AddressGraphQL,
        resolve: (parent) => parent.address,
      }),
    }),
  },
);

export const AddressAndIDUnionGraphQL = builder.unionType('AddressAndIDUnion', {
  types: [AddressIDUnionPartGraphQL, AddressUnionPartGraphQL],
  resolveType: (address) => {
    switch (address.addressKind) {
      case 'AddressID':
        return AddressIDUnionPartGraphQL;
      case 'Address':
        return AddressUnionPartGraphQL;
      default:
        return AddressIDUnionPartGraphQL;
    }
  },
});


const AddressSchema = new Schema<AddressDocument, AddressModel>({
  address1: { type: String, required: true },
  address2: { type: String, required: true },
});

export const addressModelName = 'addresses';
const AddressModel = model<AddressDocument, AddressModel>(addressModelName, AddressSchema);


export default AddressModel;
