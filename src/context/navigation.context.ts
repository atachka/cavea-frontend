import { createContext } from "react";

export const NavigateContext = createContext<{
  navigate: (arg: string) => void;
}>({
  navigate: () => {},
});
