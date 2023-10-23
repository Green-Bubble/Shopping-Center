import { Response, Server } from "miragejs";
import { AppSchema } from "../types";

export function routesForProducts(server: Server) {
  server.get(`/products`, (schema: AppSchema, request) => {
    const { page, size, q } = request.queryParams;
    const products = schema.all("product");

    const _page = page ? parseInt(page) : 0;
    const _size = size ? parseInt(size) : 20;

    const availableData = products.models.filter((product) => {
      if (q) {
        const keyword = q.toLocaleLowerCase();
        return (
          product.department.toLocaleLowerCase().includes(keyword) ||
          product.description.toLocaleLowerCase().includes(keyword) ||
          product.name.toLocaleLowerCase().includes(keyword)
        );
      }
      return true;
    });

    const data = availableData.slice(_page * _size, (_page + 1) * _size);

    return new Response(
      200,
      {},
      {
        page,
        size,
        total: availableData.length,
        items: data,
      }
    );
  });

  server.get(`/products/:id`, (schema: AppSchema, request) => {
    const { id } = request.params;
    const product = schema.find("product", id);

    return product
      ? new Response(200, {}, { data: product })
      : new Response(404, {}, { errors: ["content does not exist"] });
  });

  server.post(`/products`, (schema: AppSchema, request) => {
    const { ids } = JSON.parse(request.requestBody);
    const products = schema.all("product");

    const items = products.models.filter((product) => ids.includes(product.id));

    return items
      ? new Response(200, {}, { items })
      : new Response(404, {}, { errors: ["items do not exist"] });
  });
}
