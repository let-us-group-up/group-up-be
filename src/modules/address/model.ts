import {
  Schema, model, Document, Model,
} from '../../database/model';
import builder from '../../graphql/builder';


export interface Address {
  id: string;
  address1: string;
  address2: string;
}

type AddressBaseDocument = Document<Address>;

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


const AddressSchema = new Schema<AddressDocument, AddressModel>({
  address1: { type: String, required: true },
  address2: { type: String, required: true },
});

export const addressModelName = 'addresses';
const AddressModel = model<AddressDocument, AddressModel>(addressModelName, AddressSchema);


export default AddressModel;
