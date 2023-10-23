import { useState } from "react";
import { debounce } from "lodash";

export type ProductsFilterMeta = {
  setKeyword: (value: string) => void;
};

export type ProductsFilters = {
  keyword?: string;
};

export default function useProductsFilter(): [
  ProductsFilterMeta,
  ProductsFilters
] {
  const [keyword, _setKeyword] = useState("");

  const debouncedSetKeyword = debounce(_setKeyword, 500);

  return [
    {
      setKeyword: debouncedSetKeyword,
    },
    {
      keyword,
    },
  ];
}
