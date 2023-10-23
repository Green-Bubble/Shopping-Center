import { Factory } from "miragejs";
import { faker } from "@faker-js/faker";
import User from "@data/models/user";

export const userFactory = Factory.extend<User & { password: string }>({
  id(i) {
    return i.toString();
  },
  name(i) {
    if (i === 0) {
      return "Scott Miller";
    }
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return `${firstName} ${lastName}`;
  },
  email(i) {
    if (i === 0) {
      return "scott@skyway.com";
    }
    return faker.internet.email();
  },
  password(i) {
    if (i === 0) {
      return "Q02w9RFh5eNh55z";
    }
    return faker.internet.password();
  },
});
