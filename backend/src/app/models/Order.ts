import { Schema, model } from 'mongoose';
import { OrderInterface } from '../../interfaces/base';

const ItemsSchema = new Schema({
  products: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Source = Object.freeze({
  ifood: 'Ifood',
  whatsapp: 'Whatsapp?',
  instagram: 'Instagram',
  delivery: 'Pronta Entrega',
});

const OrderSchema = new Schema(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
    },
    client_address_id: {
      type: Schema.Types.ObjectId,
      ref: 'Client.address',
      required: true,
    },
    district: {
      type: Schema.Types.ObjectId,
      ref: 'District',
      required: true,
    },
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
  },
  {
    timestamps: true,
  }
);

Object.assign(OrderSchema.statics, {
  Source,
});

export default model<OrderInterface>('Order', OrderSchema);
