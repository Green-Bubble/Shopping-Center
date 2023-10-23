import { Response, Server } from "miragejs";
import { AppSchema } from "../types";

export function routesForUsers(server: Server) {
  server.post(`/signin`, (schema: AppSchema, request) => {
    const { email, password } = JSON.parse(request.requestBody);
    const user = schema.findBy("user", {
      email,
      password,
    });

    return user
      ? new Response(200, {}, { user })
      : new Response(401, {}, { errors: ["user does not exist"] });
  });
}
