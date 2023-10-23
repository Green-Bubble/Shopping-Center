import InfiniteScroll from "react-infinite-scroll-component";
import { withPrivateRoute } from "@components/PrivateRoute";
import ProductItem from "@view/components/ProductItem";
import { useProductsContext } from "@view/contexts/ProductsContext";
import { withMainLayout } from "@view/layouts/MainLayout";

const Products = () => {
  const { items, hasMore, loadMore } = useProductsContext();

  return (
    <InfiniteScroll
      dataLength={items?.length ?? 0}
      next={loadMore}
      hasMore={hasMore}
      className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
      loader={<h4>Loading...</h4>}
    >
      {items?.map((item) => (
        <ProductItem item={item} />
      ))}
    </InfiniteScroll>
  );
};

export default withPrivateRoute(withMainLayout(Products));
