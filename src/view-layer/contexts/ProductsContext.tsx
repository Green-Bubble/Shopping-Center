import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useCallback,
} from "react";
import useProducts from "@data/hooks/useProducts";
import Product from "@data/models/product";
import toast from "react-hot-toast";
import useProductsFilter, {
  ProductsFilterMeta,
} from "@data/hooks/useProductsFilter";

const ProductsContext = createContext<
  | {
      items: Array<Product> | null;
      loading: boolean;
      error: any;
      loadMore: () => void;
      hasMore: boolean;
      updateCart: (id: string) => void;
      carts: Array<string>;
      filterMeta: ProductsFilterMeta;
    }
  | undefined
>(undefined);

export const ProductsProvider = ({ children }: PropsWithChildren) => {
  const [carts, setCarts] = useState<Array<string>>([]);
  const [filterMeta, filters] = useProductsFilter();
  const value = useProducts(filters);

  const updateCart = useCallback(
    (id: string) => {
      if (carts.includes(id)) {
        setCarts(carts.filter((_id) => _id !== id));
        toast.success("Successfully removed from cart!");
      } else {
        toast.success("Successfully added to cart!");
        setCarts([...carts, id]);
      }
    },
    [carts]
  );

  return (
    <ProductsContext.Provider
      value={{
        ...value,
        carts,
        updateCart,
        filterMeta,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("useProductsContext mustbe used within a ProductsProvider");
  }

  return context;
};
