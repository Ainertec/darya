import { Schema, model, Model } from 'mongoose';
import { OrderInterface } from '../../interfaces/base';

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

const ClientSchema = new Schema({
  client_id: {
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
  client_address_id: {
    type: Schema.Types.ObjectId,
  },
  district_id: {
    type: Schema.Types.ObjectId,
  },
  district_name: {
    type: String,
    required: true,
  },
  district_rate: {
    type: Number,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    // required: true,
  },
  reference: {
    type: String,
    // required: true,
  },
});

const Source = Object.freeze({
  ifood: 'Ifood',
  whatsapp: 'Whatsapp',
  instagram: 'Instagram',
  delivery: 'Pronta Entrega',
  getSource() {
    const source = [this.ifood, this.whatsapp, this.instagram, this.delivery];
    return source;
  },
});

const OrderSchema = new Schema(
  {
    client: ClientSchema,
    address: AddressSchema,
    deliveryman: {
      type: Schema.Types.ObjectId,
      ref: 'Deliveryman',
      required: true,
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
  }
);

Object.assign(OrderSchema.statics, {
  Source,
});

export { Source };

export default model<OrderInterface>('Order', OrderSchema);
