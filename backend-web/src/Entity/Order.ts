/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { Schema, model, Types, Document } from 'mongoose';
import { IAddress, IClientDocument } from './Client';
import { IProductDocument } from './Product';

export interface IItem {
  product: string;
  quantity: number;
}
interface ClientOrderInterface {
  client_id: Types.ObjectId;
  name: string;
  phone?: string[];
}
interface AddressOrderInterface {
  street: string;
  reference?: string;
  number?: number;
  district_rate: number;
  district_name: string;
  district_id: Types.ObjectId;
  client_address_id: Types.ObjectId;
}

export interface IOrderDocument extends Document {
  identification: string;
  client: ClientOrderInterface;
  address?: AddressOrderInterface;
  deliveryman?: Types.ObjectId;
  items: IItem[];
  total: number;
  finished?: boolean;
  source: string;
  note?: string;
  payment?: string;
  createdAt?: Date;
}
// export interface IOrder {
//   identification: string;
//   client: IClientDocument;
//   address?: IAddress;
//   deliveryman?: Types.ObjectId;
//   items: IItem[];
//   total: number;
//   finished?: boolean;
//   source: string;
//   note?: string;
//   payment?: string;
//   createdAt?: Date;
// }

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
  site: 'site',
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
      // this.itau,
      // this.bradesco,
      this.site,
    ];
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

// OrderSchema.post<OrderInterface>('save', async document => {
//   if (document && document.finished) {
//     for (const item of document.items) {
//       const product = await Product.findOne({ _id: item.product });

//       if (product) {
//         await subIngredientStock(product.ingredients, item.quantity);
//       }
//     }
//   }
// });
export { Source };
export const Order = model<IOrderDocument>('Order', OrderSchema);
