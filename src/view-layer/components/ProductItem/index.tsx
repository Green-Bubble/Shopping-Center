import Product from "@data/models/product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { useCallback } from "react";
import { useProductsContext } from "@view/contexts/ProductsContext";

type ProductItemProps = {
  item: Product;
};

const ProductItem = ({
  item: { id, name, price, department, image },
}: ProductItemProps) => {
  const navigate = useNavigate();
  const goToDetails = useCallback(
    (e) => {
      navigate(`/products/${id}`);
    },
    [id, navigate]
  );

  const { carts, updateCart } = useProductsContext();

  const addCart = useCallback(
    (e) => {
      e.stopPropagation();
      updateCart(id);
    },
    [id, updateCart]
  );

  const isInCarts = carts.includes(id);

  return (
    <div
      className="w-72 bg-white shadow-md rounded-xl hover:shadow-xl"
      onClick={goToDetails}
    >
      <img
        src={image}
        alt={name}
        className="h-80 w-72 object-cover rounded-t-xl"
      />
      <div className="px-4 py-3 w-72">
        <span className="text-gray-400 mr-3 uppercase text-xs">
          {department}
        </span>
        <p className="text-lg font-bold text-black truncate block capitalize">
          {name}
        </p>
        <div className="flex items-center">
          <p className="text-lg font-semibold text-black cursor-auto my-3">
            ${price}
          </p>
          <div className="ml-auto cursor-pointer" onClick={addCart}>
            <FontAwesomeIcon
              icon={isInCarts ? faTrashCan : faCartPlus}
              color={isInCarts ? "#000" : "#FFA500"}
              size="2x"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
