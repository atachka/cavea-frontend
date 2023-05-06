import { createContext } from "react";

export const SearchParamsContext = createContext<{
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
}>({
  searchParams: new URLSearchParams(),
  setSearchParams: () => {},
});
