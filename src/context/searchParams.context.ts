import { createContext } from "react";

export const SearchParamsContext = createContext<{
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
}>({
  searchParams: new URLSearchParams(),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSearchParams: () => {}
});
