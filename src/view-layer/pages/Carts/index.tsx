import { withPrivateRoute } from "@components/PrivateRoute";
import useAsyncAction from "@data/hooks/useAsyncAction";
import ProductItem from "@view/components/ProductItem";
import { useProductsContext } from "@view/contexts/ProductsContext";
import { withMainLayout } from "@view/layouts/MainLayout";
import { useCallback, useEffect } from "react";
import Loading from "../Loading";
import { Products } from "@data/api/services/products";

const Carts = () => {
  const { carts } = useProductsContext();
  const [fetchCarts, isLoading, { data: items }] = useAsyncAction<any, any>(
    useCallback(async () => {
      return await Products.carts(carts);
    }, [carts])
  );

  useEffect(() => {
    fetchCarts();
  }, [fetchCarts, carts]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
      {(items?.length || 0) > 0 ? (
        items?.map((item) => <ProductItem item={item} />)
      ) : (
        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">
          No Items
        </p>
      )}
    </div>
  );
};

export default withPrivateRoute(withMainLayout(Carts));
