import { createContext } from "react";

export const NavigateContext = createContext<{
  navigate: (arg: string) => void;
}>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  navigate: () => {}
});
