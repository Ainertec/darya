/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { Schema, model } from 'mongoose';
import { OrderInterface } from '../../interfaces/base';
import Product from './Product';
import { subIngredientStock } from '../utils/subIngredientStock';

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
  site: 'site',
  getSource() {
    const source = [
      this.ifood,
      this.whatsapp,
      this.instagram,
      this.delivery,
      this.itau,
      this.bradesco,
      this.site
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
    viewed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

Object.assign(OrderSchema.statics, {
  Source,
});

OrderSchema.post<OrderInterface>('save', async document => {
  if (document && document.finished) {
    for (const item of document.items) {
      const product = await Product.findOne({ _id: item.product });

      if (product) {
        await subIngredientStock(product.ingredients, item.quantity);
      }
    }
  }
});
export { Source };
export default model<OrderInterface>('Order', OrderSchema);
