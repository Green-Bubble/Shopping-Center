export class Products {
    static async list(
        page: number,
        pageSize: number,
        q: string = ''
    ) {
        let apiURL = `${process.env.REACT_APP_API_BASE}/products?page=${page}&size=${pageSize}`;
        if (q) {
          apiURL += `&q=${q}`;
        }
        const response = await fetch(apiURL);
        const data = await response.json();
        return data;
    }

    static async get(id?: string) {
        if (!id) {
            return null;
        }
        const response = await fetch(
            `${process.env.REACT_APP_API_BASE}/products/${id}`
        );
        const product = await response.json();
        return product;
    }

    static async carts(ids: Array<string>) {
        const response = await fetch(
            `${process.env.REACT_APP_API_BASE}/products`,
            {
                method: "POST",
                body: JSON.stringify({ ids }),
            }
        );
        const data = await response.json();
        return data.items;
    }
}