/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { Schema, model } from 'mongoose';
import { OrderInterface } from '../interfaces/base';

const ItemsSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const UserSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  phone: [
    {
      type: String,
      default: null,
    },
  ],
});

const AddressSchema = new Schema({
  user_address_id: {
    type: Schema.Types.ObjectId,
    default: null,
  },
  district_id: {
    type: Schema.Types.ObjectId,
    default: null,
  },
  district_name: {
    type: String,
    default: null,
    // required: true,
  },
  district_rate: {
    type: Number,
    default: null,
    // required: true,
  },
  street: {
    type: String,
    default: null,
    // required: true,
  },
  number: {
    type: Number,
    default: null,
    // required: true,
  },
  reference: {
    type: String,
    default: null,
    // required: true,
  },
});

const Source = Object.freeze({
  ifood: 'Ifood',
  whatsapp: 'Whatsapp',
  instagram: 'Instagram',
  delivery: 'Pronta Entrega',
  itau: 'Transferência Itaú',
  bradesco: 'Transferência Bradesco',
  getSource() {
    const source = [
      this.ifood,
      this.whatsapp,
      this.instagram,
      this.delivery,
      this.itau,
      this.bradesco,
    ];
    return source;
  },
});

const OrderSchema = new Schema(
  {
    user: UserSchema,
    address: AddressSchema,
    deliveryman: {
      type: Schema.Types.ObjectId,
      ref: 'Deliveryman',
      default: null,
    },
    items: [ItemsSchema],
    total: {
      type: Number,
      default: null,
    },
    finished: {
      type: Boolean,
      default: false,
    },
    source: {
      type: String,
      required: true,
      enum: Object.values(Source),
    },
    note: {
      type: String,
      default: null,
    },
    payment: {
      type: String,
      default: null,
    },
    identification: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

Object.assign(OrderSchema.statics, {
  Source,
});

export { Source };
export const Order = model<OrderInterface>('Order', OrderSchema);
