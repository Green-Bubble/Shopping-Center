import { createServer } from "miragejs";
import { endpoints } from "./endpoints";
import { models } from "./models";
import { factories } from "./factories";

const TOTAL_USERS = 200;
const TOTAL_PRODUCTS = 1200;

export function startMirage() {
  const server = createServer({
    models,
    factories,
    seeds(server) {
      server.createList("user", TOTAL_USERS);
      server.createList("product", TOTAL_PRODUCTS);
    },
  });

  server.logging = true;

  server.urlPrefix = process.env.REACT_APP_API_BASE ?? "";
  for (const namespace of Object.keys(endpoints)) {
    //@ts-ignore
    endpoints[namespace](server);
  }

  server.namespace = "";
  server.passthrough();

  console.log({ dump: server.db.dump() });
}
