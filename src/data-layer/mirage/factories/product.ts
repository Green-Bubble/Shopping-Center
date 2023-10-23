import { Factory } from "miragejs";
import { faker } from "@faker-js/faker";
import Product from "@data/models/product";

export const productFactory = Factory.extend<Product>({
  id(i) {
    return i.toString();
  },
  name() {
    return faker.commerce.productName();
  },
  department() {
    return faker.commerce.department();
  },
  price() {
    return faker.commerce.price();
  },
  description() {
    return faker.commerce.productDescription();
  },
  image() {
    return faker.image.urlLoremFlickr({ category: "animal" });
  },
});
