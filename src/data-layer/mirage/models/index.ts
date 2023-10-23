import Product from "@data/models/product";
import User from "@data/models/user";
import { Model } from "miragejs";
import { ModelDefinition } from "miragejs/-types";

const UserModel: ModelDefinition<User> = Model.extend({});
const ProductModel: ModelDefinition<Product> = Model.extend({});

export const models = {
  user: UserModel,
  product: ProductModel,
};
