import { withPrivateRoute } from "@components/PrivateRoute";
import useAsyncAction from "@data/hooks/useAsyncAction";
import { withMainLayout } from "@view/layouts/MainLayout";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading";
import { useProductsContext } from "@view/contexts/ProductsContext";
import { Products } from "@data/api/services/products";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { carts, updateCart } = useProductsContext();

  const [fetchProduct, isLoading, { data: product, error }] = useAsyncAction(
    useCallback(async () => {
      const product = await Products.get(id)
      if (!product?.data) {
        throw new Error("content does not exist");
      }
      return product?.data;
    }, [id])
  );

  const handleCart = useCallback(() => {
    if (id) {
      updateCart(id);
    }
  }, [id, updateCart]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  useEffect(() => {
    if (error) {
      navigate("/404");
    }
  }, [error, navigate]);

  const goToList = useCallback(() => {
    navigate("/products");
  }, [navigate]);

  const isInCarts = useMemo(() => {
    if (!id) return false;
    return carts.includes(id);
  }, [id, carts]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full mb-8 md:w-1/2 md:mb-0">
          <div className="sticky top-0 z-50 overflow-hidden ">
            <div className="relative mb-6 lg:mb-10 lg:h-2/4 ">
              <img
                src={product?.image}
                alt=""
                className="object-cover w-full lg:h-full "
              />
            </div>
          </div>
        </div>
        <div className="w-full px-4 md:w-1/2 ">
          <div className="lg:pl-20">
            <div className="mb-8 ">
              <h2 className="max-w-xl mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl">
                {product?.name}
              </h2>
              <p className="inline-block mb-6 text-4xl font-bold text-gray-700 dark:text-gray-400 ">
                <span>${product?.price}</span>
              </p>
              <p className="max-w-md text-gray-700 dark:text-gray-400">
                {product?.description}
              </p>
            </div>
            <div className="w-32 mb-8 ">
              <label
                htmlFor=""
                className="w-full pb-1 text-xl font-semibold text-gray-700 border-b border-blue-300 dark:border-gray-600 dark:text-gray-400"
              >
                Quantity
              </label>
              <div className="relative flex flex-row w-full h-10 mt-6 bg-transparent rounded-lg">
                <button className="w-20 h-full text-gray-600 bg-gray-300 rounded-l outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-400">
                  <span className="m-auto text-2xl font-thin">-</span>
                </button>
                <input
                  type="number"
                  className="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-300 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black"
                  placeholder="1"
                />
                <button className="w-20 h-full text-gray-600 bg-gray-300 rounded-r outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-400">
                  <span className="m-auto text-2xl font-thin">+</span>
                </button>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button
                className="w-full p-4 bg-blue-500 rounded-md lg:w-2/5 dark:text-gray-200 text-gray-50 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-700"
                onClick={handleCart}
              >
                {isInCarts ? "Remove from cart" : "Add to cart"}
              </button>
              <button
                className="flex items-center justify-center w-full p-4 text-blue-500 border border-blue-500 rounded-md lg:w-2/5 dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-gray-100 dark:bg-blue-500 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:hover:text-gray-300"
                onClick={goToList}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withPrivateRoute(withMainLayout(Product));
