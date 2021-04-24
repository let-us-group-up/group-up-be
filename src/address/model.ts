import {
  Schema, model, Document, Model, Types,
} from 'mongoose';


export interface Address {
  address1: string;
  address2: string;
}

interface AddressBaseDocument extends Address, Document<Types.ObjectId> {}

export type AddressDocument = AddressBaseDocument;

export type AddressModel = Model<AddressDocument>;


export const addressModelTypeDefs = `
  type Address {
    _id: String!
    address1: String!
    address2: String!
  }
`;


const AddressSchema = new Schema<AddressDocument, AddressModel>({
  address1: { type: String, required: true },
  address2: { type: String, required: true },
});

export const addressModelName = 'addresses';
const AddressModel = model<AddressDocument, AddressModel>(addressModelName, AddressSchema);


export default AddressModel;
